import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import "./DonorRecords.css";

const EditDonorForm = ({
  donor,
  editing,
  handleInputChange,
  handleCheckboxChange,
  validated,
  handleSubmit
}) => {
  return (
    <Form
      id="donor-form"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row className="donor-summary__container">
        <Col md={6} className="donor-summary__column">
          <p className="donor-summary__title">Identity Details</p>
          <Row>
            <Form.Group as={Col} controlId="donorType" column sm="6">
              <Form.Label>Type</Form.Label>
              {editing ? (
                <Form.Control
                  as="select"
                  name="donorType"
                  value={donor.donorType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Individual</option>
                  <option value="2">Company</option>
                </Form.Control>
              ) : (
                <Form.Control
                  as="select"
                  name="donorType"
                  plaintext={!editing}
                  readOnly={!editing}
                  disabled
                  value={donor.donorType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Individual</option>
                  <option value="2">Company</option>
                </Form.Control>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="donorFrequency" column sm="6">
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                as="select"
                name="donorFrequency"
                plaintext={!editing}
                readOnly={!editing}
                disabled
                value={donor.frequency}
                onChange={handleInputChange}
                required
              >
                <option value="1">Recurring</option>
                <option value="2">One-Time</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="donorSalutation" column sm="6">
              <Form.Label>Salutation</Form.Label>
              {editing ? (
                <Form.Control
                  as="select"
                  name="salutation"
                  value={donor.salutation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Mr</option>
                  <option value="2">Mrs</option>
                  <option value="3">Ms</option>
                  <option value="4">Miss</option>
                  <option value="5">Dr</option>
                </Form.Control>
              ) : (
                <Form.Control
                  plaintext={!editing}
                  readOnly={!editing}
                  disabled
                  as="select"
                  name="salutation"
                  value={donor.salutation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Mr</option>
                  <option value="2">Mrs</option>
                  <option value="3">Ms</option>
                  <option value="4">Miss</option>
                  <option value="5">Dr</option>
                </Form.Control>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="donorName" column sm="6">
              <Form.Label>Name</Form.Label>
              <Form.Control
                plaintext={!editing}
                readOnly={!editing}
                name="name"
                value={donor.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="donoridentifier" column sm="6">
              <Form.Label>identifier</Form.Label>
              <InputGroup>
                <Form.Control
                  plaintext={!editing}
                  readOnly={!editing}
                  name="identifier"
                  value={donor.identifier}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
        </Col>
        <Col md={6} className="donor-summary__column">
          <p className="donor-summary__title">Contact Information</p>
          <Row>
            <Form.Group as={Col} controlId="donorEmail" column sm="6">
              <Form.Label>Email</Form.Label>
              <Form.Control
                plaintext={!editing}
                readOnly={!editing}
                name="email"
                type="email"
                value={donor.email}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="donorcontactNo" column sm="6">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                plaintext={!editing}
                readOnly={!editing}
                name="contactNo"
                value={donor.contactNo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="donorAddress" column sm="6">
              <Form.Label>Address</Form.Label>
              <Form.Control
                plaintext={!editing}
                readOnly={!editing}
                name="address"
                value={donor.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="contactMode" column sm="6">
              <Form.Label>Preferred mode of contact</Form.Label>
              {editing ? (
                <Form.Control
                  as="select"
                  name="contactMode"
                  value={donor.contactMode}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Email</option>
                  <option value="2">Phone</option>
                </Form.Control>
              ) : (
                <Form.Control
                  as="select"
                  name="contactMode"
                  value={donor.contactMode}
                  onChange={handleInputChange}
                  required
                  plaintext={!editing}
                  readOnly={!editing}
                  disabled
                >
                  <option value="1">Email</option>
                  <option value="2">Phone</option>
                </Form.Control>
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="doNotContact" column sm="12">
              <Form.Check
                custom
                label="Do not contact"
                disabled={!editing}
                value={donor.doNotContact}
                name="doNotContact"
                type="checkbox"
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="comments" column sm="12">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                plaintext={!editing}
                readOnly={!editing}
                disabled={!editing}
                value={donor.comments}
                name="comments"
                type="textarea"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default EditDonorForm;
