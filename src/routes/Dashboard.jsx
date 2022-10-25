import React, { useState } from "react";
import Header from "../components/Shared/Header/Dashboard";
import Sidebar from "../components/Shared/Sidebar/dashboard";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Sidebar from "../components/Shared/Sidebar/dashboard";
import AppContent from "./appContent";


const Dashboard = () => {
  // add custom attribute on body tag
  const [show, setShow] = useState(true);

  return (
    <>
      {/* <BrowserRouter> */}
        <div className="dashboard_home_wrapper" show-menu={show ? "false" : "true"}>
          {/* sidebar */}
          <div className="sidebar_wrapper">
            <Sidebar />
          </div>
          {!show && (
            <div
              className="menu_backdrop"
              style={{
                position: "fixed",
                backgroundColor: "#0000001c",
                width: "100%",
                height: "100%",
                zIndex: "99",
              }}
              onClick={() => setShow(true)}
            ></div>
          )}
          {/* body container */}
          <div className="body_content_wrapper">
            {/* header */}
            <Header
              setShow={setShow}
              show={show}
            />
            <div className="content_wrapper">
              {/* Routers for every page render on the UI */}
              <AppContent/>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      {/* </BrowserRouter> */}
    </>
  );
};

export default Dashboard;