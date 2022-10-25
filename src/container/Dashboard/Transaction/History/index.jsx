import React, { useRef, useState } from "react";
import { networkList } from "../../../../components/Shared/Header/Header";
import SectionCommonTable from "../../../../components/UI/SectionCommonTable";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import HistoryTable from "./historyTable";

const History = () => {
  // const options = ["Ethereum Rinkeby", "Ropsten"];
  // const handleChange = (e) => {
  //   console.log(e.target.value);
  // };
  const [network, setNetwork] = useState(networkList[0]);
  const [openNetwork, setOpenNetwork] = useState(false);
  const networkRef = useRef(null);
  useClickOutside(networkRef, () => setOpenNetwork(false));
  const elementOfChildcomponent = {
    network,
    setNetwork,
    openNetwork,
    setOpenNetwork,
  };
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="Transaction History"
        table={<HistoryTable />}
        childComponent={true}
        elementOfChildcomponent={elementOfChildcomponent}
      />
    </>
  );
};

export default History;
