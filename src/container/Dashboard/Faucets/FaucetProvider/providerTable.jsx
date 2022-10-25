import React from "react";
import DataTable from "../../../../components/UI/DataTable";
import TextCell from "../../../../components/UI/DataTable/TextCell";
import { useGetFaucetQuery } from "../../../../service/faucetApi";

const ProviderTable = () => {
  const { data } = useGetFaucetQuery();
  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell key="chain_name" text="Chain Name" as="th" className="table_th" />,
    <TextCell key="Webiste_url" text="Website URL" as="th" className="table_th" />,
  ];
  const tbodyItems = data?.data?.map((d, i) => [
    [
      <TextCell key={i + 1} text={i + 1} as="td" className="table_td" />,
      <TextCell key={d.chain_name} text={d.chain_name} as="td" className="table_td" />,
      <TextCell key={d.website_url} text={d.website_url} as="td" className="table_td" />,
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

export default ProviderTable;
