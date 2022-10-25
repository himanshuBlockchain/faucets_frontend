import React from "react";

const HomeCard = ({ chainName, totalbal, used, availbleBal, icon }) => {
  return (
    <div className="faucet_dash_card_wrapper">
      <div className="faucet_content">
        <div className="faucet_widget_icon">{icon}</div>
        <div className="faucet_widget_info">
          <div style={{ marginRight: "20px" }}>
            <p><strong>Chain name</strong>: {chainName}</p>
            <p><strong>Total Balance</strong>: {totalbal}</p>
          </div>
          <div>
            <p><strong>Used</strong>: {used}</p>
            <p><strong>ETH Available Balance</strong>: {availbleBal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
