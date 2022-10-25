import React from "react";
import SectionCommonTable from "../../../../components/UI/SectionCommonTable";
import ReferralTable from "./referralTable";

const Referral = () => {
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="My Referral"
        table={<ReferralTable />}
      />
    </>
  );
};

export default Referral;
