import React from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { getMappedData, saveMappingData, getFileData, getDefaultData } from '../services/Mapping_Field_API';
import { toast } from "react-toastify";

const convertJsonToGetItemsFormat = (json) => {
  const outerField = json.columns.map((item) => ({
    position: item.input_index,
    fieldName: item.xml_tag,
    selected_field: item.xml_tag,
  }));

  return outerField;
};

const convertFormFieldJson = (json) => {
  const tempformFields = json.filter((item) => item.inputIndex !== 0);
  const formFields = tempformFields.map((item) => ({
    position: item.input_index,
    fieldName: item.xml_tag
  }));
  return formFields;
};

const getPositionFromFieldName = (fieldName, data) => {
  const foundItem = data.find((item) => item.fieldName === fieldName);
  return foundItem ? foundItem.position : null;
};
const addMissingOutputIndexObjects = (column, maxIndex) => {
  const existingIndices = column.map(item => item.output_index);

  const missingIndices = [];
  for (let i = 1; i <= maxIndex; i++) {
    if (!existingIndices.includes(i)) {
      missingIndices.push(i);
    }
  }

  const newColumns = [...column];
  missingIndices.forEach((missingIndex) => {
    const newObject = {
      input_index: "",
      output_index: missingIndex,
      xml_tag: "",
      required: false,
      regex: "",
      data_type: "",
      is_operation: false,
      operation: "",
      operand_fields: "",
      value: "",
    };
    newColumns.push(newObject);
  });

  return newColumns.sort((a, b) => a.output_index - b.output_index);
};

