import React from "react";
import DataTable from "../../../../components/UI/DataTable";
import TextCell from "../../../../components/UI/DataTable/TextCell";

const HistoryTable = () => {
  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell key="time" text="Time" as="th" className="table_th" />,
    <TextCell key="recipientAddress" text="Recipient Address" as="th" className="table_th" />,
    <TextCell key="hash" text="Hash" as="th" className="table_th" />,
    <TextCell key="debitamount" text="Debit Amount" as="th" className="table_th" />,
    <TextCell key="creditamount" text="Credit Amount" as="th" className="table_th" />,
  ];
  const tbodyItems = [1,2,3].map((d) => [
    [
      <TextCell key={d + 1} text={d} as="td" className="table_td" />,
      <TextCell
        key={"u7se8isi"}
        text={"10:03 25-08-2022"}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={"5sf8s4f7sr"}
        text={"0xfDa9b18023d5796Dba88aF64bDC43a10DC875B5d"}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={"s7resrse"}
        text={"HI0xfDa9b18023d5796Dba88aF64bDC43a10DC875B5d"}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={"s44s7er"}
        text={"5 ETH"}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={"sfs4f5se8r"}
        text={"10 ETH"}
        as="td"
        className="table_td"
      />,
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

export default HistoryTable;
