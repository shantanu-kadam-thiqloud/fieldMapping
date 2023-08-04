import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class RestDataSource {
async GetData(APIURL, callback) {
    this.SendRequest("get", APIURL, callback);
}
async PostData(APIURL, callback, data) {
    this.SendRequest("post", APIURL, callback, data);
}
async Update(APIURL, data, callback) {
    this.SendRequest("put", APIURL, callback, data);
}
async Delete(APIURL, data, callback) {
    this.SendRequest("delete", APIURL, callback, data);
}

async SendRequest(method, url, callback, data) {
    try {
      let response = await axios.request({
        method: method,
        url: url,
        data: data,
      });
      callback(response);
    } catch (err) {        
      if (err && err.response && err.response.data) {
        if (err.response.data) var k = err.response.data.error;
        if (err.response.data.reasonCode === 400)
          var k = err.response.data.reasonText;
        else var k = "Error encountered, Please try again";
        
        toast.error(err.response.data.error, {
            position: "top-center",
            autoClose: 5000,
        });
        callback(err.response);
      } else{
        toast.error(err.message, {
            position: "top-center",
            autoClose: 5000,
        });
      }
    }
  }
}