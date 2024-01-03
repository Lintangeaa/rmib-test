import Layout from '../components/organism/Layout';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <div className="w-full h-auto pb-5 rounded-xl bg-abu">
        <div className="flex items-center w-full min-h-[10px] px-5 text-sm lg:text-lg font-medium text-white uppercase rounded-lg bg-primary py-1">
          Selamat Datang di Inner Journey!
        </div>
        <div className="px-5 pt-5 text-xs lg:text-base">
          Di Inner Journey, kami membawa Anda dalam perjalanan penemuan diri
          yang mendalam. Kami percaya bahwa melalui pemahaman diri, Anda dapat
          mencapai potensi terbaik dalam kehidupan Anda. Situs ini dirancang
          untuk memberikan pengalaman tes psikologi yang bermakna dan memberi
          Anda wawasan yang berharga tentang diri Anda sendiri.
        </div>
      </div>
      <div className="w-full h-auto pb-5 mt-5 rounded-xl bg-abu">
        <div className="flex items-center w-full min-h-[10px] px-5 text-lg font-medium text-white uppercase rounded-lg bg-primary"></div>
        <div className="flex items-center justify-center">
          <Image
            src={'/ilustration-home.svg'}
            width={500}
            height={100}
            alt="tentangku"
          />
        </div>
        <div className="px-5 pt-5 text-xs lg:text-base">
          Di Inner Journey, kami membawa Anda dalam perjalanan penemuan diri
          yang mendalam. Kami percaya bahwa melalui pemahaman diri, Anda dapat
          mencapai potensi terbaik dalam kehidupan Anda. Situs ini dirancang
          untuk memberikan pengalaman tes psikologi yang bermakna dan memberi
          Anda wawasan yang berharga tentang diri Anda sendiri.
        </div>
      </div>
    </Layout>
  );
}
