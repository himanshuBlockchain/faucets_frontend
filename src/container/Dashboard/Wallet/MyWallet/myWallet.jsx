import React from "react";
import DataTable from "../../../../components/UI/DataTable";
import TextCell from "../../../../components/UI/DataTable/TextCell";
import { useGetWalletByUserQuery } from "../../../../service/walletApi";
const WalletTable = () => {
  const { data } = useGetWalletByUserQuery();
  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell
      key="walletName"
      text="Wallet Name"
      as="th"
      className="table_th"
    />,
    <TextCell
      key="address"
      text="Wallet Address"
      as="th"
      className="table_th"
    />,
  ];
  const tbodyItems = data?.data?.map((d, i) => [
    [
      <TextCell key={i + 1} text={i + 1} as="td" className="table_td" />,
      <TextCell
        key={d.wallet_name}
        text={d.wallet_name}
        as="td"
        className="table_td"
      />,
      <TextCell
        key={d.address}
        text={d.address}
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

export default WalletTable;
