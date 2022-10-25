import React, { useEffect, useState } from "react";
import Button from "../../../../components/UI/Button";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import { Notification } from "../../../../components/UI/ToastNotification";
import { useAddFaucetMutation } from "../../../../service/faucetApi";
import { faucetValidate } from "../../../../validator";

const AddNewFaucetProvider = () => {
  const [values, setValues] = useState({
    chain_name: "",
    website_url: "",
  });
  const [errors, setErrors] = useState({
    chain_name: "",
    website_url: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // error
  useEffect(() => {
    setErrors(faucetValidate(values));
  }, [values]);

  // add lead
  const [addFaucet, { error, data, isLoading }] = useAddFaucetMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      setValues({
        chain_name: "",
        website_url: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification("All condition are required", "error");
    } else {
      await addFaucet(values);
    }
  };
  return (
    <div className="faucet_page_wrapper">
      <CardLayout style={{ backgroundColor: "#fff" }} className="faucet_card">
        <div className="faucet_title">
          <h2>Add Faucet</h2>
        </div>
        <div className="faucet_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Chain Name"
                type="text"
                name="chain_name"
                placeholder="Enter chain name"
                onChange={handleChange}
                value={values.chain_name}
                inputGroupClass="left"
                disabled={false}
                error={errors.chain_name}
              />
              <Input
                label="Website URL"
                type="text"
                name="website_url"
                placeholder="Enter website url"
                onChange={handleChange}
                value={values.website_url}
                inputGroupClass="right"
                disabled={false}
                error={errors.website_url}
              />
            </div>
            <div className="submit_button">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Add Faucet"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default AddNewFaucetProvider;