class FieldMapping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: {},
      fileType: null,
      fileExtension: null,
      formFields: [],
      respdata: [],
      getItems: [],
      outerField: []
    };
  }  
  handleDropdownChange = (event, index, selectedValue) => {
   const selectedFieldName = selectedValue;
   const selectedPosition = getPositionFromFieldName(selectedValue, this.state.formFields);
    this.state.outerField[index].selected_field = selectedValue;
    const selectedItem = this.state.getItems[index];
    const newSelectedValues = {
      ...this.state.selectedValues,
      [index]: {
        input_index: selectedPosition,
        output_index: index + 1,
        xml_tag: selectedFieldName,
        required: selectedItem.required,
        regex: selectedItem.regex,
        data_type: selectedItem.data_type,
        is_operation: selectedItem.is_operation,
        operation: selectedItem.operation,
        operand_fields: selectedItem.operand_fields,
        value: selectedItem.value,
      },
    };
    this.setState({ selectedValues: newSelectedValues }, () => {
      const jsonSelectedValues = JSON.stringify(this.state.selectedValues, null, 2);
      console.log(jsonSelectedValues);
    });    
  };
  
  handleFileTypeChange = (event) => {
    const selectedFileType = event.target.value;
    this.setState({ formFields: [] });
    this.setState({ fileType: selectedFileType, fileExtension: 'null' });
    getDefaultData(event.target.value, (res) => {
      if (res.data.responseObject !== null ) {
        console.log(res.data);
      this.setState({ getItems : res.data.responseObject.columns });
      }
    })
  };
  
  handleFileExtensionChange = (event) => {
    this.setState({ fileExtension: event.target.value });
    this.setState({ formFields: [] });
    const QueryStringData = {
      "cifId": localStorage.getItem('cifId'),
      "fileType": this.state.fileType,
      "fileExtension": event.target.value
       };
      getMappedData(QueryStringData, (res) => {
         if (res.data.responseObject !== null ) {
          const outerField = convertJsonToGetItemsFormat(res.data.responseObject);
          const formFields = convertFormFieldJson(res.data.responseObject.columns);
          this.setState({ outerField })
          this.setState({ respdata : res.data.responseObject });
            this.setState({ formFields });
            this.setState({ selectedValues : res.data.responseObject.columns });
           console.log(res.data);
           toast.success('success data', {
             position: "top-center",
             autoClose: 5000,
           });
         }else{
          getFileData(QueryStringData, (res) => {
            if (res.data.responseObject !== null ) {
              console.log(res.data);
              this.setState({ outerField : this.state.getItems })
              this.setState({ formFields : res.data.responseObject.columns });
              this.setState({ respdata : res.data.responseObject });
            }else{
              toast.error('File data not found', {
                position: "top-center",
                autoClose: 5000,
              });
            }
          })
         }
        })   
  };
  

  // Function to handle the "Save Data" button click
  handleSaveData = () => {
    const fileConfigdata = this.state.respdata;
    const fieldcolmns = Object.values(this.state.selectedValues);
    const columns = addMissingOutputIndexObjects(fieldcolmns, this.state.getItems.length);
    const additional_elements = this.state.respdata.additional_elements
    const requestBody = {
      "fileType": this.state.fileType,
      "header_present": fileConfigdata.header_present,
      "header_row_number": fileConfigdata.header_row_number,
      "root_element": fileConfigdata.root_element,
      "row_element": fileConfigdata.row_element,
      "cifId": localStorage.getItem('cifId'),
      "fileExtension": this.state.fileExtension,
      columns,
      additional_elements
    };
    saveMappingData(requestBody, (res) => {
              if (res) {
                console.log(res.data);
                toast.success('Mapping Saved Successfully', {
                  position: "top-center",
                  autoClose: 5000,
                });
              }
            });
  };
  render() {    
    const { formFields, getItems, fileType, outerField, fileExtension } = this.state;
    return (
      <Container className="fieldMapContainer">        
        <div className="fieldMapDiv">        
        <Row className="mt-5 mainFiledDiv pt-4 pb-4">
        <Row className=''>
          <Col xs={12}>
            <div className="sectionTitle">Field Mapping</div>            
          </Col>
        </Row>
        <Row className="mt-4 mb-5">
          <Col xs={4} className="fileTypeSelect">
            <Form.Group controlId="fileTypeSelect">
              <Form.Label className="required fileTypeLbl">File Type</Form.Label>
              <Form.Select className="fileTypeSel" onChange={this.handleFileTypeChange}>
                <option>Select File Type</option>
                <option value="GST">GST File</option>
                <option value="TAX">TAX File</option>
              </Form.Select>
            </Form.Group>
          </Col>
            <Col xs={4} className="text-left">
            <Form.Group>
              <Form.Label className="required">File Extension</Form.Label>
              <Form.Select className="fileTypeSel" value={fileExtension} onChange={this.handleFileExtensionChange} disabled={fileType === null}>
                <option value='null'>Select File extension</option>
                <option value="csv">CSV</option>
                <option value="xls">XLS</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {fileType && (
            <Row>
              <Col xs={6}>
                <div className="fieldContainer">
                  {getItems.map((item) => (
                    <div className="columnField" key={item.xml_tag} style={{ marginBottom: "10px" }}>
                      {item.xml_tag}
                      {item.required && <span className="redColor"> *</span>}
                      <div className="propertyText">
                        {item.data_type && <span> {item.data_type}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={6}>
                <div className="dyanamicfields">
                  {outerField.map((item, index) => (
                    <div key={index} className="form-group">
                      <Form.Select
                        onChange={(e) => this.handleDropdownChange(e, index, e.target.value)}
                        value={item.selected_field ? item.selected_field : ""}
                      >
                        <option value="">Select an element field</option>
                        {formFields.map((optionItem, indexmap) => (
                          <option key={optionItem.fieldName} value={optionItem.fieldName}>
                            {optionItem.fieldName}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
        )}
        </Row>
        <Row>
        <div className="mt-3 mb-3 text-right fieldsaveBtnDiv">
          <button className="btn addFild mr-5" type="button" onClick={this.handleSaveData}>
          <FontAwesomeIcon icon={faSave} className="plusIcon" />
            Save
          </button>
        </div>
      </Row>
      </div>
      </Container>
    );
  }
}

export default FieldMapping;
