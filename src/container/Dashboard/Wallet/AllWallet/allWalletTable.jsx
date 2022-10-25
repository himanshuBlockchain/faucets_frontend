import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Button from "../../../../components/UI/Button";
import CardLayout from "../../../../components/UI/CardLayout";
import DataTable from "../../../../components/UI/DataTable";
import ActionCell from "../../../../components/UI/DataTable/ActionCell";
import TextCell from "../../../../components/UI/DataTable/TextCell";
import Input from "../../../../components/UI/Input";
import Modal from "../../../../components/UI/Modal";
import { Notification } from "../../../../components/UI/ToastNotification";
import { userRole } from "../../../../config/USER_ROLE";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useGetLoginUserQuery } from "../../../../service/userApi";
// import { useGetUserLoginQuery } from "../../../../service/authApi";
import {
  useDeleteWalletMutation,
  useEditWalletMutation,
  useGetAllWalletQuery,
} from "../../../../service/walletApi";

const AllWalletTable = () => {
  const {data: loginUser} = useGetLoginUserQuery();
  const { data } = useGetAllWalletQuery();
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // edit wallet
  const [editWallet, { error, data: wallet, isLoading }] = useEditWalletMutation();
  useEffect(() => {
    if (wallet?.message) {
      Notification(wallet?.message, "success");
      setOpenModal(false)
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, wallet]);
  // delete wallet
  const [deleteWallet, { error: deleteError, data: deleteWallets }] =
    useDeleteWalletMutation();
  useEffect(() => {
    if (deleteWallets?.message) {
      Notification(deleteWallets?.message, "success");
    } else {
      Notification(deleteError?.data?.message, "error");
    }
  }, [deleteWallets, deleteError]);
  // delete handler
  const handleDelete = async (dt) => {
    await deleteWallet(dt);
  };
  // edit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editWallet(values);
  };
  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell key="walletName" text="Wallet Name" as="th" className="table_th" />,
    <TextCell key="address" text="Wallet Address" as="th" className="table_th" />,
    <TextCell key="username" text="Username" as="th" className="table_th" />,
    <TextCell key="walletaction" text="Action" as="th" className="table_th" />,
  ];
  const tbodyItems = data?.data?.map((d, i) => [
    [
      <TextCell key={i + 1} text={i + 1} as="td" className="table_td" />,
      <TextCell
        key={d.wallet_name}
        text={d.wallet_name}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={d.address}
        text={d.address}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={d.username}
        text={d.username}
        as="td"
        className="table_td"
      />,
      <ActionCell
        key="delete"
        as="td"
        actions={[
          {
            icon: 
            <AiFillDelete onClick={() => handleDelete(d)} />,
            className: "delete_icon",
            style: {
              cursor: "pointer",
              fontSize: "20px",
              color: "red",
              marginRight: "10px",
            },
          },
          {
            icon: 
            <FaEdit
              onClick={() => {
                buttonHandler();
                setValues(d);
              }}
            />,
            style: {
              cursor: "pointer",
              fontSize: "20px",
              color: "green",
            },
          },
        ]}
      />,
    ],
  ]);
  // modal
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const buttonHandler = () => {
    setOpenModal(!openModal);
    modalRef?.current?.showModal();
  };
  return (
    <div className="referral_wrappper">
      <DataTable
        theadItems={theadItems}
        tbodyItems={tbodyItems}
        noItemMsg="There is no data"
        colSpan="6"
      />
      {/* modal */}
      <Modal openModal={openModal} modalRef={modalRef}>
        <div className="faucet_common_modal_wrapper">
          <CardLayout
            style={{ backgroundColor: "#fff" }}
            className="faucet_card"
          >
            <div className="title">
              <h2>Edit Member</h2>
              <span onClick={() => setOpenModal(false)}>&times;</span>
            </div>
            <div className="faucet_commol_modal_field">
              <form onSubmit={handleSubmit}>
                <div className="form_group">
                  <Input
                    label="Wallet Name"
                    type="text"
                    name="wallet_name"
                    value={values.wallet_name}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  <Input
                    label="Wallet Address"
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  {loginUser?.data?.role === userRole.SUPER_ADMIN && (
                    <Input
                      label="Username"
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      inputGroupClass="left"
                    />
                  )}
                </div>
                <div className="submit_button">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Edit"}
                  </Button>
                </div>
              </form>
            </div>
          </CardLayout>
        </div>
      </Modal>
    </div>
  );
};

export default AllWalletTable;
