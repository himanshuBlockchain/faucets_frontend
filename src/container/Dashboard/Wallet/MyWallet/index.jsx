import React from 'react'
import SectionCommonTable from '../../../../components/UI/SectionCommonTable'
import WalletTable from './myWallet'

const MyWallet = () => {
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="My Wallet"
        table={<WalletTable />}
      />
    </>
  )
}

export default MyWallet