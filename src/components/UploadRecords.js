import React from 'react'
import NavBarWrapper from '../helpers/NavBarWrapper'
import { withAuthorisedPageHOC } from '../wrappers/withTokenHOC'

const UploadRecords = () => (
  <main>
    <h1>Upload Records</h1>
  </main>
)


export default withAuthorisedPageHOC(NavBarWrapper(UploadRecords))
