import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/UI/Button";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import Modal from "../../../../components/UI/Modal";
import SectionCommonTable from "../../../../components/UI/SectionCommonTable";
import { Notification } from "../../../../components/UI/ToastNotification";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useAddChainMutation } from "../../../../service/chainApi";
import ChainTable from "./chainTable";

const Chain = () => {
  const [values, setValues] = useState({})
  const handleChange = (e) =>{
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
   // add chain
   const [addChain, { error, data: chain, isLoading }] = useAddChainMutation();
   useEffect(() => {
     if (chain?.message) {
       Notification(chain?.message, "success");
       setOpenModal(false)
     } else {
       Notification(error?.data?.message, "error");
     }
   }, [error, chain]);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    await addChain(values)
    console.log(values)
  }
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const buttonHandler = () => {
    setOpenModal(!openModal);
    modalRef?.current?.showModal();
  };
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="Chain"
        button
        buttonText="Add Chain"
        buttonHandler={buttonHandler}
        table={<ChainTable />}
      />
      {/* modal */}
      <Modal openModal={openModal} modalRef={modalRef}>
        <div className="faucet_common_modal_wrapper">
          <CardLayout
            style={{ backgroundColor: "#fff" }}
            className="faucet_card"
          >
            <div className="title">
              <h2>Add Chain</h2>
              <span onClick={() => setOpenModal(false)}>&times;</span>
            </div>
            <div className="faucet_commol_modal_field">
              <form onSubmit={handleSubmit}>
                <div className="form_group">
                  <Input
                    label="Chain Name"
                    type="text"
                    name="chain_name"
                    placeholder="Enter chain name"
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  <Input
                    label="Chain ID"
                    type="text"
                    name="chain_id"
                    placeholder="Enter chain id"
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                  <Input
                    label="Currency"
                    type="text"
                    name="currency"
                    placeholder="Enter currency"
                    onChange={handleChange}
                    inputGroupClass="left"
                  />
                </div>
                <div className="submit_button">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Add"}
                  </Button>
                </div>
              </form>
            </div>
          </CardLayout>
        </div>
      </Modal>
    </>
  );
};

export default Chain;
