import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import deleteIcon from './../assets/images/remove.png';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSave } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getFileData, saveFileData } from '../services/Mapping_Field_API';
import { toast } from "react-toastify";

const FieldRow = ({ index, field, handlePositionChange, handleFieldNameChange, handleDeleteField }) => {
  return (
    <div className="row m-3 field-Container">
      <div className="col-8">
        <input
          type="text"
          className="form-control"
          value={field.fieldName}
          onChange={(event) => handleFieldNameChange(event, index)}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control"
          value={field.position}
          onChange={(event) => handlePositionChange(event, index)}
        />
      </div>
      <div className="col-1">
        <button
          className="btnDel"
          onClick={() => handleDeleteField(index)}
        >
          <img src={deleteIcon} alt='delete' />
        </button>
      </div>
    </div>
  );
};

const AdditionalFieldRow = ({ index, additionalfield,handleOperationChange, handleAdditionalFieldChange, handleDeleteAdditionalField }) => {
  return (
    <div className="row m-3 field-Container">
      <div className="col-3">
        <input
          type="text"
          className="form-control"
          value={additionalfield.xml_tag}
          onChange={(event) => handleAdditionalFieldChange(event, index, "xml_tag")}
        />
      </div>
      <div className="col-3">
        <select
            className="form-control"
            value={additionalfield.operation}
            onChange={(event) => handleOperationChange(event, index)}
          >
            <option value="">Select an operation</option>
            <option value="constant">Constant</option>
            <option value="count">Count</option>
            <option value="sum">Sum</option>
            <option value="first_value">First Value</option>
          </select>
        </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control"
          value={additionalfield.input_index}
          onChange={(event) => handleAdditionalFieldChange(event, index, "input_index")}
        />
      </div>
      <div className="col-2">
        <input
          type="text"
          className="form-control"
          value={additionalfield.value}
          onChange={(event) => handleAdditionalFieldChange(event, index, "value")}
        />
      </div>
      <div className="col-1">
        <button
          className="btnDel"
          onClick={() => handleDeleteAdditionalField(index)}
        >
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

const AddField = () => {
  const [fields, setFields] = useState([]);
  const [error, setError] = useState("");
  const [additionalFielderror, setAdditionalFielderror] = useState("");
  const [additionalfields, setAdditionalfields] = useState([]);
  const [headerPresent, setHeaderPresent]= useState("");
  const [rowelement, setRowelement]= useState("");
  const [rootelement, setRootelement]= useState("");
  const [CifId, setCifId]= useState("");
  const [filetyple, setFileType]= useState("");
  const [headerrownumber, setHeaderRowNumber] = useState('')
  const navigate = useNavigate();  
  
  const handlePositionChange = (event, index) => {
    const updatedFields = [...fields];
    updatedFields[index].position = event.target.value;
    setFields(updatedFields);
  };

  const handleAdditionalFieldChange = (event, index, fieldKey) => {
    const updatedAdditionalFields = [...additionalfields];
    updatedAdditionalFields[index][fieldKey] = event.target.value;
    setAdditionalfields(updatedAdditionalFields);
  };

  const handleOperationChange = (event, index) => {
    const updatedAdditionalFields = [...additionalfields];
    updatedAdditionalFields[index].operation = event.target.value;
    setAdditionalfields(updatedAdditionalFields);
  };

  const handleDeleteAdditionalField = (index) => {
    const updatedAdditionalFields = [...additionalfields];
    updatedAdditionalFields.splice(index, 1);
    setAdditionalfields(updatedAdditionalFields);
  };

   const initialValues = {
    fileType: filetyple,
    headerPresent: headerPresent,
    headerRowNumber: headerrownumber,
    rootElement: rootelement,
    rowElement: rowelement,
    cifId: CifId,
    fields: [],
    additionalfields: [],
  };

  const validationSchema = Yup.object().shape({
    fileType: Yup.string().required("File type is required."),
    headerPresent: Yup.string().required("Header present is required."),
    headerRowNumber: Yup.number().required("Header row number is required."),
    rootElement: Yup.string().required("Root element is required."),
    rowElement: Yup.string().required("Row element is required."),
    cifId: Yup.string().required("CIF ID is required."),
    fields: Yup.array().of(
      Yup.object().shape({
        fieldName: Yup.string().required("Field name is required."),
        position: Yup.string().required("Position is required."),
      })
    ),
    additionalfields: Yup.array().of(
      Yup.object().shape({
        xml_tag: Yup.string().required("XML Tag is required."),
        operation: Yup.string().required("Operation is required.")
      })
    ),
  });

  const handleFieldNameChange = (event, index) => {
    const updatedFields = [...fields];
    updatedFields[index].fieldName = event.target.value;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    const existingFieldsWithEmptyValues = fields.some(
      (field) => field.position === "" || field.fieldName.trim() === ""
    );

    if (fields.length !== 0 && existingFieldsWithEmptyValues) {
      setError("Position and Field Name are required for all fields.");
      return;
    }

    const newField = {
      position: "",
      fieldName: "",
    };
    setFields([...fields, newField]);
    setError("");
  };

  const handleDeleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleAdditionalField = () => {
    const existingFieldsWithEmptyValues = additionalfields.some(
      (field) =>
        field.xml_tag.trim() === "" || field.operation.trim() === "" 
    );

    if (additionalfields.length !== 0 && existingFieldsWithEmptyValues) {
      setAdditionalFielderror("XML Tag & Operation are required for all additional fields.");
      return;
    }

    const newAdditionalField = {
      xml_tag: "",
      operation: "",
      input_index: "",
      value: "",
    };
    setAdditionalfields([...additionalfields, newAdditionalField]);
    setAdditionalFielderror("");
  };

  const handleSaveData = (values) => {
    if (fields.length === 0) {
      setError("Please add at least one field.");
      return;
    }

    const fileFields = fields.map((field) => ({
      position: field.position,
      fieldName: field.fieldName      
    }));
    const additional = additionalfields.map((addfield) => ({
      xml_tag: addfield.xml_tag,
      operation: addfield.operation,
      input_index: addfield.input_index,
      value: addfield.value,
    }));

    // Perform the logic to create the 'fileFields' array based on the 'fields' state

    const requestBody = {
      'fileType': values.fileType,
      'header_present': values.headerPresent,
      'header_row_number': values.headerRowNumber,
      'root_element': values.rootElement,
      'row_element': values.rowElement,
      'cifId': values.cifId,
      columns: fileFields,
      additional_elements: additional
    };
    saveFileData(requestBody, (res) => {
      if (res.data.status === 'Success') {
        localStorage.setItem('cifId', values.cifId);
        toast.success('File Data Saved Successfully', {
          position: "top-center",
          autoClose: 5000,
        });
        navigate('/fieldMapping');
      }else{
        toast.error('File Data not Saved', {
          position: "top-center",
          autoClose: 5000,
        });
      }
    });
  };
  const handleFileTypeChange = (event, values) => {
    setFileType(event.target.value);
    setCifId(values.cifId);
    const QueryStringData = {
      "cifId": values.cifId,
      "fileType": event.target.value,      
       };
    getFileData(QueryStringData, (res) => {
      if (res.data.responseObject !== null ) {
        const { header_present, row_element, root_element, columns, additional_elements, cifId, fileType, header_row_number } = res.data.responseObject;
      
      // Update the state with the API response values
      setFields(columns);
      setAdditionalfields(additional_elements);
      setHeaderPresent(header_present);
      setRowelement(row_element);
      setRootelement(root_element);
      setCifId(cifId);
      setFileType(fileType);
      setHeaderRowNumber(header_row_number);

        console.log(res.data);
        // this.setState({ formFields : res.data.responseObject.columns });
        // this.setState({ respdata : res.data.responseObject });
      }
    })
  };
  return (
    <Container className="fileConfig mt-5 mb-5">
      <Row>
        <Col xs={12}>
          <div className="sectionTitle">File Configuration</div>
        </Col>
      </Row>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSaveData}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Row className="mt-3">
            <Col>
                <Form.Group>
                  <Form.Label className="required">CIF ID</Form.Label>
                  <Field type="text" name="cifId" className="form-control" />
                  <ErrorMessage name="cifId" component="div" className="text-danger" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="required">Select File Type</Form.Label>
                  <Field as="select" name="fileType" className="form-control selectField" 
                  onChange={(event) => handleFileTypeChange(event, values)} >
                    <option value="">Select an option</option>
                    <option value="GST">GST File</option>
                    <option value="TAX">TAX File</option>
                  </Field>
                  <ErrorMessage name="fileType" component="div" className="text-danger" />
                </Form.Group>
              </Col>              
              </Row>
            <Row className="mt-4">
              <Col>
                <Form.Group>
                  <Form.Label className="required">Header Present</Form.Label>
                  <Field as="select" name="headerPresent" className='form-control selectField'>
                    <option value="">Select an option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Field>
                  <ErrorMessage name="headerPresent" component="div" className="text-danger" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="required">Header Row No.</Form.Label>
                  <Field type="text" name="headerRowNumber" className="form-control" />
                  <ErrorMessage name="headerRowNumber" component="div" className="text-danger" />
                </Form.Group>
              </Col>            
              <Col>
                <Form.Group>
                  <Form.Label className="required">Root Element</Form.Label>
                  <Field type="text" name="rootElement" className="form-control" />
                  <ErrorMessage name="rootElement" component="div" className="text-danger" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className="required">Row Element</Form.Label>
                  <Field type="text" name="rowElement" className="form-control" />
                  <ErrorMessage name="rowElement" component="div" className="text-danger" />
                </Form.Group>
              </Col>              
            </Row>
            <Row className='mt-5 mb-3'>
              <Col xs={8}>
                <div className="sectionTitle">File Fields</div>
              </Col>
              <Col>
                <div className="addFieldBtnDiv">
                <button className="btn addFild" type="button" onClick={handleAddField}>
                  <FontAwesomeIcon icon={faPlusCircle} className="plusIcon" /> 
                  Add New Field         
                </button>
                </div>
              </Col>
            </Row>
                      
            {fields.length > 0 && (
               <div className="addFieldContainer">
               <div>
                 <div className="row m-3 field-Container">
                   <div className="col-8">
                     <label className="form-label">Field Name</label>
                   </div>
                   <div className="col-3">
                     <label className="form-label">Position</label>
                   </div>
                 </div>
                 {/* Render the field rows */}
                 {fields.map((field, index) => (
                   <FieldRow
                     key={index}
                     index={index}
                     field={field}
                     handlePositionChange={handlePositionChange}
                     handleFieldNameChange={handleFieldNameChange}
                     handleDeleteField={handleDeleteField}
                   />
                 ))}
               </div>
             </div>
            )}

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {fields.length > 0 &&
            <Row className='mt-5 mb-3'>
              <Col>
                <div className="text-right">
                <button className="btn addFild" type="button" onClick={handleAdditionalField}>
                <FontAwesomeIcon icon={faPlusCircle} className="plusIcon" /> Add Additional Field        
                </button>
                </div>
              </Col>
            </Row> }
                      
            {additionalfields.length > 0 && (
               <div className="addFieldContainer">
               <div>
                 <div className="row m-3 field-Container">
                   <div className="col-3">
                     <label className="form-label">Xml Tag</label>
                   </div>
                   <div className="col-3">
                     <label className="form-label">Operation</label>
                   </div>
                   <div className="col-3">
                     <label className="form-label">Input Index</label>
                   </div>
                   <div className="col-2">
                     <label className="form-label">Value</label>
                   </div>
                 </div>
                 {/* Render the field rows */}
                 {additionalfields.map((additionalfield, index) => (
                   <AdditionalFieldRow
                   key={index}
                   index={index}
                   additionalfield={additionalfield}
                   handleOperationChange={handleOperationChange}
                   handleAdditionalFieldChange={handleAdditionalFieldChange}
                   handleDeleteAdditionalField={handleDeleteAdditionalField}
                 />
                 ))}
               </div>
             </div>
            )}

            {additionalFielderror && <div className="alert alert-danger mt-3">{additionalFielderror}</div>}

            { fields.length > 0 && <div className="mt-3 text-right">
              <button className="btn addFild" type="submit">
              <FontAwesomeIcon icon={faSave} className="plusIcon" />
                Save
              </button>            
            </div>
            }
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default AddField;
