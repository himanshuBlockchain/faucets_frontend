import React from 'react'
import SectionCommonTable from '../../../../components/UI/SectionCommonTable'
import ProviderTable from './providerTable'

const FaucetProvider = () => {
  return (
    <>
      <SectionCommonTable
        wrapperClassName="faucet_section_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="Faucet Provider"
        table={<ProviderTable />}
      />
    </>
  )
}

export default FaucetProvider