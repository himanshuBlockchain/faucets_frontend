import React from "react";
import SectionCommonTable from "../../../../components/UI/SectionCommonTable";
import AllLeadTable from "./allLeadTable";

const AllLead = () => {
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="All Lead"
        table={<AllLeadTable />}
      />
    </>
  );
};

export default AllLead;
