/* eslint-disable react-hooks/exhaustive-deps */
import Web3 from "web3";

import React, { useState, useEffect } from "react";
import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";
import HomeWalletForm from "./HomeForm.container";
import { sendFaucet } from "./helper";
import { networkList } from "../../components/Shared/Header/Header";
import { Notification } from "../../components/UI/ToastNotification";

const Home = () => {
  const [network, setNetwork] = useState(networkList[0]);
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    // console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Notification(
      "Sending Faucet! Check your Balance after 10 seconds",
      "success"
    );
    try {
      await sendFaucet(values.wallet_address, 100000000000000000n, network);
    } catch (e) {
      Notification(e, "error");
    }
  };
  const recaptchHandler = (value) => {
    console.log("Captcha value:", value);
  };

  useEffect(() => {
    console.log(network);
  }, [network]);

  useEffect(() => {
    console.log(values);
  }, [handleChange]);

  useEffect(() => {
    const web3 = new Web3(network.network_details.RPC_URL);

    async function testingNow() {
      let x = await web3.eth.getGasPrice();
      console.log("PRICE", x);

      // await sendToken("0x5620c98fa0Cf2455DDf93904C6F2aDa8378bB69b");
    }
    testingNow();
  }, []);

  return (
    <>
      <Header network={network} setNetwork={setNetwork} />
      <div className="home_wrapper">
        <div className="notice_board">
          <div className="container">
            <div className="notice_text">
              <p>Current Network : {network.network_details.NETWORK_NAME} </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="home_content">
            <div className="content_title">
              <h2>
                Request {network.network_details.NETWORK_NAME} Testnet Faucet
              </h2>
              <p>
                Get testnet Faucet for an account on one of the supported
                blockchain testnets so you can create and test your own web3
                application
              </p>
            </div>
            <HomeWalletForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              recaptchHandler={recaptchHandler}
              network={network}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
