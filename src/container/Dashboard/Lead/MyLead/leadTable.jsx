import React, { useEffect, useState, useRef } from "react";
import DataTable from "../../../../components/UI/DataTable";
import TextCell from "../../../../components/UI/DataTable/TextCell";
import {
  useDeleteLeadMutation,
  useEditLeadMutation,
  useGetLeadQuery,
} from "../../../../service/leadApi";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Modal from "../../../../components/UI/Modal";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import Button from "../../../../components/UI/Button";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import ActionCell from "../../../../components/UI/DataTable/ActionCell";
import { Notification } from "../../../../components/UI/ToastNotification";

const LeadTable = () => {
  const { data } = useGetLeadQuery();
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // edit lead
  const [editLead, { error, data: lead, isLoading }] = useEditLeadMutation();
  useEffect(() => {
    if (lead?.message) {
      Notification(lead?.message, "success");
      setOpenModal(false)
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, lead]);
  // delete lead
  const [deleteLead, { error: deleteError, data: deleteLeads }] =
    useDeleteLeadMutation();
  useEffect(() => {
    if (deleteLeads?.message) {
      Notification(deleteLeads?.message, "success");
    } else {
      Notification(deleteError?.data?.message, "error");
    }
  }, [deleteLeads, deleteError]);
  // delete handler
  const handleDelete = async (dt) => {
    await deleteLead(dt);
  };
  // edit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editLead(values);
  };
  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell key="name" text="Name" as="th" className="table_th" />,
    <TextCell key="email" text="Email" as="th" className="table_th" />,
    <TextCell key="mobile" text="Mobile" as="th" className="table_th" />,
    <TextCell
      key="leattabelaction"
      text="Action"
      as="th"
      className="table_th"
    />,
  ];
  const tbodyItems = data?.data?.map((d, i) => [
    [
      <TextCell key={i + 1} text={i + 1} as="td" className="table_td" />,
      <TextCell
        key={d.name}
        text={d.name}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={d.email}
        text={d.email}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={d.mobile}
        text={d.mobile}
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
              <h2>Edit Lead</h2>
              <span onClick={() => setOpenModal(false)}>&times;</span>
            </div>
            <div className="faucet_commol_modal_field">
              <form onSubmit={handleSubmit}>
                <div className="form_group">
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={values.name}
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
                  <Input
                    label="Mobile"
                    type="number"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
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

export default LeadTable;
