import React, { useState } from "react";
import { RiAlertFill } from "react-icons/ri";
// import { toast } from "react-toastify";
import Button from "../../components/UI/Button";
// import Recaptch from "../../components/UI/Recaptch";
// import { Notification } from "../../components/UI/ToastNotification";
import HomeETHHistory from "./Home.ETHHis";
// import HomeTestLinkHistory from "./Home.testLinkHis";
const HomeWalletForm = ({
  handleSubmit,
  handleChange,
  recaptchHandler,
  network,
}) => {
  const [tabs, setTabs] = useState(1);
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
                onChange={handleChange}
                className="input_class"
              />
            </div>
          </div>
          <div className="rqs_type">
            <label htmlFor="wallet">Request Type</label>
            <div className="twice_input">
              {/* <div className="form_group rst_type_input input_flex">
                <input
                  type="text"
                  placeholder="Test link"
                  name="test_link"
                  value="20 Test Link"
                  disabled={true}
                  onChange={handleChange}
                  className="input_class"
                />
              </div> */}
              <div className="form_group input_flex">
                <input
                  type="text"
                  placeholder="ETH"
                  name="eth"
                  value="0.1 ETH"
                  disabled={true}
                  onChange={handleChange}
                  className="input_class"
                />
              </div>
            </div>
          </div>
          {/* <div className="recaptch_form">
            <Recaptch onChange={recaptchHandler} />
          </div> */}
          <div className="submit_btn">
            <Button type="submit" className="input_btn">Send Request</Button>
          </div>
          {/* <div className="submit_btn">
            <Button type="button" onClick={()=>Notification('Notify working', 'success')} className="input_btn">Toastify</Button>
          </div> */}
        </form>
      </div>
      <div className="request_history">
        <h2>Request History</h2>
        <div className="tabs">
          <span
            onClick={() => setTabs(1)}
            className={tabs === 1 && "active_tabs"}
          >
            Transaction History
          </span>
          {/* <span
            onClick={() => setTabs(2)}
            className={tabs === 2 && "active_tabs"}
          >
            TestLink Transaction History
          </span> */}
        </div>
        <div className="history_text">
          {tabs === 1 && <HomeETHHistory network={network}/>}
          {/* {tabs === 2 && <HomeTestLinkHistory />} */}
        </div>
      </div>
    </div>
  );
};

export default HomeWalletForm;
