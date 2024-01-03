import Button from '@/components/button/Button';
import ButtonModal from '@/components/button/ButtonModal';
import Footer from '@/components/organism/Footer';
import LayoutRmib from '@/components/rmib/LayoutRmib';
import React from 'react';

const index = () => {
  return (
    <LayoutRmib>
      <div className="flex flex-col p-2 space-y-4">
        <div className="w-full h-auto pb-5 rounded-xl bg-abu">
          <div className="flex items-center w-full min-h-[10px] px-5 text-xs lg:text-sm font-medium text-white uppercase rounded-lg bg-primary py-1 italic">
            Petunjuk Pengerjaan Tes RMIB
          </div>
          <div className="px-5 pt-5 text-xs lg:text-sm">
            Selamat datang dalam Tes Minat Karir Rothwell Miller Interest Blank
            (RMIB). Tes ini dirancang untuk membantu Anda memahami minat dan
            preferensi karir Anda. Pastikan untuk membaca petunjuk dengan teliti
            sebelum memulai tes.
          </div>
        </div>
        <div className="w-full h-auto pb-5 rounded-xl bg-abu">
          <div className="flex items-center w-full min-h-[10px] px-5 text-xs lg:text-sm font-medium text-white uppercase rounded-lg bg-primary py-1 italic">
            Sebelum Memulai
          </div>
          <div className="px-5 pt-5 text-xs lg:text-sm">
            <p>1. Kondisi Lingkungan:</p>
            <div className="ms-6">
              <li>
                Temukan lingkungan yang tenang, bebas gangguan, dan memiliki
                koneksi internet yang stabil untuk melakukan tes.
              </li>
              <li>
                Pastikan Anda memiliki waktu yang cukup untuk menyelesaikan tes
                tanpa terburu-buru.
              </li>
            </div>
            <p>2. Kompatibilitas Browser:</p>
            <div className="ms-6">
              <li>
                Pastikan Anda menggunakan browser terbaru untuk mendapatkan
                pengalaman pengguna yang optimal.
              </li>
              <li>
                Disarankan menggunakan Google Chrome atau Mozilla Firefox.
              </li>
            </div>
            <p>3. Jaringan</p>
            <div className="ms-6">
              <li>
                Pastikan koneksi internet Anda stabil dan dapat mendukung
                transfer data yang diperlukan selama tes.
              </li>
              <li>
                Sebaiknya hindari penggunaan jaringan Wi-Fi publik untuk
                menghindari potensi gangguan atau keterbatasan keamanan.
              </li>
            </div>
          </div>
        </div>
        <div className="w-full h-auto pb-5 rounded-xl bg-abu">
          <div className="flex items-center w-full min-h-[10px] px-5 text-xs lg:text-sm font-medium text-white uppercase rounded-lg bg-primary py-1 italic">
            Selama Pengerjaan Tes
          </div>
          <div className="px-5 pt-5 text-xs lg:text-sm">
            <p>1. Petunjuk Tiap Soal</p>
            <div className="ms-6">
              <li>
                Jika sudah mengerjakan bagian pada tiap kelompok, tidak bisa
                kembali untuk mengganti jawaban pada kelompok yang sudah
                disubmit. Pastikan anda sudah yakin dengan jawaban anda sebelum
                melakukan submit.
              </li>
              <li>
                Bacalah setiap petunjuk dengan teliti sebelum menjawab
                pertanyaan.
              </li>
              <li>
                Pastikan Anda mengerti apa yang diminta dalam setiap bagian tes.
              </li>
            </div>
            <p>2. Jawaban Jujur dan Spontan</p>
            <div className="ms-6">
              <li>
                Berikan jawaban dengan jujur dan spontan, berdasarkan intuisi
                dan preferensi pribadi Anda.
              </li>
              <li>Tidak ada jawaban yang benar atau salah.</li>
            </div>
            <p>3. Gunakan Skala Penilaian</p>
            <div className="ms-6">
              <li>
                Beberapa pertanyaan meminta Anda memberikan tingkat minat pada
                suatu kegiatan atau bidang.
              </li>
              <li>
                Gunakan skala penilaian yang diberikan untuk mengekspresikan
                tingkat minat Anda.
              </li>
            </div>
          </div>
        </div>
        <div className="w-full h-auto pb-5 rounded-xl bg-abu">
          <div className="flex items-center w-full min-h-[10px] px-5 text-xs lg:text-sm font-medium text-white uppercase rounded-lg bg-primary py-1 italic">
            Setelah Menyelesaikan Test
          </div>
          <div className="px-5 pt-5 text-xs lg:text-sm">
            <p>1. Refleksikan Hasil</p>
            <div className="ms-6">
              <li>
                Setelah menyelesaikan tes, luangkan waktu untuk merenung tentang
                hasilnya.
              </li>
              <li>
                Perhatikan pola minat yang muncul dan bagaimana itu dapat
                terkait dengan pilihan karir.
              </li>
            </div>
            <p>2. Diskusikan Hasil (Opsional)</p>
            <div className="ms-6">
              <li>
                Jika diinginkan, diskusikan hasil tes dengan konselor karir atau
                seseorang yang berpengalaman dalam memberikan panduan karir.
              </li>
            </div>
            <p>3. Eksplorasi Karir</p>
            <div className="ms-6">
              <li>
                Gunakan hasil tes sebagai dasar untuk lebih eksplorasi bidang
                karir yang sesuai dengan minat Anda.
              </li>
              <li>
                Jelajahi peluang pekerjaan dan identifikasi langkah-langkah
                konkret menuju tujuan karir Anda.
              </li>
            </div>
          </div>
        </div>
        <div className="w-full h-auto p-5 mb-5 text-white rounded-xl bg-primary">
          <h1 className="text-lg"> Catatan Penting: </h1>
          <li>
            Kerahasiaan: Hasil tes bersifat pribadi dan akan dijaga
            kerahasiaannya.
          </li>
          <li>
            Kemungkinan Perubahan: Ingatlah bahwa minat dan preferensi dapat
            berubah seiring waktu.
          </li>
          <li>
            Feedback: Jika Anda memiliki pertanyaan atau membutuhkan bantuan
            tambahan, silakan hubungi pihak cdc. Terima kasih atas partisipasi
            Anda dalam Tes Minat Karir RMIB. Semoga tes ini membantu Anda
            menjelajahi potensi karir Anda dengan lebih baik.
          </li>
        </div>
      </div>

      <div className="flex justify-center pb-5">
        <ButtonModal
          variant={'ok'}
          text={'Mulai'}
          onClick={() => (window.location.href = '/tes-rmib/section-a')}
        />
      </div>
      <Footer />
    </LayoutRmib>
  );
};

export default index;
