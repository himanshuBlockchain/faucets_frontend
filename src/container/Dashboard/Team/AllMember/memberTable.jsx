import React, { useEffect, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import {
  useDeleteMemberMutation,
  useEditMemberMutation,
  useGetAllMemberQuery,
} from "../../../../service/teamApi";
import TextCell from "../../../../components/UI/DataTable/TextCell";
import { Notification } from "../../../../components/UI/ToastNotification";
import ActionCell from "../../../../components/UI/DataTable/ActionCell";
import DataTable from "../../../../components/UI/DataTable";
import { userRole } from "../../../../config/USER_ROLE";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import Modal from "../../../../components/UI/Modal";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import Button from "../../../../components/UI/Button";
import Select from "../../../../components/UI/Select";
import { useGetLoginUserQuery } from "../../../../service/userApi";
// import { useGetUserLoginQuery } from "../../../../service/authApi";

const MemberTable = () => {
  const { data: loginUser } = useGetLoginUserQuery();
  const { data } = useGetAllMemberQuery();
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // edit member
  const [editMember, { error, data: member, isLoading }] =
    useEditMemberMutation();
  useEffect(() => {
    if (member?.message) {
      Notification(member?.message, "success");
      setOpenModal(false)
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, member]);
  // delete member
  const [deleteMember, { error: deleteError, data: deleteMembers }] =
    useDeleteMemberMutation();
  useEffect(() => {
    if (deleteMembers?.message) {
      Notification(deleteMembers?.message, "success");
    } else {
      Notification(deleteError?.data?.message, "error");
    }
  }, [deleteError, deleteMembers]);
  // delete handler
  const handleDelete = async (dt) => {
    await deleteMember(dt);
  };
  // edit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editMember(values);
  };
  const theadItems = [
    <TextCell key="sr" text="#" as="th" className="table_th" />,
    <TextCell key="username" text="Username" as="th" className="table_th" />,
    <TextCell key="name" text="Name" as="th" className="table_th" />,
    <TextCell key="sponsorid" text="Sponsor ID" as="th" className="table_th" />,
    <TextCell key="email" text="Email" as="th" className="table_th" />,
    userRole.SUPER_ADMIN === "superadmin" && (
      <TextCell key="role" text="Role" as="th" className="table_th" />
    ),
    <TextCell key="memberaction" text="Action" as="th" className="table_th" />,
  ];
  const tbodyItems = data?.data.map((dt, i) => [
    [
      <TextCell key={i + 1} text={i + 1} as="td" className="table_td" />,
      <TextCell
        key={dt.username}
        text={dt.username}
        as="td"
        className="table_td"
      />,
      <TextCell key={dt.name} text={dt.name} as="td" className="table_td" />,
      <TextCell
        key={dt.sponsorid}
        text={dt.sponsorid}
        as="td"
        className="table_td"
      />,
      <TextCell key={dt.email} text={dt.email} as="td" className="table_td" />,
      <TextCell key={dt.role} text={dt.role} as="td" className="table_td" />,

      <ActionCell
        key="delete"
        as="td"
        actions={[
          {
            icon: edit ? (
              <span onClick={() => setEdit(false)}>&#10006;</span>
            ) : (
              <AiFillDelete onClick={() => handleDelete(dt)} />
            ),
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
                  setValues(dt);
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
                    label="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  <Input
                    label="Sponsor ID"
                    type="text"
                    name="sponsorid"
                    value={values.sponsorid}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  <Input
                    label="Email"
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  {loginUser?.data?.role === userRole.SUPER_ADMIN && (
                    <div className="select_group">
                      <Select
                        label="Role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        options={["user", "admin"]}
                      />
                    </div>
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

export default MemberTable;
