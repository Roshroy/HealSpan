
// import  httpClient  from"../api/http-common";

// export const readAll = () =>{
//    return httpClient.get("/records");
// }
// Your file

import httpClient from '../api/http-common'

export const readAll = () => {
   return httpClient.get('/records');
}
