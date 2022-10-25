import React, { useEffect, useState } from "react";
import Header from "../../components/Shared/Header/Header";
import Footer from "../../components/Shared/Footer/Footer";
import Button from "../../components/UI/Button";
import { resetPasswordValidate } from "../../validator";
// import { useAddResetPassMutation } from "../../service/authApi";
import { Notification } from "../../components/UI/ToastNotification";
import { useParams } from "react-router-dom";
import { useAddResetPassMutation } from "../../service/userApi";
const ResetPassword = () => {
  const {token} = useParams();
  console.log("token", token)
  const [errors, setErrors] = useState({});
  const [values, setValue] = useState({
    password: "",
    token: token
  });
  const handleChange = (e) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // error
  useEffect(() => {
    setErrors(resetPasswordValidate(values));
  }, [values]);

  // add user
  const [addResetPass, { error, data, isLoading }] = useAddResetPassMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification("All condition are required", "error");
    } else {
      await addResetPass(values);
    }
  };
  return (
    <>
      <Header />
      <div className="auth_page_wrapper">
        <div className="container">
          <div className="auth_form">
            <div className="title">
              <h2>Reset Password</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your new password"
                  onChange={handleChange}
                />
                {!errors?.password?.includes("required") && (
                  <p style={{ fontSize: "14px", color: "red" }}>
                    {errors?.password}
                  </p>
                )}
              </div>
              <div className="form_group">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Reset"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
