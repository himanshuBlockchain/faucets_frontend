import React from "react";
import { RiAlertFill } from "react-icons/ri";
import Button from "../../../components/UI/Button";
const HomeWalletForm = ({
  handleSubmit,
  handleChange,
  values,
  network,
}) => {
  return (
    <div className="form_wrapper">
      <div className="form_warning">
        <RiAlertFill />{" "}
        <p>
          Your wallet is connected to{" "}
          <span style={{ fontWeight: "bold" }}>
            {network?.name || "Ethereum Rinkeby"}
          </span>
          , so you are requesting{" "}
          <span style={{ fontWeight: "bold" }}>
            {network?.name || "Ethereum Rinkeby"}
          </span>{" "}
          Link/ETH.
        </p>
      </div>
      <div className="wallet_form">
        <form onSubmit={handleSubmit}>
          <div className="form_group wallet_address">
            <div>
              <label htmlFor="wallet">Wallet Address</label>
            </div>
            <div className="input_flex">
              <input
                type="text"
                placeholder="Wallet Address..."
                name="wallet_address"
                value={values.wallet_address}
                onChange={handleChange}
                className="input_class"
              />
            </div>
          </div>
          <div className="rqs_type">
            <label htmlFor="wallet">Request Type</label>
            <div className="twice_input">
              <div className="form_group input_flex">
                <input
                  type="text"
                  placeholder="ETH"
                  name="eth"
                  value={values.eth}
                  disabled={true}
                  onChange={handleChange}
                  className="input_class"
                />
              </div>
            </div>
          </div>
          <div className="submit_btn">
            <Button type="submit" className="input_btn">Send Request</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeWalletForm;
