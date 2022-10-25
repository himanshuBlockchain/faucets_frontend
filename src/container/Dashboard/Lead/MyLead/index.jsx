import React from "react";
import SectionCommonTable from "../../../../components/UI/SectionCommonTable";
import LeadTable from "./leadTable";

const MyLead = () => {
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="My Lead"
        table={<LeadTable />}
      />
    </>
  );
};

export default MyLead;
