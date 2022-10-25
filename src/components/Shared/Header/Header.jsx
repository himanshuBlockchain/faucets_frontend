import React, { useRef, useState } from "react";
// import arbi from "../../../assets/img/arbitrum.svg";
// import avalanche from "../../../assets/img/avalanche.svg";
// import bsc from "../../../assets/img/bsc.svg";
import ethereum from "../../../assets/img/ethereum.svg";
// import fantom from "../../../assets/img/fantom.svg";
// import harmony from "../../../assets/img/harmony.svg";
// import poa from "../../../assets/img/poa.svg";
import polygon from "../../../assets/img/polygon.svg";

import { useClickOutside } from "../../../hooks/useClickOutside";
import Popover from "../../UI/Popover";
import { IoIosArrowDown } from "react-icons/io";
import { IoWallet } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import metamask from "../../../assets/img/MetaMask.svg";
import WalletConnect from "../../../assets/img/WalletConnect.svg";
// import { networkList } from "../../../config";
import { network_details } from "../../../config";
import { getLocalStorage, removeLocalStorage } from "../../../utils/localStorage";
export const networkList = [
  {
    id: "mfsere7r7",
    name: "Ethereum Rinkeby",
    img: ethereum,
    network_details: network_details.rinkeby,
  },
  // {
  //   id: "syerweru",
  //   name: "Arbitrum Rinkeby",
  //   img: arbi,
  //   network_details : network_details["arbitrum-rinkeby"],
  // },
  // {
  //   id: "s7e8r8e",
  //   name: "Avalanche Fuji",
  //   img: avalanche,
  // },
  // {
  //   id: "fdf7we7r",
  //   name: "BNB Chain Testnet",
  //   img: bsc,
  // },

  // {
  //   id: "fd7fwser",
  //   name: "Fantom Testnet",
  //   img: fantom,
  // },
  // {
  //   id: "se7r8s8er",
  //   name: "Harmony Testnet",
  //   img: harmony,
  // },
  // {
  //   id: "dfser77r",
  //   name: "POA Network Sokol",
  //   img: poa,
  // },
  // {
  //   id: "mvnus7er",
  //   name: "Polygon Mumbai",
  //   img: polygon,
  //   network_details :network_details.mumbai,
  // },
  {
    id: "mvnusuer",
    name: "Ropsten",
    img: polygon,
    network_details: network_details.ropsten,
  },
];

const Header = ({ network, setNetwork }) => {
  // const [network, setNetwork] = useState(null);
  // network selector
  const [openNetwork, setOpenNetwork] = useState(false);
  const networkRef = useRef(null);
  useClickOutside(networkRef, () => setOpenNetwork(false));
  // user toggler selector
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  useClickOutside(userMenuRef, () => setOpenUserMenu(false));
  // user toggler selector
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  // logtout hander
  const handlelogout = () =>{
    removeLocalStorage("token")
  }
  return (
    <>
      <div className="header_wrapper">
        <div className="container">
          <div className="header_twice_container">
            <div className="header_logo">
              <Link to="/">
                <h2>Get Crypto Faucets</h2>
              </Link>
            </div>
            <div className="header_left_content">
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
                  <Popover
                    openPopover={openNetwork}
                    className="network_list_popover"
                  >
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
                <div className="connect_wlt_btn">
                  <Button
                    type="button"
                    onClick={() => {
                      setOpenModal(!openModal);
                      modalRef.current.showModal();
                    }}
                    className="connect_btn"
                  >
                    <IoWallet /> <span>connect wallet</span>
                  </Button>
                </div>
              </div>
              <div className="user_toggler" ref={userMenuRef}>
                <div
                  className="icon"
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                >
                  <FaRegUserCircle />
                </div>
                <Popover openPopover={openUserMenu} className="user_menu_list">
                  <ul>
                    {getLocalStorage("token") ? (
                      <>
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li onClick={handlelogout}>
                        <Link to="#">Logout</Link>
                      </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/login">Log In</Link>
                        </li>
                        <li>
                          <Link to="/register">Sign Up</Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link to="/faq">FAQ</Link>
                    </li>
                  </ul>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal openModal={openModal} modalRef={modalRef}>
        <div className="title">
          <h2>Connect your wallet</h2>
          <span onClick={() => setOpenModal(false)}>&times;</span>
        </div>
        <div className="wallet_img">
          <div className="img_box">
            <img src={metamask} alt="meta" />
            <h3>MetaMask</h3>
          </div>
          <div className="img_box">
            <img src={WalletConnect} alt="meta" />
            <h3>WalletConnect</h3>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
