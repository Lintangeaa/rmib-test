import Layout from '../components/organism/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col h-screen p-5 space-y-5 bg-cover bg-flury">
        <div className="w-full p-5 bg-white rounded shadow-2xl h-1/3">
          Hallo
        </div>
        <div className="flex w-full space-x-5 h-2/3">
          <div className="w-1/2 bg-white rounded shadow-2xl"></div>
          <div className="w-1/2 bg-white rounded shadow-2xl"></div>
        </div>
      </div>
    </Layout>
  );
}
