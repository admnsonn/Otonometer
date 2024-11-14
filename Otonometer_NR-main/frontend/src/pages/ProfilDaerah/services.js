import axios from "axios";

export const getListJabatanALL = (callback) =>{
    // let currentDate = new Date();
    // let currentYear = currentDate.getFullYear();
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://development.otonometer.com:9999/api/structure-pemda`,
      headers: {}
    };
    axios.request(config)
    .then((response) => {
        callback(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
}

export const getLayananPublik = (callback) =>{
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://development.otonometer.com:9999/api/layanan-pemda',
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    callback(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
}
export const getDataLiniMasa = (id,callback) =>{
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://development.otonometer.com:9999/api/lini-masa-pemda?id=${id}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    callback(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
}
export const getListJabatanSpesific = (id,callback) =>{
    // let currentDate = new Date();
    // let currentYear = currentDate.getFullYear();
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://development.otonometer.com:9999/api/structure-pemda?id=${id}`,
    //   url: process.env.REACT_APP_URL_API_PEMDA +`/jabatan/list?list=spesific&atasan=${id}&tahun=${currentYear}`,
      headers: {}
    };
    axios.request(config)
    .then((response) => {
        callback(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }