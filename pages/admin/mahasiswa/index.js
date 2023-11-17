import { useState, useEffect } from 'react';
import GetAllMahasiswa from '@/api/users/GetAllMahasiswa';
import LayoutAdmin from '@/components/LayoutAdmin';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineDeleteForever } from 'react-icons/md';
import Button from '@/components/button/Button';
import { LuRefreshCcw } from 'react-icons/lu';
import { Modal } from 'antd';
import DeactiveUserApi from '@/api/users/DeactiveUserApi';
import DataNotFound from '@/components/atom/DataNotFound';
import ButtonModal from '@/components/button/ButtonModal';

const Mahasiswa = () => {
  const router = useRouter();
  const [mahasiswa, setMahasiswa] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isHitApi, setIsHitApi] = useState(false);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    setIsHitApi(true);
    const res = await GetAllMahasiswa({
      page,
      limit,
      name,
      nim,
    });
    if (res.status === true) {
      const newPageStartIndex = (page - 1) * limit + 1;
      const updatedMahasiswa = res.data.map((data, index) => ({
        ...data,
        nomor: newPageStartIndex + index,
      }));

      setMahasiswa(updatedMahasiswa);
      setPage(parseInt(res.currentPage));
      setTotalPages(res.totalPages);
      setTimeout(() => {
        setIsHitApi(false);
      }, 200);
    } else {
      setTimeout(() => {
        setIsHitApi(false);
      }, 200);
      setMahasiswa([]);
    }
  };

  const handleDetailClick = async (id) => {
    router.push(`/admin/mahasiswa/profil/${id}`);
  };

  const handleRefresh = async () => {
    setName('');
    setNim('');
    setIsHitApi(true);

    const res = await GetAllMahasiswa({
      page,
      limit,
      name: '',
      nim: '',
    });

    if (res.status === true) {
      const newPageStartIndex = (page - 1) * limit + 1;
      const updatedMahasiswa = res.data.map((data, index) => ({
        ...data,
        nomor: newPageStartIndex + index,
      }));

      setMahasiswa(updatedMahasiswa);
      setTotalPages(res.totalPages);
    } else {
      setMahasiswa([]);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      setIsHitApi(true);
      const newPageStartIndex = (newPage - 1) * limit + 1;

      const updatedMahasiswa = mahasiswa.map((data, index) => ({
        ...data,
        nomor: newPageStartIndex + index,
      }));

      setMahasiswa(updatedMahasiswa);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
    setIsHitApi(true);
  };

  useEffect(() => {
    const { query } = router;
    if (query.name || query.nim) {
      setName(query.name || '');
      setNim(query.nim || '');
      setIsHitApi(true);
    } else {
      handleSearch();
    }
  }, [router]);

  const handleSearchButtonClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, name, nim, page: 1 },
    });
    setIsHitApi(true);
  };

  const handleDelete = async (id) => {
    const res = await DeactiveUserApi({ id });
    if (res.status) {
      handleRefresh();
      setShowModal(!showModal);
    }
  };

  const handleModalDelete = (id) => {
    setSelectedId(id);
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (isHitApi) {
      handleSearch();
    }
  }, [page, limit, name, nim, isHitApi, handleSearch]);

  return (
    <LayoutAdmin>
      {isHitApi && <Loader />}
      <div className="shadow-lg bg-abu1 rounded-xl">
        <div className="flex justify-end px-4 py-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="nama"
                className="px-2 py-1 border rounded-lg"
              />

              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="nim"
                className="px-2 py-1 border rounded-lg"
              />
            </div>
            <Button title={'search'} onClick={handleSearchButtonClick} />
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl">
          {mahasiswa.length > 0 ? (
            <table className="min-w-full whitespace-nowrap">
              <thead className="text-sm rounded-t-2xl">
                <tr className="h-12">
                  <td className="text-center">No</td>
                  <td className="">Nama</td>
                  <td className="">NIM</td>
                  <td className="">Program Studi</td>
                  <td className="text-center">Status</td>
                  <td className="text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {mahasiswa.map((data, index) => (
                  <tr
                    key={index}
                    className={`border-t h-10 text-xs border-gray-300 ${
                      index % 2 === 0 ? 'bg-gray-100' : ''
                    }`}
                  >
                    <td className="text-center ">{data.nomor}</td>
                    <td className="">{data.name}</td>
                    <td className="">{data.nim}</td>
                    <td className="">{data.prodi}</td>
                    <td className="px-2 ">
                      <div className="flex justify-center">
                        <div
                          className={`flex justify-center px-2 border items-center h-5 font-medium rounded-xl uppercase ${
                            data.status === 'aktif'
                              ? 'bg-green-300 bg-opacity-20 text-green-400 border-green-400'
                              : 'bg-red-200 text-red-600 border-red-600'
                          }`}
                        >
                          {' '}
                          {data.status}
                        </div>
                      </div>
                    </td>
                    <td className="flex items-center justify-center h-10 px-4 space-x-2 text-xl">
                      <IoEyeOutline
                        onClick={() => handleDetailClick(data.id)}
                        className="cursor-pointer"
                      />
                      <MdOutlineDeleteForever
                        className="text-red-400 cursor-pointer"
                        onClick={() => handleModalDelete(data.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <DataNotFound description={'Mahasiswa tidak ditemukan'} />
          )}
        </div>
        <div className="flex items-center justify-end py-2 space-x-2 text-xs bg-gray-100 border-t border-gray-300">
          <LuRefreshCcw
            className="cursor-pointer"
            onClick={() => handleRefresh()}
          />
          <div>
            <label className="">Items per page:</label>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="px-2 py-1 bg-gray-100 border"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div className="flex items-center justify-between px-2 w-14">
            <FiChevronLeft
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
            <span>{page}</span>
            <FiChevronRight
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`cursor-pointer`}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Konfirmasi Deactive"
        open={showModal}
        onCancel={handleModalDelete}
        footer={[
          <div key="button" className="flex justify-end space-x-2">
            <ButtonModal
              variant={'cancel'}
              text={'Cancel'}
              onClick={handleModalDelete}
            />
            <ButtonModal
              variant={'ok'}
              text={'Ya'}
              onClick={() => handleDelete(selectedId)}
            />
          </div>,
        ]}
      >
        <p>Apakah anda yakin akan merubah status akun mahasiswa?</p>
      </Modal>
    </LayoutAdmin>
  );
};

export default Mahasiswa;
