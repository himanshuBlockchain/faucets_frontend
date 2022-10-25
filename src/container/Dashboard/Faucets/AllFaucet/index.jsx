import React from "react";
import SectionCommonTable from "../../../../components/UI/SectionCommonTable";
import AllProviderTable from "./AllproviderTable";

const AllFaucetProvider = () => {
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="All Faucet Provider"
        table={<AllProviderTable />}
      />
    </>
  );
};

export default AllFaucetProvider;
