import React, { useEffect, useState } from "react";
import Button from "../../../../components/UI/Button";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import { Notification } from "../../../../components/UI/ToastNotification";
// import { useGetUserLoginQuery } from "../../../../service/authApi";
import {
  useEditUserMutation, useGetLoginUserQuery,
} from "../../../../service/userApi";

const EditProfile = () => {
  // fetch user
  const { data: user } = useGetLoginUserQuery();
  const [values, setValues] = useState({
    username: user?.data?.username,
    name: user?.data?.name,
    email: user?.data?.email,
    sponsorid: user?.data?.sponsorid,
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // edit profile
  const [editProfile, {error, data, isLoading }] = useEditUserMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProfile(values);
  };
  return (
    <div className="faucet_page_wrapper">
      <CardLayout style={{ backgroundColor: "#fff" }} className="faucet_card">
        <div className="faucet_title">
          <h2>edit profile</h2>
        </div>
        <div className="faucet_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Username"
                type="text"
                value={values.username}
                name="username"
                onChange={handleChange}
                inputGroupClass="left"
                disabled={true}
              />
              <Input
                label="Name"
                type="text"
                value={values.name}
                name="name"
                onChange={handleChange}
                inputGroupClass="right"
                disabled={false}
              />
            </div>
            <div className="form_group">
              <Input
                label="Email"
                type="email"
                value={values.email}
                name="email"
                onChange={handleChange}
                inputGroupClass="left"
                disabled={true}
              />
              <Input
                label="Sponsor ID"
                type="text"
                value={values.sponsorid}
                name="sponsorid"
                onChange={handleChange}
                inputGroupClass="right"
                disabled={true}
              />
            </div>
            <div className="submit_button">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Edit Profile"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default EditProfile;
