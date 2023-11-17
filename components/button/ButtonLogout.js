import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { IoIosLogOut } from 'react-icons/io';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    Cookies.remove('token');
    Cookies.remove('User');
    router.push('/auth/login');
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        className="flex items-center justify-center w-auto p-2 bg-white rounded-xl hover:bg-opacity-40"
      >
        <IoIosLogOut className="text-xl text-red-600" />
      </button>

      <Modal
        title="Konfirmasi Log out"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={<span className="text-black">Logout</span>}
        cancelText="Cancel"
        icon={<IoIosLogOut className="text-xl text-red-600" />}
      >
        <p>Apakah anda yakin akan Log Out?</p>
      </Modal>
    </>
  );
};

export default LogoutButton;
