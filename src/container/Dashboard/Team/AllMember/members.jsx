import React from "react";
import SectionCommonTable from "../../../../components/UI/SectionCommonTable";

import MemberTable from "./memberTable";

const AllMembers = () => {
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="All Members"
        table={<MemberTable />}
      />
    </>
  );
};

export default AllMembers;
