import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import "../../style/Components.css";

const TermService = () => {
  return(
    <div className="flex flex-col mt-[100px] mb-[15px] justify-center items-center">
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

      <h1 className="text-secondary text-2 text-center mt-5 mb-5 font-bold lg:text-[48px] lg:mt-10 lg:text-center">
        Syarat & Ketentuan
      </h1>

      <div className="justify-center lg:mb-[100px] lg:ml-[350px] lg:mr-[350px] md:mb-[100px] md:ml-[150px] md:mr-[150px] ml-[50px] mr-[50px] ">
      
      <p className="text-[16px] text-[#6E6E70]">
        Data milik pengguna yang diterima oleh Neraca Ruang dan Otonometer adalah hal yang dijunjung tinggi untuk dilindungi sifat kerahasiaannya.Kebijakan Privasi ini mengatur mengenai landasan dasar mengenai bagaimana Neraca Ruang dan Otonometer menggunakan Informasi Pribadi pengguna situs web neracaruang.com.
      </p>

     <br></br>

     <p className="text-[16px] text-[#6E6E70]">
      Kebijakan Privasi berlaku bagi seluruh Pengguna. Dengan tetap mengakses dan menggunakan situs web Neraca Ruang dan Otonometer, Pengguna dianggap menyatakan persetujuannya terhadap segala ketentuan dalam Kebijakan Privasi ini.
    </p>

     <br></br>

     <div className="text-[16px] text-left justify-start items-start">
      <p>
        <strong style={{ color: '#24445A' }}>1. Ruang Lingkup</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
        Kebijakan privasi ini berlaku untuk semua data milik pengguna pada situs web neracaruang.com, apabila Pengguna mengakses dan menggunakan fitur yang disediakan.
      </p>
     </div>
     <div className="text-[16px] text-left justify-start items-start">
      <p>
        <strong style={{ color: '#24445A' }}>2. Data</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
        Neraca Ruang dan Otonometer mengumpulkan beberapa data yang akan diisi oleh Pengguna saat melakukan pendaftaran seperti:
        <ul style={{ listStyleType: 'lower-alpha', marginLeft: '20px' }}>
          <li>Nama Lengkap</li>
          <li>Email</li>
          <li>Tanggal Lahir</li>
          <li>Kode Pos (Domisili)</li>
          <li>Provinsi (Domisili)</li>
          <li>Kabupaten/Kota (Domisili)</li>
        </ul>
      </p>
      <br></br>
      <p className="ml-[15px] text-[#6E6E70]">
      Neraca Ruang dan Otonometer mencatat data yang berhubungan dengan pengguna melalui metode berikut:
        <ul style={{ listStyleType: 'lower-alpha', marginLeft: '20px' }}>
          <li>Metode pencatatan data otomatis seperti dan tidak terbatas pada protokol komunikasi, alamat IP, cookies, dan lain-lain.</li>
          <li>Registrasi online dan offline.</li>
          <li>Korespondensi email.</li>
          <li>Komunikasi online dan offline.</li>
          <li>Sumber-sumber informasi dari pihak ketiga.</li>
        </ul>
      </p>
      <br></br>
      <p>
        <strong style={{ color: '#24445A' }}>3. Penggunaan Data</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
         Neraca Ruang dan Otonometer menggunakan data yang telah dijelaskan pada poin (2) untuk:
        <ul style={{ listStyleType: 'lower-alpha', marginLeft: '20px' }}>
          <li>Melakukan komunikasi dalam rangka penyediaan layanan.</li>
          <li>Melakukan pertanggungjawaban akan penyediaan layanan, baik kepada pengguna bersangkutan maupun pihak penegak hukum.</li>
          <li>Mengakui sebagai salah satu aset tak berwujud.</li>
          <li>Mempublikasikan dalam rangka melakukan promosi.</li>
          <li>Mencantumkan dalam data WHOIS Domain</li>
        </ul>
      </p>
      <br></br>
      <p>
        <strong style={{ color: '#24445A' }}>4. Pengendalian Informasi</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
        Neraca Ruang dan Otonometer membutuhkan partisipasi Anda untuk memastikan data yang Anda isi adalah yang paling mutakhir, lengkap, akurat, dan dapat dipertanggungjawabkan. Jika ada perubahan data seperti perubahan kode pos domisili, kabupaten/kota domisili, dan provinsi domisili, dapat memilih fitur Perbaharui Akun pada akun profil jika Pengguna sudah terdaftar pada sistem.
      </p>
      <br></br>
      <p>
        <strong style={{ color: '#24445A' }}>5. Kerahasian Data</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
         Kerahasiaan data Pengguna menjadi perhatian utama Neraca Ruang dan Otonometer. Data tidak akan dijual, diperdagangkan, dan diberikan kepada pihak lain. Data Pengguna dapat dilihat oleh pengguna sendiri pada akun profil masing-masing, dan Pengguna dimohon tidak mengungkapkan dan membagikan data, termasuk kata sandi akun.
      </p>
      <br></br>
      <p>
        <strong style={{ color: '#24445A' }}>6. Batasan Kerahasiaan Data</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
       Data dianggap bukan data rahasia dan Neraca Ruang dan Otonometer dibebaskan dari kewajiban untuk melindunginya, apabila data telah menjadi bagian dari domain publik dan diketahui secara umum sebagai akibat dari kebijakan pihak-pihak yang berwenang untuk mempublikasikannya seperti di dalam WHOIS domain dan lain-lain.</p>
      <br></br>
      <p>
        <strong style={{ color: '#24445A' }}>7. Keamanan</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
        Keamanan dan kerahasiaan data Pengguna menjadi perhatian utama bagi Neraca Ruang dan Otonometer. Neraca Ruang dan Otonometer melakukan usaha terbaik untuk menjaga data pribadi/perusahaan Pengguna dari pihak-pihak yang tidak berwenang untuk mendapatkan data tersebut, kecuali untuk melakukan hal-hal yang tersebut pada Penggunaan Data (poin nomor 3).</p>
      <br></br>
      <p>
        <strong style={{ color: '#24445A' }}>8. Perubahan Kebijakan Privasi</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
        Setiap perubahan atau penambahan pada Kebijakan Privasi ini akan diberitahukan dan dipublikasikan pada situs web Neraca Ruang dan Otonometer, dalam bentuk addendum yang menjelaskan perubahan atau penambahan yang terdapat pada situs web neracaruang.com.
      </p>
      <br></br>
      <p>
        <strong style={{ color: '#24445A' }}>9. Penghapusan Data</strong><br />
      </p>
      <p className="ml-[15px] text-[#6E6E70]">
        Pengguna berhak mengajukan penghapusan data, yang haknya sesuai dengan hukum dan peraturan di Republik Indonesia. Pengguna dapat menghapus data pribadi, jika Pengguna tidak ingin menjadi Pengguna Aktif lagi pada situs web Neraca Ruang dan Otonometer. Untuk menghapus data, Pengguna dapat mengirimkan email ke info@neracaruang.com, dengan menggunakan email yang terdaftar untuk meminta penghapusan akun beserta seluruh data yang ada di dalamnya
      </p>
     </div>
     <br></br>
     <br></br>
     <br></br>
     </div>
    </div>
  )

}

export default TermService