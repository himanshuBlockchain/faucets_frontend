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
import { useClickOutside } from "../../../../hooks/useClickOutside";
import {
  useDeleteChainMutation,
  useEditChainMutation,
  useGetChainQuery,
} from "../../../../service/chainApi";

const ChainTable = () => {
  const { data } = useGetChainQuery();
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // edit wallet
  const [editChain, { error, data: chain, isLoading }] = useEditChainMutation();
  useEffect(() => {
    if (chain?.message) {
      Notification(chain?.message, "success");
      setOpenModal(false);
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, chain]);
  // delete wallet
  const [deleteChain, { error: deleteError, data: deleteChains }] =
    useDeleteChainMutation();
  useEffect(() => {
    if (deleteChains?.message) {
      Notification(deleteChains?.message, "success");
    } else {
      Notification(deleteChains?.data?.message, "error");
    }
  }, [deleteChains, deleteError]);
  // delete handler
  const handleDelete = async (dt) => {
    await deleteChain(dt);
  };
  // edit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editChain(values);
  };
  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell
      key="chain_name"
      text="Chain Name"
      as="th"
      className="table_th"
    />,
    <TextCell key="chain_id" text="Chain ID" as="th" className="table_th" />,
    <TextCell key="currency" text="Currency" as="th" className="table_th" />,
    <TextCell key="walletaction" text="Action" as="th" className="table_th" />,
  ];
  const tbodyItems = data?.chain?.map((d, i) => [
    [
      <TextCell key={i + 1} text={i + 1} as="td" className="table_td" />,
      <TextCell
        key={d.chain_name}
        text={d.chain_name}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={d.chain_id}
        text={d.chain_id}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={d.currency}
        text={d.currency}
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
              <h2>Edit Chain</h2>
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
                    label="Chain ID"
                    type="text"
                    name="chain_id"
                    value={values.chain_id}
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  <Input
                    label="Currency"
                    type="text"
                    name="currency"
                    value={values.currency}
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

export default ChainTable;
