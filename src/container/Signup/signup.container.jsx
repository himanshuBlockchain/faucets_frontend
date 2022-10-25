import React, { useState } from "react";
import Header from "../../components/Shared/Header/Header";
import Footer from "../../components/Shared/Footer/Footer";
import Button from "../../components/UI/Button";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { signupValidate } from "../../validator";
import { Notification } from "../../components/UI/ToastNotification";
import { getLocalStorage, removeLocalStorage } from "../../utils/localStorage";
import { useAddUserMutation } from "../../service/userApi";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import GoogleLogin from "react-google-login";
const Signup = () => {
  const { referral } = useParams();
  const navigate = useNavigate();
  const [values, setValue] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // log in with google
  const { responseErrorGoogle, responseSuccessGoogle, isLoading: loading } = useGoogleAuth();

  // auth check
  useEffect(() => {
    if (getLocalStorage("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);
  useEffect(() => {
    if (referral) {
      localStorage.setItem("referral_id", JSON.stringify(referral));
    }
  }, [referral]);

  // add user
  const [addUser, { data, error, isLoading }] = useAddUserMutation();

  // error
  useEffect(() => {
    setErrors(signupValidate(values));
  }, [values]);

  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/login");
      removeLocalStorage("referral_id");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification("All condition are required", "error");
    } else {
      addUser(values);
    }
  };
  // password type change
  const [passwordType, setPasswordType] = useState(false);
  return (
    <>
      <Header />
      <div className="auth_page_wrapper">
        <div className="container">
          <div className="auth_form">
            <div className="title">
              <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label htmlFor="sponsorid">Sponsor ID</label>
                <input
                  type="text"
                  name="sponsorid"
                  value={
                    referral || JSON.parse(localStorage.getItem("referral_id"))
                  }
                  placeholder="Enter your sponsor id"
                  onChange={handleChange}
                />
              </div>
              <div className="form_group">
                <label htmlFor="name">
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
                {!errors.name?.includes("required") && (
                  <p style={{ fontSize: "14px", color: "red" }}>
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="form_group">
                <label htmlFor="username">
                  Username <span style={{ color: "red" }}>*</span>{" "}
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  onChange={handleChange}
                />
                {!errors.username?.includes("required") && (
                  <p style={{ fontSize: "14px", color: "red" }}>
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="form_group">
                <label htmlFor="email">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                {!errors.email?.includes("required") && (
                  <p style={{ fontSize: "14px", color: "red" }}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="form_group">
                <label htmlFor="password">
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type={passwordType ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                <span onClick={() => setPasswordType(!passwordType)}>
                  {passwordType ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
                {!errors.password?.includes("required") && (
                  <p style={{ fontSize: "14px", color: "red" }}>
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="form_group">
                <Button type="submit" disabled={isLoading ? true : false}>
                  {isLoading ? "Loading..." : "Sign up"}
                </Button>
              </div>
            </form>
            <div className="auth_footer">
              <p>
                Already have an account? <Link to="/login">Login</Link>{" "}
              </p>
              <div className="auth_media">
                <p>Or</p>
                <br />
                <GoogleLogin
                  clientId="902731341146-i96tb5ehl1hlog621ba6qamdfss3qob1.apps.googleusercontent.com"
                  // clientId="668363364374-s3b9e48iu5r1k5p9t66mcjm2g0mjio5u.apps.googleusercontent.com"
                  buttonText={loading ? "Loading..." : "Sign in with Google"}
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseErrorGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
