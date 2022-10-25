import React from "react";
import DataTable from "../../components/UI/DataTable";
import TextCell from "../../components/UI/DataTable/TextCell";
import { TestLinkData } from "../../data";

const HomeTestLinkHistory = () => {
  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell key="time" text="Time" as="th" className="table_th" />,
    <TextCell key="amount" text="Amount" as="th" className="table_th" />,
    <TextCell key="hash" text="Hash" as="th" className="table_th" />,
  ];
  const tbodyItems = TestLinkData.map((d, i) => [
    [
      <TextCell key={d.id} text={i + 1} as="td" className="table_td" />,
      <TextCell key={d.time} text={d.time} as="td" className="table_td" />,
      <TextCell key={d.amount} text={d.amount} as="td" className="table_td" />,
      <TextCell key={d.hash} text={d.hash} as="td" className="table_td" />,
    ],
  ]);
  return (
    <div className="history">
      <DataTable
        theadItems={theadItems}
        tbodyItems={tbodyItems}
        noItemMsg="There is no order"
        colSpan="6"
      />
    </div>
  );
};

export default HomeTestLinkHistory;
