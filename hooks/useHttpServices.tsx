import baseURL from "@/config/apiBaseUrl";
import axios from "axios";

const useHttpServices = () => {
    const session= {access_token: ""}
  const postData = async ({path, body}:any) => {
    //clear whitespace in body
    // body=trimObject(body)
    console.log({body,baseURL, path})
    try {
      const { data } = await axios.post(`${baseURL}/${path}`, body);
      return {data};
    } catch (e:any) {
      console.log(e?.response?.data?.error?.message);
      const error=e?.response?.data;
      throw error;
    } finally {
      
    }
  };
  const postDataWithoutBaseUrl = async ({path,body}:any) => {
    try {

      const { data } = await axios.post(`${path}`, body);
      console.log({data})
      return {data};
    } catch (e:any) {
      console.log(e?.response?.data?.error?.message);
      const error=e?.response?.data;
      throw error;
    } finally {
      
    }
  };
    const getDataWithoutBaseUrl = async ({path}:any             ) => {
    try {

      const { data } = await axios.get(`${path}`);
      console.log({data})
      return {data};
    } catch (e:any) {
      console.log(e?.response?.data?.error?.message);
      const error=e?.response?.data;
      throw error;
    } finally {
      
    }
  };
  const postProtectedData = async ({path, body={}, userType}:any) => {
    console.log({path})

    const headers={
      authorization: `Bearer ${userType==="vendor"?session.access_token:session.access_token}`,
    }
    try {
      const { data } = await axios.post(`${baseURL}/${path}`, body, {headers});
      console.log(data.status);
      return {data}
    } catch (e:any) {
        console.log(e?.response?.data?.error?.message);
        const error=e?.response?.data;
        console.log(e.response)
        throw error;
    } finally {
      
      
    }
  };
  
  const putProtectedData = async ({path, body={}, userType}:any) => {
    console.log({path})

    const headers={
      authorization: `Bearer ${userType==="vendor"?session.access_token:session.access_token}`,
    }
    try {
;
      // const response=await axios.put(`${baseUrl}/bootcamps/edit/${btcId}`, formData,{headers})
      const { data } = await axios.put(`${baseURL}/${path}`, body, {headers});
      console.log(data.status);
      return {data}
    } catch (e:any) {
        console.log(e?.response?.data?.error?.message);
        const error=e?.response?.data;
        throw error;
    } finally {
      
      
    }
  };
  const patchProtectedData = async ({path, body={}, userType}:any) => {
    console.log({path})

    const headers={
      authorization: `Bearer ${userType==="vendor"?session.access_token:session.access_token}`,
    }
    try {

      // const response=await axios.put(`${baseUrl}/bootcamps/edit/${btcId}`, formData,{headers})
      const { data } = await axios.patch(`${baseURL}/${path}`, body, {headers});
      console.log(data.status);
      return {data}
    } catch (e:any) {
        console.log(e?.response?.data?.error?.message);
        const error=e?.response?.data;
        throw error;
    } finally {
      
      
    }
  };
  const deleteProtectedData = async ({path, body={}, userType}:any) => {
    console.log({path})

    const headers={
      authorization: `Bearer ${userType==="vendor"?session.access_token:session.access_token}`,
    }
    try {

      const { data } = await axios.delete(`${baseURL}/${path}`, {headers, data:body});
      console.log(data.status);
      return {data}
    }  catch (e:any) {
      console.log(e?.response?.data?.error?.message);
      const error=e?.response?.data;
      throw error;
    } finally {
      
      
    }
  };
  const getProtectedData = async ({path, userType}:any) => {
    console.log({path})
    // console.log({token})
    try {
      // console.log({vendor_token})
      // const { data } 
      const {data}= await axios.get(`${baseURL}/${path}`, {
        headers: {
          authorization: `Bearer ${userType==="vendor"?session.access_token:session.access_token}`,
        },
      });
      return data;
    } catch (error:any) {
      const e=error?.response?.data;
      throw e
    } finally {
    
    }
  };
  const getData = async ({path}:any) => {
    try {
      const { data } = await axios.get(`${baseURL}/${path}`);
      
      return data;
    } catch (e:any) {
      // console.log(error?.response?.status);
      // console.log(error?.response?.data?.error?.message);
      const error=e?.response?.data;
      throw error;
    } finally {
    }
  };

  // const parseCSVFile=async(filePath) => {
  //   const data = [];

  //   await new Promise((resolve, reject) => {
  //       const stream = fs.createReadStream(filePath)
  //           .pipe(csv())
  //           .on('data', (row) => {
  //               data.push(row);
  //           })
  //           .on('end', () => {
  //               resolve();
  //           })
  //           .on('error', (error) => {
  //               reject(error);
  //           });
  //   });

  //   return data;
  // }
  return {
    postData,
    postProtectedData,
    putProtectedData,
    patchProtectedData,
    getProtectedData,
    deleteProtectedData,
    postDataWithoutBaseUrl,
    getData,
    getDataWithoutBaseUrl
    //  parseCSVFile
  };
};

export default useHttpServices