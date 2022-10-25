import React, { useEffect, useRef, useState } from "react";
import DataTable from "../../../../components/UI/DataTable";
import ActionCell from "../../../../components/UI/DataTable/ActionCell";
import TextCell from "../../../../components/UI/DataTable/TextCell";
import { Notification } from "../../../../components/UI/ToastNotification";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import {
  useDeleteFaucetMutation,
  useEditFaucetMutation,
  useGetAllFaucetQuery,
} from "../../../../service/faucetApi";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import { userRole } from "../../../../config/USER_ROLE";
import Modal from "../../../../components/UI/Modal";
import CardLayout from "../../../../components/UI/CardLayout";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useGetLoginUserQuery } from "../../../../service/userApi";
// import { useGetUserLoginQuery } from "../../../../service/authApi";

const AllProviderTable = () => {
  const {data: loginUser} = useGetLoginUserQuery();
  const { data } = useGetAllFaucetQuery();
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // edit faucet
  const [editFaucet, { error, data: faucets, isLoading }] = useEditFaucetMutation();
  useEffect(() => {
    if (faucets?.message) {
      Notification(faucets?.message, "success");
      setOpenModal(false)
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, faucets]);
  // delete faucet
  const [deleteFaucet, { error: deleteError, data: deleteFaucets }] =
    useDeleteFaucetMutation();
  useEffect(() => {
    if (deleteFaucets?.message) {
      Notification(deleteFaucets?.message, "success");
    } else {
      Notification(deleteError?.data?.message, "error");
    }
  }, [deleteError, deleteFaucets]);
  // delete handler
  const handleDelete = async (dt) => {
    await deleteFaucet(dt);
  };
  // edit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editFaucet(values);
  };
  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell
      key="chain_name"
      text="Chain Name"
      as="th"
      className="table_th"
    />,

    <TextCell
      key="Webiste_url"
      text="Website URL"
      as="th"
      className="table_th"
    />,
    <TextCell
      key="faucet_owner"
      text="Faucet Owner"
      as="th"
      className="table_th"
    />,
    <TextCell key="faucetAction" text="Action" as="th" className="table_th" />,
  ];
  const tbodyItems = data?.data?.map((d, i) => [
    [
      <TextCell key={i + 1} text={i + 1} as="td" className="table_td" />,
      <TextCell
        key={d.chain_name}
        text={d.chain_name}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={d.website_url}
        text={d.website_url}
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
            icon: <AiFillDelete onClick={() => handleDelete(d)} />,
            className: "delete_icon",
            style: {
              cursor: "pointer",
              fontSize: "20px",
              color: "red",
              marginRight: "10px",
            },
          },
          {
            icon: (
              <FaEdit
                onClick={() => {
                  buttonHandler();
                  setValues(d);
                }}
              />
            ),
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
                    label="Chain Name"
                    type="text"
                    name="chain_name"
                    value={values.chain_name}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  <Input
                    label="Website URL"
                    type="text"
                    name="website_url"
                    value={values.website_url}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  {loginUser?.data?.role === userRole.SUPER_ADMIN && (
                    <Input
                      label="Faucet Owner"
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

export default AllProviderTable;
