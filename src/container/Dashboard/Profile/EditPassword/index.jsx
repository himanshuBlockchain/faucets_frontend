import React, { useEffect, useState } from "react";
import Button from "../../../../components/UI/Button";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import { Notification } from "../../../../components/UI/ToastNotification";
import { useEditPasswordMutation } from "../../../../service/userApi";
import { passwordValidate } from "../../../../validator";

const EditPassword = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    current_password: "",
    new_password: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // error
  useEffect(() => {
    setErrors(passwordValidate(values));
  }, [values]);

  // edit password
  const [editPassword, { error, data, isLoading }] = useEditPasswordMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      setValues({
        current_password: "",
        new_password: "",
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
      await editPassword(values);
    }
  };
  return (
    <div className="faucet_page_wrapper">
      <CardLayout style={{ backgroundColor: "#fff" }} className="faucet_card">
        <div className="faucet_title">
          <h2>edit password</h2>
        </div>
        <div className="faucet_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Current Password"
                type="text"
                value={values.current_password}
                name="current_password"
                placeholder="Enter current password"
                onChange={handleChange}
                inputGroupClass="left"
                error={errors.current_password}
              />
              <Input
                label="New Password"
                type="text"
                value={values.new_password}
                name="new_password"
                placeholder="Enter new password"
                onChange={handleChange}
                inputGroupClass="left"
                error={errors.new_password}
              />
            </div>
            <div className="submit_button">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Edit Password"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default EditPassword;
