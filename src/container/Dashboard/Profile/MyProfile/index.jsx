import React, { useEffect } from "react";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import avatar from "../../../../assets/avatar.png";
// import { useGetUserLoginQuery } from "../../../../service/authApi";
import {
  useEditImageMutation,
  useGetLoginUserQuery,
} from "../../../../service/userApi";
import { Notification } from "../../../../components/UI/ToastNotification";

const MyProfile = () => {
  const { data } = useGetLoginUserQuery();
  console.log(`${data?.data?.avatar}`);
  // edit profile
  const [uploadImage, { error, data: user, isLoading }] =
    useEditImageMutation();
  useEffect(() => {
    if (user?.message) {
      Notification(user?.message, "success");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, user]);
  const handleChange = async (e) => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    await uploadImage(formData);
  };
  return (
    <div className="faucet_my_profile_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="faucet_my_profile_card"
      >
        <div className="faucet_section_title">
          <h2>My Profile</h2>
        </div>
        <div className="faucet_profile_head">
          <div className="faucet_photo_content">
            <div className="faucet_cover_photo"></div>
          </div>
          <div className="faucet_profile_short_info">
            <div className="faucet_profile_photo">
              <img
                src={data?.data?.avatar ? data?.data?.avatar : avatar}
                width="100%"
                alt="img"
              />
              <form encType="multipart/form-data">
                <div className="form-check form-check-label">
                  <label htmlFor="img" className="form-check-label">
                    {isLoading ? (
                      "Uploading..."
                    ) : (
                      <Input
                        type="file"
                        name="image"
                        className="form-check-label"
                        onChange={handleChange}
                      />
                    )}
                  </label>
                </div>
              </form>
            </div>
            <div className="faucet_profile_info">
              <div className="faucet_profile_name">
                <h2>{data?.data?.name}</h2>
                <p>Blockchain Developer</p>
              </div>
              <div className="faucet_profile_email">
                <h2>{data?.data?.email}</h2>
                <p>Email</p>
              </div>
            </div>
          </div>
        </div>
        <div className="faucet_profile_bottom">
          <div className="faucet_profile_title">
            <h2>Profile Info</h2>
          </div>
          <div className="faucet_profile_field">
            <div className="form_group">
              <Input
                label="Username"
                type="text"
                value={data?.data?.username}
                disabled={true}
                inputGroupClass="left"
              />
              <Input
                label="Name"
                type="text"
                value={data?.data?.name}
                disabled={true}
                inputGroupClass="right"
              />
            </div>
            <div className="form_group">
              <Input
                label="Email"
                type="text"
                value={data?.data?.email}
                disabled={true}
                inputGroupClass="left"
              />
              <Input
                label="Sponsor ID"
                type="text"
                value={data?.data?.sponsorid}
                disabled={true}
                inputGroupClass="right"
              />
            </div>
            <div className="form_group">
              <Input
                label="Your referral link"
                type="text"
                value={`${window.location.origin}/register/${data?.data?.username}`}
                disabled={true}
                inputGroupClass="right"
              />
            </div>
          </div>
        </div>
      </CardLayout>
      <br />
    </div>
  );
};

export default MyProfile;
