import React, { useEffect, useState } from "react";
import Button from "../../../../components/UI/Button";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import { Notification } from "../../../../components/UI/ToastNotification";
import { useEditEmailMutation } from "../../../../service/userApi";

const EditEmail = () => {
  const [values, setValues] = useState({
    email: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // edit email
  const [editEmail, { error, data, isLoading }] = useEditEmailMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editEmail(values);
  };
  return (
    <div className="faucet_page_wrapper">
      <CardLayout style={{ backgroundColor: "#fff" }} className="faucet_card">
        <div className="faucet_title">
          <h2>edit email</h2>
        </div>
        <div className="faucet_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Email"
                type="email"
                placeholder="Enter new email id"
                value={values.email}
                name="email"
                onChange={handleChange}
                inputGroupClass="left"
              />
            </div>
            <div className="submit_button">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Edit Email"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default EditEmail;
