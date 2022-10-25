import React, { useEffect, useState } from "react";
import Button from "../../../../components/UI/Button";
import CardLayout from "../../../../components/UI/CardLayout";
import Input from "../../../../components/UI/Input";
import Select from "../../../../components/UI/Select";
import { useAddLeadMutation } from "../../../../service/leadApi";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../../components/UI/ToastNotification";
import { leadValidate } from "../../../../validator";

const AddLead = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    gender: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    gender: "",
    country: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // error
  useEffect(() => {
    setErrors(leadValidate(values));
  }, [values]);

  // add lead
  const [addLead, { error, data, isLoading }] = useAddLeadMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      setValues({
        name: "",
        email: "",
        mobile: "",
        city: "",
        gender: "",
        country: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification("All condition are required", "error");
    } else {
      await addLead(values);
    }
  };
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((json) => {
        setCountries(json.map((c) => c.name));
      });
  }, []);
  return (
    <div className="faucet_page_wrapper">
      <CardLayout style={{ backgroundColor: "#fff" }} className="faucet_card">
        <div className="faucet_title">
          <h2>Add Lead</h2>
        </div>
        <div className="faucet_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={handleChange}
                value={values.name}
                inputGroupClass="left"
                disabled={false}
                error={errors.name}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                inputGroupClass="right"
                error={errors.email}
              />
            </div>
            <div className="form_group">
              <Input
                label="Mobile"
                type="number"
                name="mobile"
                placeholder="Enter mobile"
                onChange={handleChange}
                value={values.mobile}
                inputGroupClass="left"
                error={errors.mobile}
              />
              <Input
                label="City"
                type="text"
                name="city"
                placeholder="Enter city"
                onChange={handleChange}
                value={values.city}
                inputGroupClass="right"
                error={errors.city}
              />
            </div>
            <div className="form_group">
              <div className="gender_select">
                <Select
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  value={values.gender}
                  options={["Male", "Female", "Others"]}
                />
              </div>
              <div>
                <Select
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  value={values.country}
                  options={countries}
                />
              </div>
            </div>
            <div className="submit_button">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Add Lead"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default AddLead;
