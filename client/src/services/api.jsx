// import axios from "axios";
// const API = axios.create({
//     baseURL: "http://localhost:5000/api",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// API.interceptors.request.use(
//     (config) => {
//         const token =
//         localStorage.getItem("token");
//         if(token) {
//             config.headers.Authorization = 
//             `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Use JSON content type only for normal JSON requests.
//     // For FormData/image uploads, let the browser set
//     // the correct multipart/form-data header automatically.
//     if (!(config.data instanceof FormData)) {
//       config.headers["Content-Type"] = "application/json";
//     } else {
//       delete config.headers["Content-Type"];
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;