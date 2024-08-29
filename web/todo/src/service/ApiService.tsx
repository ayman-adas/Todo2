import axios from "axios";
const servername = "http://localhost:2003/";
class APiService {
  static async post(path: string, data: any) {
    console.log(data)
    const response = await axios.post(
      (servername + path),
       data ,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
          "Access-Control-Allow-Headers":
            "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          'Accept': '*/*',

        },
      }
    );
    return response.data;
  }
  static async patch(path: string, data:any) {
    console.log(data)
    const response = await axios.patch(
      (servername + path), data
     ,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
          "Access-Control-Allow-Headers":
            "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
        //   "Access-Control-Allow-Methods": "POST, OPTIONS",
          'Accept': '*/*',

        },
      }
    );
    return response.data.message;
  }
  static async put(path: string, data: any) {
    const response = await axios.put(
      servername + path,
     data ,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
          "Access-Control-Allow-Headers":
            "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
        //   "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      }
    );
    return response.data.message;
  }
  static async delete(path: string, data: any) {
    const response = await axios.delete(servername + path, {
      data: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Headers":
          "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
        // "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
    return response.data.message;
  }
  static async get(path: string, data:any) {
    console.log(data)
    const response = await axios.get(servername + path, {
      params:  data ,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Headers":
          "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
        // "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
    return response.data.message;
  }
}
export default APiService;
