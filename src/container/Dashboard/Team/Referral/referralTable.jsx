import React from "react";
import DataTable from "../../../../components/UI/DataTable";
import TextCell from "../../../../components/UI/DataTable/TextCell";
import { useGetMyRefQuery } from "../../../../service/teamApi";

const ReferralTable = () => {
  const { data } = useGetMyRefQuery();
  const theadItems = [
    <TextCell key="sr" text="#" as="th" className="table_th" />,
    <TextCell key="username" text="Username" as="th" className="table_th" />,
    <TextCell key="name" text="Name" as="th" className="table_th" />,
    <TextCell key="sponsorid" text="Sponsor ID" as="th" className="table_th" />,
    <TextCell key="email" text="Email" as="th" className="table_th" />,
  ];
  const tbodyItems = data?.data.map((dt, i) => [
    [
      <TextCell key={i + 1} text={i + 1} as="td" className="table_td" />,
      <TextCell
        key={dt.username}
        text={dt.username}
        as="td"
        className="table_td"
      />,
      <TextCell key={dt.name} text={dt.name} as="td" className="table_td" />,
      <TextCell
        key={dt.sponsorid}
        text={dt.sponsorid}
        as="td"
        className="table_td"
      />,
      <TextCell key={dt.email} text={dt.email} as="td" className="table_td" />,
    ],
  ]);
  return (
    <div className="referral_wrappper">
      <DataTable
        theadItems={theadItems}
        tbodyItems={tbodyItems}
        noItemMsg="There is no data"
        colSpan="6"
      />
    </div>
  );
};

export default ReferralTable;
