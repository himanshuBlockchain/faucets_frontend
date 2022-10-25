import React, { useEffect, useState } from 'react'
import DataTable from '../../components/UI/DataTable'
import TextCell from '../../components/UI/DataTable/TextCell'
// import { ETHData } from '../../data'
import { nativeTokenHistory } from './helper'


const HomeETHHistory = ({ network }) => {
  const [txnDetails, settxnDetails] = useState([])

  const newFunction = (value)=>{
    return "HI"+value 

  }

  useEffect(() => {
    async function showTransactionDetails() {
      let transactionDetails = await nativeTokenHistory(network)
      console.log(transactionDetails)
      settxnDetails(transactionDetails)
    }
    showTransactionDetails()
  }, [network])

  const theadItems = [
    <TextCell key="serial" text="Sr" as="th" className="table_th" />,
    <TextCell key="time" text="Time" as="th" className="table_th" />,
    <TextCell key="to" text="Recipient Address" as="th" className="table_th" />,
    <TextCell key="amount" text="Amount" as="th" className="table_th" />,
    <TextCell key="hash" text="Hash" as="th" className="table_th" />,
  ]
  const tbodyItems = txnDetails.map((d, i) => [
    [
      <TextCell key={d.id} text={i + 1} as="td" className="table_td" />,
      <TextCell key={d.id} text={d.timestamp} as="td" className="table_td" />,
      <TextCell
        key={d.to_recipient}
        text={d.to_recipient}
        as="td"
        className="table_td"
      />,
      // <TextCell
      //   key={d.to_recipient}
      //   // text={`$<a href="https://www.w3schools.com">Visit W3Schools</a>`}
      //   text={newFunction(d.to_recipient)}
      //   as="td"
      //   className="table_td"
      // />,
      <TextCell key={d.id} text={d.value} as="td" className="table_td" />,
      <TextCell key={d.id} text={d.txnhash} as="td" className="table_td" />,
    ],
  ])
  return (
    <div className="history">
      {/* <div className="eth_history" style={{display: 'flex', alignItems: 'center', margin: '8px 0', fontSize: '13px'}}>
        <span>1.</span>
        <div className="number">
          <p>serlsreuiorjkslufes8er87swer5</p>
        </div>
      </div> */}
      <DataTable
        theadItems={theadItems}
        tbodyItems={tbodyItems}
        noItemMsg="There is no order"
        colSpan="6"
      />
    </div>
  )
}

export default HomeETHHistory
