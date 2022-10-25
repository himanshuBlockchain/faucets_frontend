import React, { useEffect, useState } from "react";
import Header from "../../components/Shared/Header/Header";
import Footer from "../../components/Shared/Footer/Footer";
import Button from "../../components/UI/Button";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { loginValidate } from "../../validator";
import { Notification } from "../../components/UI/ToastNotification";
import { getLocalStorage, savedLocalStorage } from "../../utils/localStorage";
import { useAddLoginMutation } from "../../service/userApi";
import GoogleLogin from "react-google-login";
import useGoogleAuth from "../../hooks/useGoogleAuth";
const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValue] = useState({});
  const handleChange = (e) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // auth check
  useEffect(() => {
    if (getLocalStorage("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // log in with google
  const { responseErrorGoogle, responseSuccessGoogle, isLoading: loading } = useGoogleAuth();
  // error
  useEffect(() => {
    setErrors(loginValidate(values));
  }, [values]);

  // add user
  const [addLogin, { error, data, isLoading }] = useAddLoginMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/dashboard");
      savedLocalStorage("token", data?.token);
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  // auto logout
  // autoLogout("token", 86400)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification("All condition are required", "error");
    } else {
      await addLogin(values);
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
              <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
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
                <label htmlFor="password">Password</label>
                <input
                  type={passwordType ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                <span onClick={() => setPasswordType(!passwordType)}>
                  {passwordType ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
                {!errors?.password?.includes("required") && (
                  <p style={{ fontSize: "14px", color: "red" }}>
                    {errors?.password}
                  </p>
                )}
              </div>
              <div className="form_group">
                <Link to="/forgotpassword">Forgot password</Link>
              </div>
              <div className="form_group">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </div>
            </form>
            <div className="auth_footer">
              <p>
                Don't have an account? <Link to="/register">Signup</Link>{" "}
              </p>
              <div className="auth_media">
                <p>Or</p>
                <br />
                <GoogleLogin
                  // clientId="668363364374-s3b9e48iu5r1k5p9t66mcjm2g0mjio5u.apps.googleusercontent.com"
                  clientId="902731341146-i96tb5ehl1hlog621ba6qamdfss3qob1.apps.googleusercontent.com"
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

export default Login;
