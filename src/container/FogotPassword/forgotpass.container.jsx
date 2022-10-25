import React, { useEffect, useState } from "react";
import Header from "../../components/Shared/Header/Header";
import Footer from "../../components/Shared/Footer/Footer";
import Button from "../../components/UI/Button";
import { forgotPasswordValidate } from "../../validator";
// import { useAddForgotPassMutation } from "../../service/authApi";
import { Notification } from "../../components/UI/ToastNotification";
import { useAddForgotPassMutation } from "../../service/userApi";
const ForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const [values, setValue] = useState({
    email: ""
  });
  const handleChange = (e) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // error
  useEffect(() => {
    setErrors(forgotPasswordValidate(values));
  }, [values]);

  // add user
  const [addForgot, { error, data, isLoading }] = useAddForgotPassMutation();
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
      await addForgot(values);
    }
  };
  return (
    <>
      <Header />
      <div className="auth_page_wrapper">
        <div className="container">
          <div className="auth_form">
            <div className="title">
              <h2>Forgot Password</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                {!errors?.email?.includes("required") && (
                  <p style={{ fontSize: "14px", color: "red" }}>
                    {errors?.email}
                  </p>
                )}
              </div>
              <div className="form_group">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Send Reset Link"}
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

export default ForgotPassword;
