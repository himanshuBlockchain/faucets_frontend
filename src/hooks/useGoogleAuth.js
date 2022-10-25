import { gapi } from "gapi-script";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddGoogleAuthMutation } from "../service/userApi";
import { savedLocalStorage } from "../utils/localStorage";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "902731341146-i96tb5ehl1hlog621ba6qamdfss3qob1.apps.googleusercontent.com",
        plugin_name: "simple",
      });
    });
  }, []);
  const [addGoogleAuth, { data: google, isLoading }] = useAddGoogleAuthMutation();
  const responseSuccessGoogle = async (response) => {
    console.log(response)
    await addGoogleAuth(response?.tokenObj?.id_token);
  };
  useEffect(() => {
    if (google?.token) {
      navigate("/dashboard");
      savedLocalStorage("token", google?.token);
    }
  }, [google, navigate]);

  const responseErrorGoogle = (error) => {
    console.log(error);
  };
  return { responseSuccessGoogle, responseErrorGoogle, isLoading };
};

export default useGoogleAuth;
