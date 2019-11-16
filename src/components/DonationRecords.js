import React from 'react'
import NavBarWrapper from '../helpers/NavBarWrapper'
import { withAuthorisedPageHOC } from '../wrappers/withTokenHOC'

const DonationRecords = () => (
  <main>
    <h1>Donation Records</h1>
  </main>
)

export default withAuthorisedPageHOC(NavBarWrapper(DonationRecords))
