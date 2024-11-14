import React, { useEffect, useState } from "react";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import back from "../../assets/back.svg";
import { ConfigProvider, Table, Input, Empty } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Eye } from "lucide-react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconuser from "../../assets/nullpic.jpg";
import { getDataLiniMasa, getListJabatanSpesific } from "./services";

const LiniMasa = () => {
  const { id } = useParams();
  const [wilayah, setWilayah] = useState(null);
  useEffect(() => {
    if (sessionStorage.getItem("idwilayah") !== "") {
      if (sessionStorage.getItem("namawilayah") === "Semua") {
        setWilayah(sessionStorage.getItem("namaprovinsi"));
      } else {
        setWilayah(sessionStorage.getItem("namawilayah"));
      }
    }
  }, []);
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [idjabatan, setidJabatan] = useState();
  const [dataCard, setDataCard] = useState([]);

  // useEffect(()=>{
  //   getListJabatanSpesific(idjabatan,(data)=>{
  //     setDataCard(data.data)
  //     console.log(data.data)
  //   })
  // },[idjabatan])

  const [jabatanForTitle, setJabatanForTitle] = useState("");
  const [selectedPersonil, setSelectedPersonil] = useState(null);
  const [openDetailAnggota, setOpenDetailAnggota] = useState(false);
  const [dataSourceCV, setDataSourceCV] = useState([]);
  useEffect(() => {
    getDataLiniMasa(id, (data) => {
      setDataSource(data.data[0].lini_masa.filter((item) => item));
      // setDataSourceCV(data.data[0].lini_masa.filter(item => item)[0].profile.list_jabatan.filter(item => item))
      setJabatanForTitle(data.data[0].nama);
    });
  }, [id]);
  //COLUMN TABLE
  const columns = [
    {
      title: "Nama Lengkap",
      dataIndex: ["profile", "nama"],
      color: "#24445A",
      width: "20%",
      key: "profile.nama",
      // sorter: (a, b) => a.profile.nama.localeCompare(b.profile.nama),
      render: (text, record) => {
        // Ambil URL foto dari record, misalnya record.profile.foto
        const fotoUrl = record.profile.photo
          ? `http://development.otonometer.com:9999/photo/${record.profile.photo}`
          : iconuser;
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Render gambar foto */}
            <img
              src={fotoUrl}
              alt={record.profile.nama}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            {/* Render nama lengkap */}
            {record.profile.nama}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: ["jenis", "nama"],
      color: "#24445A",
      key: "jenis.nama",
      width: "20%",
      // sorter: (a, b) => a.jenis.nama.localeCompare(b.jenis.nama),
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Mulai",
      dataIndex: "tanggal_mulai",
      color: "#24445A",
      key: "tanggal_mulai",
      width: "5%",
      render: (text) => (text ? text : "-"),
      // sorter: (a, b) => a.tanggal_pembentukan.localeCompare(b.tanggal_pembentukan),
    },
    {
      title: "Akhir",
      dataIndex: "tanggal_berakhir",
      color: "#24445A",
      key: "tanggal_berakhir",
      width: "5%",
      render: (text) => (text ? text : "-"),
      // sorter: (a, b) => a.tanggal_pembubaran.localeCompare(b.tanggal_pembubaran),
    },
    {
      title: "Aksi",
      align: "center",
      width: "5%",
      render: (record) => {
        return (
          <div className="flex justify-center items-center gap-x-[5px]">
            <div className="flex items-center justify-center cursor-pointer w-[24px] h-[24px] bg-secondary rounded-[5px] hover:bg-third">
              <Eye
                style={{ color: "white" }}
                className="w-[20px]"
                onClick={() => {
                  setOpenDetailAnggota(!openDetailAnggota);
                  setDataCard(record);
                  console.log(record)
                  setDataSourceCV(record.profile.list_jabatan.filter((item) => item));
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const columnsCV = [
    {
      title: "Jabatan",
      dataIndex: ["jabatan", "nama"],
      color: "#24445A",
      width: "20%",
      key: "jabatan.nama",
    },
    {
      title: "Status",
      dataIndex: ["jenis", "nama"],
      color: "#24445A",
      key: "status.type",
      width: "20%",
    },
    // {
    //   title: "Alamat",
    //   dataIndex: "alamat_kantor",
    //   color: "#24445A",
    //   key: "status.type",
    //   width: "20%",
    //   render: (text) => (text ? text : "-"),
    // },
    {
      title: "Periode",
      key: "periode.tahun",
      width: "5%",
      render: (text, record) => {
        // Mengambil tahun mulai
        const tahunMulai = record.tanggal_mulai
          ? new Date(record.tanggal_mulai).getFullYear()
          : "-";
        // Mengambil tahun akhir
        const tahunAkhir = record.tanggal_berakhir
          ? new Date(record.tanggal_berakhir).getFullYear()
          : "Sekarang";
        return `${tahunMulai} - ${tahunAkhir}`;
      },
    },
  ];
  //AKSI TABLE
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  // const detailPejabat = (record) => {
  //   return (
  //     <div className="animate-fadeIn transition duration-200 ease-in fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
  //       <div className="flex flex-col bg-white rounded-[25px] justify-start items-center w-[700px] h-auto mx-[40px] md:mx-0 px-[40px] py-[30px]">
  //         <div className="flex w-full justify-end mb-[20px] items-start">
  //           <FontAwesomeIcon
  //             icon={faClose}
  //             color="#FFFFFF"
  //             className={`w-[40px] h-[40px] cursor-pointer transition duration-200 ease-in bg-[#CD3838] rounded-[7px]`}
  //             //   onClick={()=>{setOpenDetailAnggota(!openDetailAnggota)}}
  //           />
  //         </div>

  //         <div
  //           className={`flex items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-auto`}
  //         >
  //           <div className="flex flex-col items-center w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] px-[34px]">
  //             <div className="w-full flex justify-center">
  //               <div className="relative w-[146px] h-[146px] bg-white rounded-full border-[5px] border-solid border-secondary">
  //                 {/* <img src={iconuser} alt="" className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[128px] h-[128px] bg-secondary rounded-full border-[4px] border-solid border-secondary"/> */}
  //               </div>
  //             </div>
  //             <p className="w-full text-secondary text-[16px] text-center break-words font-bold mt-[11px]">
  //               {/* {dataCard.penjabat} */}
  //             </p>
  //             <p className="w-full text-secondary text-[12px] text-center break-words font-regular">
  //               Penguasa Partai
  //             </p>
  //             <div className="w-[177px] h-auto rounded-[10px] bg-secondary text-center mt-[11px]">
  //               <span className=" text-white text-[12px] font-bold">
  //                 150.000&nbsp;
  //               </span>
  //               <span className="font-regular text-[12px] text-white">
  //                 Suara
  //               </span>
  //             </div>
  //             <p className="w-full text-secondary text-[12px] text-center break-words font-regular mt-[11px]">
  //               Masa Periode : 2019 - 2024
  //             </p>
  //             <a
  //               href="https://wa.me/081296735155"
  //               className="w-full text-secondary text-[12px] text-center break-words font-regular"
  //             >
  //               Kontak : 081296735155
  //             </a>
  //           </div>

  //           <div
  //             className={`w-[50%] h-[382px] rounded-[50px] bg-white py-[20px] pr-[34px]`}
  //           >
  //             <div className="w-full h-full bg-[#EFEFEF] rounded-[15px] text-secondary text-[12px] p-[18px] overflow-auto mini-scrollbar">
  //               <p>
  //                 Alamat Kantor : HVRW+M8W, Simbula, Kec. Katoi, Kabupaten
  //                 Kolaka Utara, Sulawesi Tenggara 93957 Adasdasdsda asdasdasd
  //                 jkkk asd asdasdasd
  //               </p>
  //               <p className="mt-[10px]">Jabatan Lain : Anggota DPRnya mi</p>
  //               <p className="mt-[10px]">
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
  //                 dictum non ligula consectetur malesuada. Praesent bibendum eu
  //                 ipsum vel ullamcorper biam.
  //               </p>
  //               <p className="mt-[10px]">
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
  //                 dictum non ligula consectetur malesuada. Praesent bibendum eu
  //                 ipsum vel ullamcorper biam.
  //               </p>
  //               <p className="mt-[10px]">
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
  //                 dictum non ligula consectetur malesuada. Praesent bibendum eu
  //                 ipsum vel ullamcorper biam.
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  // const handleDetailPejabat = (record) => {
  //   detailPejabat(record);
  // };
  //   const filteredData = filterDataSource(dataSource, searchTable);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-[125px] justify-start items-center min-h-screen h-auto">
        {/* <img src={bulat} alt="" className="fixed w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10" /> */}
        <img
          src={geometry}
          alt=""
          className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover"
        />
        <img
          src={geometrys}
          alt=""
          className="hidden md:block lg:hidden fixed w-full top-[40%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover"
        />
        <img
          src={geometryss}
          alt=""
          className="block md:hidden lg:hidden fixed w-full top-[5%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover"
        />
        <div className="w-full flex justify-between items-center max-w-[1781px] mt-[24px] px-[175px]">
          <div
            className="w-[50px] h-[50px] transition-transform duration-300 transform hover:scale-110 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          >
            <img src={back} alt="iconBack" />
          </div>
          <h1 className="text-center flex justify-center items-center text-secondary text-[24px] md:text-[34px] font-bold uppercase">
            Lini Masa {jabatanForTitle} {wilayah}
          </h1>
          <div className="w-[50px] h-[50px]"></div>
        </div>
        <div className="w-full max-w-[1781px] mt-[24px] px-[175px]">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#24445A",
                  colorTextHeading: "#FFFFFF",
                  colorText: "#24445A",
                  colorBgContainer: "#FFFFFF",
                  footerBg: "#24445A",
                },
              },
            }}
          >
            <div className="w-full flex justify-between ">
              {/* <Input.Search placeholder='Cari' value={searchTable} onChange={handleSearchChange} className='mt-[10px] max-w-[350px] h-full' /> */}
            </div>

            <Table
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Data tidak ada"
                  />
                ),
                triggerDesc: "",
                triggerAsc: "",
                cancelSort: "",
              }}
              columns={columns}
              dataSource={dataSource}
              bordered={true}
              pagination={true}
              size="large"
              rowKey="id"
              className=" w-full bg-white rounded-xl border"
            ></Table>
          </ConfigProvider>
        </div>
      </div>
      {openDetailAnggota && (
        <div className="animate-fadeIn transition duration-200 ease-in fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="flex flex-col bg-white rounded-[25px] justify-start items-center w-[700px] h-auto mx-[40px] md:mx-0 px-[40px] py-[30px]">
            <div className="w-full flex justify-between items-center">
              <div className="flex w-[40px]">
                <div className="w-[40px]"></div>
              </div>
              {/* <p className="w-full text-center text-[36px] font-bold text-secondary uppercase">
                {jabatanForTitle}
              </p> */}
              <div className="flex w-[40px]">
                <FontAwesomeIcon
                  icon={faClose}
                  color="#FFFFFF"
                  className={`w-[40px] h-[40px] cursor-pointer transition duration-200 ease-in bg-[#CD3838] rounded-[7px]`}
                  onClick={() => {
                    setOpenDetailAnggota(!openDetailAnggota);
                  }}
                />
              </div>
            </div>

            <div
              className={`flex flex-col items-center rounded-[50px] bg-white drop-shadow-[0_1px_15px_rgba(0,0,0,0.15)] w-full mt-[10px]`}
            >
              <div className="flex items-center justify-start w-full h-auto rounded-[50px] bg-white py-[20px] px-[34px] gap-x-[20px]">
                <div className="w-[90px] flex justify-center">
                  <div className="relative w-[90px] h-[90px] bg-white rounded-full border-[4px] border-solid border-secondary">
                    <img
                      src={
                        dataCard.profile.photo
                          ? `http://development.otonometer.com:9999/photo/${dataCard.profile.photo}`
                          : iconuser
                      }
                      alt=""
                      className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-[80px] h-[80px] bg-secondary rounded-full border-[3px] border-solid border-secondary"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-start">
                  <p className="w-full text-secondary text-[16px] break-words font-bold">
                    {dataCard.profile.nama || "-"}
                  </p>
                  <p className="w-full text-secondary text-[12px] break-words font-regular">
                    Kontak : {dataCard.profile.no_handphone || "-"}
                  </p>
                  <p className="w-full text-secondary text-[12px] break-words font-regular">
                    Alamat : {dataCard.profile.alamat_kantor || "-"}
                  </p>
                </div>
              </div>

              <div
                className={`w-full h-[382px] rounded-[50px] bg-white p-[20px]`}
              >
                <div className="w-full h-full text-secondary text-[12px] px-[18px] overflow-auto mini-scrollbar">
                  <p className=" ml-[3px] text-secondary text-[16px] font-bold">Riwayat Jabatan :</p>
                  <ConfigProvider
                    theme={{
                      components: {
                        Table: {
                          headerBg: "#24445A",
                          colorTextHeading: "#FFFFFF",
                          colorText: "#24445A",
                          // colorBgContainer: "#FFFFFF",
                          // footerBg: "#24445A",
                        },
                      },
                    }}
                  >
                    <div className="w-full flex justify-between ">
                      {/* <Input.Search placeholder='Cari' value={searchTable} onChange={handleSearchChange} className='mt-[10px] max-w-[350px] h-full' /> */}
                    </div>

                    <Table
                      locale={{
                        emptyText: (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="Data tidak ada"
                          />
                        ),
                        triggerDesc: "",
                        triggerAsc: "",
                        cancelSort: "",
                      }}
                      columns={columnsCV}
                      dataSource={dataSourceCV}
                      bordered={true}
                      pagination={false}
                      size="large"
                      rowKey="id"
                      className="w-full bg-white"
                    ></Table>
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LiniMasa;
