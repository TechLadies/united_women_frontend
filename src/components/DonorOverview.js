import React, { useState } from 'react'
import './DonorRecords.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EditDonorForm from './EditDonorForm'
import NavBarWrapper from '../helpers/NavBarWrapper'


const DonorRecords = () => {
  const currentDonor = {
    name: 'Amy Lim',
    email: 'amylim@gmail.com',
    nric: 'S1239879D',
    type: 'Recurring',
    salutation: 'Miss',
    phone: '91234567',
    address: '123 Tampines West #11-01 Singapore 234567'
  }
  const [ donor, setDonor ] = useState(currentDonor)
  const [ updatedDonor, setUpdatedDonor ] = useState(donor)
  const [ editing, setEditing ] = useState(false)

  const getUpdatedDonor = donorData => {
    setUpdatedDonor(donorData)
  }

  const updateDonor = () => {
    setEditing(false)
    setDonor(updatedDonor)
  }
  const SaveButton = () => (
    <button onClick={updateDonor} className="btn btn-primary">Save edits</button>
  )

  const CancelButton = () => (
    <button onClick={()=>setEditing(false)} className="btn btn-outline-primary">Cancel</button>
  )

  const EditButton = () => (
    <button onClick={()=>setEditing(true)} className="btn btn-outline-primary">Edit donor</button>
  )

  /*render*/
  return(
      <main>
      <h1>Donor Records</h1>
      <div className="breadcrumbs">
        <p>Donor List  >  <strong>{donor.name}</strong></p>
        { editing ? <div className="btn-toolbar mr-2"><SaveButton/><CancelButton/></div> : <EditButton/> }
      </div>

      { editing ? (
        <div>
        <EditDonorForm editMode={editing} currentDonor={donor} getUpdatedDonor={getUpdatedDonor}/>
        </div>
      ) : (
        <div>
        <DonorDetails currentDonor={donor}/>
        </div>
      )}
    </main>
  )
}



const DonorDetails = props => {
  return (
    <Form>
      <Row className="donor-summary__container">
        <Col md={6} className="donor-summary__column">
          <p className="donor-summary__title">Identity Details</p>
          <Row>
            <Form.Group as={Col} controlId="donorNRIC" column sm="6">
              <Form.Label>NRIC</Form.Label>
              <Form.Control plaintext readOnly defaultValue={props.currentDonor.nric} />
            </Form.Group>
            <Form.Group as={Col} controlId="donorType" column sm="6">
              <Form.Label>Type</Form.Label>
              <Form.Control plaintext readOnly defaultValue={props.currentDonor.type} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="donorSalutation" column sm="6">
              <Form.Label>Salutation</Form.Label>
              <Form.Control plaintext readOnly defaultValue={props.currentDonor.salutation} />
            </Form.Group>
            <Form.Group as={Col} controlId="donorName" column sm="6">
              <Form.Label>Name</Form.Label>
              <Form.Control plaintext readOnly defaultValue={props.currentDonor.name} />
            </Form.Group>
          </Row>
        </Col>
        <Col md={6} className="donor-summary__column">
        <p className="donor-summary__title">Contact Information</p>
          <Row>
            <Form.Group as={Col} controlId="donorEmail" column sm="6">
              <Form.Label>Email</Form.Label>
              <Form.Control plaintext readOnly defaultValue={props.currentDonor.email} />
            </Form.Group>
            <Form.Group as={Col} controlId="donorPhone" column sm="6">
              <Form.Label>Phone</Form.Label>
              <Form.Control plaintext readOnly defaultValue={props.currentDonor.phone} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="donorAddress" column sm="12">
              <Form.Label>Address</Form.Label>
              <Form.Control plaintext readOnly defaultValue={props.currentDonor.address} />
            </Form.Group>
          </Row>
          </Col>
      </Row>
    </Form>
  )
}




export default NavBarWrapper(DonorRecords)
