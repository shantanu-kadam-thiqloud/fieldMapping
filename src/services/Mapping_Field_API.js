import RestDataSource from './Api-request';

export function getMappedData(QueryStringData, res) {
  const APIURL = `http://172.16.16.48:9093/field_mapping/v1/api/get_mapping?cifId=${QueryStringData.cifId}&fileType=${QueryStringData.fileType}&fileExtension=${QueryStringData.fileExtension}`;
  return new RestDataSource().GetData(APIURL, res);
}

export function saveMappingData(MappingData, res) {
    const APIURL = 'http://172.16.16.48:9093/field_mapping/v1/api/add_mapping';
    return new RestDataSource().PostData(APIURL, res, MappingData);
  }

export function saveFileData(FileData, res) {
    const APIURL = 'http://172.16.16.48:9093/field_mapping/v1/api/homescreen/add_mapping';
    return new RestDataSource().PostData(APIURL, res, FileData);
  }

  export function getFileData(QueryStringData, res) {
    const APIURL = `http://172.16.16.48:9093/field_mapping/v1/api/homescreen/get_mapping?cifId=${QueryStringData.cifId}&fileType=${QueryStringData.fileType}`;
    return new RestDataSource().GetData(APIURL, res);
  }

  export function getDefaultData(fileType, res) {
    const APIURL = `http://172.16.16.48:9093/field_mapping/v1/api/homescreen/get_mapping_gst_tax?fileType=${fileType}`;
    return new RestDataSource().GetData(APIURL, res);
  }