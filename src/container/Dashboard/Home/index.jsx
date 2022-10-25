import React, { useRef, useState } from "react";
import HomeCard from "./Home.Card";
import { AiFillWallet } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import ethereum from "../../../assets/img/ethereum.svg";
import { FiUser } from "react-icons/fi";
import { MdVolunteerActivism } from "react-icons/md";
import HomeWalletForm from "./Home.form";
import Popover from "../../../components/UI/Popover";
import { networkList } from "../../../components/Shared/Header/Header";
import { IoIosArrowDown } from "react-icons/io";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { Notification } from "../../../components/UI/ToastNotification";

const Dashboard = () => {
  const [network, setNetwork] = useState(networkList[0]);
  const [values, setValues] = useState({
    wallet_address: "",
    eth: "0.5 ETH",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Notification(
      "Sending Faucet! Check your Balance after 10 seconds",
      "success"
    );
    console.log({ ...values, ...network });
  };

  const [openNetwork, setOpenNetwork] = useState(false);
  const networkRef = useRef(null);
  useClickOutside(networkRef, () => setOpenNetwork(false));
  return (
    <div className="faucet_homPage_wrapper">
      <div className="faucet_section_title">
        <h2>Dashboard</h2>
      </div>
      <div className="network_selector">
        <div className="network_list" ref={networkRef}>
          <div
            className="network_state"
            onClick={() => setOpenNetwork(!openNetwork)}
          >
            <img
              src={network?.img || ethereum}
              width="15px"
              height="15px"
              alt=""
            />
            <span className="network_name">
              {network?.name || "Ethereum Kovan"}
            </span>{" "}
            <span>
              <IoIosArrowDown />
            </span>
          </div>
          <Popover openPopover={openNetwork} className="network_list_popover">
            <ul>
              {networkList?.map((d) => (
                <li
                  key={d.id}
                  onClick={() => {
                    setOpenNetwork(false);
                    setNetwork(d);
                  }}
                >
                  <img src={d.img} alt="img" />
                  <p>{d.name}</p>
                </li>
              ))}
            </ul>
          </Popover>
        </div>
      </div>
      <div className="dashboard_form_wrapper">
        <HomeWalletForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          network={network}
          values={values}
        />
      </div>
      <div className="faucet_dash_content card_row">
        <HomeCard
          chainName="ETH"
          totalbal="10 ETH"
          used=" 5 ETH"
          availbleBal="5 ETH"
          icon={
            <FiUser
              style={{
                background: `var(--bg-cyan-linear-gradient)`,
                boxShadow: `var(--box-shadow-cyan)`,
              }}
            />
          }
        />
        <HomeCard
          chainName="ETH"
          totalbal="10 ETH"
          used=" 5 ETH"
          availbleBal="5 ETH"
          icon={
            <AiFillWallet
              style={{
                background: `var(--bg-cyan-linear-gradient)`,
                boxShadow: `var(--box-shadow-cyan)`,
              }}
            />
          }
        />
        <HomeCard
          chainName="ETH"
          totalbal="10 ETH"
          used=" 5 ETH"
          availbleBal="5 ETH"
          icon={
            <MdVolunteerActivism
              style={{
                background: `var(--bg-cyan-linear-gradient)`,
                boxShadow: `var(--box-shadow-cyan)`,
              }}
            />
          }
        />
        <HomeCard
          chainName="ETH"
          totalbal="10 ETH"
          used=" 5 ETH"
          availbleBal="5 ETH"
          icon={
            <FaMoneyBillWave
              style={{
                background: `var(--bg-cyan-linear-gradient)`,
                boxShadow: `var(--box-shadow-cyan)`,
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
