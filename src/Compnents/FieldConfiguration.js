import React, { Component } from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';

class FieldConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      required: props.required || false,
      regex: props.regex || "",
      dataType: props.dataType || "string",
      isOperation: props.isOperation || false,
      operation: props.operation || "",
      operandFields: props.operandFields || "",
      value: props.value || ""
    };
  }

  handleInputChange = event => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    this.setState({ [name]: inputValue });
  };

  render() {
    const {
      required,
      regex,
      dataType,
      isOperation,
      operation,
      operandFields,
      value
    } = this.state;

    return (
      <Container className="mt-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Required"
                name="required"
                checked={required}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Regex:</Form.Label>
              <Form.Control
                type="text"
                name="regex"
                value={regex}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data Type:</Form.Label>
              <Form.Select
                name="dataType"
                value={dataType}
                onChange={this.handleInputChange}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is Operation"
                name="isOperation"
                checked={isOperation}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Operation:</Form.Label>
              <Form.Control
                type="text"
                name="operation"
                value={operation}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Operand Fields:</Form.Label>
              <Form.Control
                type="text"
                name="operandFields"
                value={operandFields}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Value:</Form.Label>
              <Form.Control
                type="text"
                name="value"
                value={value}
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FieldConfiguration;
