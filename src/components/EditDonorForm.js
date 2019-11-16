import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './DonorRecords.css'

const EditDonorForm = props => {
    const [ data, setData ] = useState(props.currentDonor)
    useEffect(
      () => {
        setData(props.currentDonor)
      }, [props.currentDonor]
    )
    const handleInputChange = event => {
      const { name, value } = event.target
      setData({ ...data, [name]: value})
      console.log(data)
      props.getUpdatedDonor(data)
    }

    return (
      <Form>
        <Row className="donor-summary__container">
          <Col md={6} className="donor-summary__column">
            <p className="donor-summary__title">Identity Details</p>
            <Row>
              <Form.Group as={Col} controlId="donorNRIC" column sm="6">
                <Form.Label >NRIC</Form.Label>
                { props.editMode ?
                <Form.Control name="nric" defaultValue={data.nric} onChange={handleInputChange}/>
                :
                <Form.Control plaintext readOnly name="nric" defaultValue={data.nric} onChange={handleInputChange}/>
                }

              </Form.Group>
              <Form.Group as={Col} controlId="donorType" column sm="6">
                <Form.Label >Type</Form.Label>
                <Form.Control name="type" disabled defaultValue={data.type} onChange={handleInputChange}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="donorSalutation" column sm="6">
                <Form.Label >Salutation</Form.Label>
                <Form.Control name="salutation" defaultValue={data.salutation} onChange={handleInputChange}/>
              </Form.Group>
              <Form.Group as={Col} controlId="donorName" column sm="6">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" defaultValue={data.name} onChange={handleInputChange}/>
              </Form.Group>
            </Row>
          </Col>
          <Col md={6} className="donor-summary__column">
          <p className="donor-summary__title">Contact Information</p>
            <Row>
              <Form.Group as={Col} controlId="donorEmail" column sm="6">
                <Form.Label >Email</Form.Label>
                <Form.Control name="email" defaultValue={data.email} onChange={handleInputChange}/>
              </Form.Group>
              <Form.Group as={Col} controlId="donorPhone" column sm="6">
                <Form.Label >Phone</Form.Label>
                <Form.Control name="phone" defaultValue={data.phone} onChange={handleInputChange}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="donorAddress" column sm="12">
                <Form.Label >Address</Form.Label>
                <Form.Control name="address" defaultValue={data.address} onChange={handleInputChange}/>
              </Form.Group>
            </Row>
            </Col>
        </Row>
      </Form>


    )
  }

  export default EditDonorForm