import React, { useEffect, useState } from "react";
import Button from "../../../components/UI/Button";
import CardLayout from "../../../components/UI/CardLayout";
import Input from "../../../components/UI/Input";
import Select from "../../../components/UI/Select";
import { Notification } from "../../../components/UI/ToastNotification";
import { useAddWalletMutation, useGetWalletListQuery } from "../../../service/walletApi";
import { walletValidate } from "../../../validator";

const AddWallet = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    wallet_name: "",
    address: "",
  });

  // fetch wallet list
  const {data:walletList} = useGetWalletListQuery();
  const walletNwm = walletList?.data?.map(d=>d.wallet_name);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // error
  useEffect(() => {
    setErrors(walletValidate(values));
  }, [values]);
  // add lead
  const [addWallet, { error, data, isLoading }] = useAddWalletMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      setValues({
        wallet_name: "",
        address: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification("All fields are required", "error");
    } else {
      await addWallet(values);
    }
  };
  return (
    <div className="faucet_addpayment_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="faucet_addpayment_card"
      >
        <div className="faucet_addpayment_title">
          <h2>Add Wallet</h2>
        </div>
        <div className="faucet_addpayment_field">
          <div
            className="form_group"
            style={{
              display: "inherit",
              marginTop: "-10px",
              marginBottom: "15px",
            }}
          >
            <div>
              <Select
                label="Wallet"
                name="wallet_name"
                value={values.wallet_name}
                onChange={handleChange}
                options={walletNwm}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Address"
                type="text"
                name="address"
                value={values.address}
                placeholder="Enter wallet address"
                onChange={handleChange}
                error={errors.address}
              />
            </div>
            <div className="submit_button">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default AddWallet;
