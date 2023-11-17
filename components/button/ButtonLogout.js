import React, { useState } from 'react';
import { Button, Divider, Modal } from 'antd';
import { IoIosLogOut } from 'react-icons/io';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import ButtonModal from './ButtonModal';

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
        open={modalVisible}
        onCancel={handleCancel}
        icon={<IoIosLogOut className="text-xl text-red-600" />}
        footer={[
          <div key="button" className="flex justify-end space-x-2">
            <ButtonModal
              variant={'cancel'}
              text={'Cancel'}
              onClick={handleCancel}
            />
            <ButtonModal variant={'ok'} text={'Logout'} onClick={handleOk} />
          </div>,
        ]}
      >
        <p>Apakah anda yakin akan Log Out?</p>
      </Modal>
    </>
  );
};

export default LogoutButton;
