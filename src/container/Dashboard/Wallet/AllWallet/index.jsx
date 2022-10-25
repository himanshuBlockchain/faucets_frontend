import React from "react";
import SectionCommonTable from "../../../../components/UI/SectionCommonTable";
import AllWalletTable from "./allWalletTable";

const AllWallet = () => {
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="All Wallet"
        table={<AllWalletTable />}
      />
    </>
  );
};

export default AllWallet;
