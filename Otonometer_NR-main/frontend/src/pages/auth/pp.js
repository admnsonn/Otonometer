import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import geometry from "../../assets/8.svg";
import geometrys from "../../assets/7.svg";
import geometryss from "../../assets/9.svg";
import "../../style/Components.css";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col mt-[100px] mb-[15px] justify-center items-center">
      <img src={geometry} alt="" className="md:hidden lg:block hidden fixed w-full top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <img src={geometrys} alt="" className="hidden md:block lg:hidden fixed w-full top-[40%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />
      <img src={geometryss} alt="" className="block md:hidden lg:hidden fixed w-full top-[5%] left-[50%] translate-x-[-50%] md:translate-y-[-50%] -z-10 opacity-10 object-cover" />

      <h1 className="text-secondary text-2 text-center mt-5 mb-5 font-bold lg:text-[48px] lg:mt-10 lg:text-center">KEBIJAKAN PRIVASI DATA</h1>

      <div className="justify-center lg:mb-[100px] lg:ml-[350px] lg:mr-[350px] md:mb-[100px] md:ml-[150px] md:mr-[150px] ml-[50px] mr-[50px] ">
        <p className="text-[16px] text-[#6E6E70]">
          PT Semesta Indonesia Teknologi Lestari (SITL) adalah perusahaan yang didirikan di Jakarta pada tahun 2020. SITL menyediakan layanan dalam bentuk produk dan/atau jasa serta kegiatan lainnya melalui berbagai platform digital,
          termasuk Otonometer.
        </p>

        <br></br>

        <p className="text-[16px] text-[#6E6E70]">
          Privasi Anda merupakan prioritas utama bagi kami. SITL berkomitmen untuk melindungi Data Pribadi Anda pada seluruh layanan digital yang kami operasikan, yang meliputi:
          <ul className="list-disc ml-4">
            <li>
              <a href="http://www.neracaruang.com" target="_blank" rel="noopener noreferrer" style={{ color: "#24445A", textDecoration: "none" }}>
                <span style={{ color: "#6E6E70" }}>Situs</span> www.neracaruang.com
              </a>
            </li>
            <li>Aplikasi gawai Otonometer yang juga dapat diakses melalui situs otonometer.com, yang pengelolaannya dilakukan oleh PT Teknologi Otonometer Nusantara, anak perusahaan dari PT SITL</li>
            <li>Platform digital lainnya yang akan dikembangkan di masa depan</li>
          </ul>
        </p>

        <br></br>

        <p className="text-[16px] text-[#6E6E70]">Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menyimpan, menggunakan, mengungkapkan, dan melindungi Data Pribadi Anda yang kami peroleh melalui layanan digital kami.</p>

        <br></br>

        <p className="text-[16px] text-[#6E6E70]">
          Dengan berinteraksi dengan kami, mengirimkan informasi kepada kami, atau mendaftar untuk layanan yang kami tawarkan, Anda setuju dan mengizinkan SITL untuk mengumpulkan, menggunakan, mengungkapkan, dan berbagi Data Pribadi Anda
          dengan pihak ketiga yang relevan sesuai dengan ketentuan Kebijakan Privasi ini. Kebijakan ini juga menjelaskan dasar hukum kami dalam mengumpulkan, menggunakan, dan/atau mengungkapkan Data Pribadi Anda tanpa memerlukan persetujuan
          Anda, apabila diizinkan oleh hukum yang berlaku.
        </p>

        <br></br>

        <div className="text-[16px] text-left justify-start items-start">
          <p>
            <strong style={{ color: "#24445A" }}>A. Ruang Lingkup</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            Dalam Kebijakan Privasi ini, "Data Pribadi" mengacu pada data atau informasi apa pun tentang Anda yang dapat mengidentifikasi Anda, baik:
            <ul style={{ listStyleType: "lower-alpha", marginLeft: "20px" }}>
              <li>Dari data tersebut; atau</li>
              <li>Dari data tersebut dan informasi lain yang kami miliki atau dapat kami akses.</li>
            </ul>
          </p>
          <p className="ml-[15px] text-[#6E6E70]">Data Pribadi yang mungkin Anda berikan kepada kami tergantung pada sifat interaksi Anda dengan kami.</p>
        </div>

        <br></br>

        <div className="text-[16px] text-left justify-start items-start">
          <p>
            <strong style={{ color: "#24445A" }}>B. Pengumpulan Data Pribadi</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">Secara umum, SITL mengumpulkan Data Pribadi Anda melalui beberapa cara, termasuk tetapi tidak terbatas pada:</p>
          <p className="ml-[15px] text-[#6E6E70]">
            1. Data yang Anda serahkan saat melakukan pendaftaran awal, seperti:
            <ul style={{ listStyleType: "lower-alpha", marginLeft: "32px" }}>
              <li>Nama Lengkap</li>
              <li>Alamat email</li>
              <li>Nomor telpon</li>
              <li>Alamat</li>
              <li>Informasi lain yang dapat mengidentifikasi Anda</li>
            </ul>
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            2. Data yang Anda serahkan untuk melengkapi informasi Anda agar dapat mengakses fitur berbayar, seperti:
            <ul style={{ listStyleType: "lower-alpha", marginLeft: "32px" }}>
              <li>Informasi identifikasi pribadi berupa KTP</li>
              <li>Informasi rekening bank atau kartu kredit</li>
              <li>Informasi pembelian dan pembayaran</li>
            </ul>
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            3. Data yang terekam saat Anda menggunakan layanan kami, termasuk namun tidak terbatas pada:
            <ul style={{ listStyleType: "lower-alpha", marginLeft: "32px" }}>
              <li>Informasi perangkat yang Anda gunakan</li>
              <li>Informasi layanan yang Anda gunakan</li>
              <li>Informasi lokasi (GPS)</li>
              <li>Informasi statistik dari laman yang diakses</li>
            </ul>
          </p>
        </div>
        <br></br>

        <div className="text-[16px] text-left justify-start items-start">
          <p>
            <strong style={{ color: "#24445A" }}>C. Penggunaan dan Pengungkapan Data Pribadi</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            Kami menggunakan Data Pribadi yang kami peroleh dan kumpulkan dari Anda untuk berbagai keperluan, termasuk tetapi tidak terbatas pada:
            <ul style={{ listStyleType: "lower-alpha", marginLeft: "32px" }}>
              <li>Memproses permintaan, aktivitas, atau transaksi yang Anda lakukan melalui platform kami, termasuk verifikasi pembayaran dan transaksi dengan pihak ketiga untuk menyelesaikan transaksi.</li>
              <li>Memberikan informasi mengenai produk, layanan terkini, promosi, penawaran yang dipersonalisasi, atau informasi lain yang mungkin Anda perlukan.</li>
              <li>
                Menyediakan dukungan dan layanan terkait transaksi yang telah Anda lakukan, seperti penanganan keluhan, panggilan konfirmasi, dan layanan terkait lainnya. Kami juga menggunakan Data Pribadi Anda untuk menganalisis pola
                perilaku penggunaan Anda dalam rangka pengembangan layanan/produk yang lebih baik.
              </li>
            </ul>
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            Kami berkomitmen untuk menjaga kerahasiaan Data Pribadi Anda yang berada di bawah kendali kami dan menjamin bahwa tidak ada pengungkapan, penjualan, pengalihan, distribusi, dan/atau peminjaman Data Pribadi Anda kepada pihak
            ketiga tanpa persetujuan Anda, kecuali dalam situasi berikut:
            <ul style={{ listStyleType: "lower-alpha", marginLeft: "32px" }}>
              <li>Untuk keperluan layanan yang terkait dengan Anda, kami dapat membagikan Data Pribadi Anda kepada pihak ketiga yang dipilih dengan kehati-hatian dan berkewajiban untuk menjaga data Anda tetap aman.</li>
              <li>Untuk mematuhi kewajiban hukum dan/atau permintaan sah dari aparat penegak hukum atau instansi pemerintah yang berwenang.</li>
            </ul>
          </p>
        </div>

        <br></br>

        <div className="text-[16px] text-left justify-start items-start">
          <p>
            <strong style={{ color: "#24445A" }}>D. Penggunaan Cookies</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            Cookies adalah file data kecil yang dikirimkan ke perangkat Anda untuk menyimpan dan melacak informasi agregat tentang Anda saat Anda mengakses platform kami. Kami menggunakan cookies untuk:
            <ul style={{ listStyleType: "lower-alpha", marginLeft: "32px" }}>
              <li>Melacak informasi seperti jumlah pengguna, frekuensi penggunaan, profil pengguna, dan situs pilihan mereka.</li>
              <li>
                Anda dapat menonaktifkan atau menghapus cookies dengan alat yang tersedia di sebagian besar browser. Preferensi untuk setiap browser perlu diatur secara terpisah, dan browser yang berbeda menawarkan fungsionalitas yang
                berbeda.
              </li>
            </ul>
          </p>
        </div>

        <br></br>

        <div className="text-[16px] text-left justify-start items-start">
          <p>
            <strong style={{ color: "#24445A" }}>E. Keamanan, Pencabutan Persetujuan dan Penghapusan Data Pribadi Anda</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            <strong style={{ color: "#24445A" }}>KEAMANAN</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            Keamanan dan kerahasiaan data Anda adalah prioritas utama kami. Kami berusaha keras untuk menjaga Data Pribadi Anda dari akses pihak yang tidak berwenang. Mohon untuk tidak mengungkapkan dan membagikan Data Pribadi Anda,
            termasuk kata sandi akun Anda, serta menjaga keamanan perangkat Anda.
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            <strong style={{ color: "#24445A" }}>Pencabutan Persetujuan Dan Penghapusan Data Pribadi</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            Anda berhak mencabut persetujuan dan mengajukan penghapusan Data Pribadi, sesuai dengan hukum dan peraturan yang berlaku di Republik Indonesia. Anda dapat menghapus Data Pribadi Anda jika Anda tidak ingin lagi menjadi pengguna
            aktif platform kami.
          </p>
        </div>

        <br></br>

        <div className="text-[16px] text-left justify-start items-start">
          <p>
            <strong style={{ color: "#24445A" }}>F. Pembaruan Kebijakan Privasi</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            Kami dapat memperbarui atau mengubah Kebijakan Privasi ini dari waktu ke waktu, dan akan memberitahukan Anda tentang perubahan tersebut melalui cara yang kami anggap sesuai. Kami menyarankan Anda untuk memeriksa Kebijakan
            Privasi ini secara berkala untuk mengetahui bagaimana kami memproses Data Pribadi Anda.
          </p>
        </div>

        <br></br>

        <div className="text-[16px] text-left justify-start items-start">
          <p>
            <strong style={{ color: "#24445A" }}>G. Hubungi Kami</strong>
            <br />
          </p>
          <p className="ml-[15px] text-[#6E6E70]">
            Jika Anda memiliki pertanyaan, komentar, atau keluhan mengenai Kebijakan Privasi ini, atau ingin mendapatkan akses dan/atau melakukan koreksi terhadap Data Pribadi Anda, silakan hubungi layanan pelanggan kami melalui:
            <ul className="list-disc" style={{ marginLeft: "32px" }}>
              <li>Jl. Uranus II Jl. Villa Cinere Mas No. 5, Kota Tangerang Selatan, Banten 115419</li>
              <li>Telepon: 62-21 72634824 / 73284629</li>
            </ul>
          </p>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
