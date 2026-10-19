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

//     if (config.data instanceof FormData) {
//       delete config.headers["Content-Type"];
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`,
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

//     if (config.data instanceof FormData) {
//       delete config.headers["Content-Type"];
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     // Attach the JWT when available.
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Let Axios set the multipart boundary for file uploads.
//     if (config.data instanceof FormData) {
//       delete config.headers["Content-Type"];
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// API.interceptors.request.use(
//   (config) => {
//     // Temporary compatibility with the existing Bearer-token flow.
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Let the browser set the correct multipart boundary for uploads.
//     if (config.data instanceof FormData) {
//       delete config.headers["Content-Type"];
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;


// import axios from "axios";

// const baseURL = `${
//   import.meta.env.VITE_API_URL || "http://localhost:5000"
// }/api`;

// const API = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Keep the CSRF token in memory, not localStorage.
// let csrfToken = null;
// let csrfTokenPromise = null;

// const getCsrfToken = async () => {
//   if (csrfToken) {
//     return csrfToken;
//   }

//   // Reuse an in-progress request if multiple changes start together.
//   if (!csrfTokenPromise) {
//     csrfTokenPromise = axios
//       .get(`${baseURL}/auth/csrf`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         csrfToken = response.data.csrfToken;
//         return csrfToken;
//       })
//       .finally(() => {
//         csrfTokenPromise = null;
//       });
//   }

//   return csrfTokenPromise;
// };

// API.interceptors.request.use(
//   async (config) => {
//     const method = (config.method || "get").toLowerCase();
//     const isStateChangingRequest = ![
//       "get",
//       "head",
//       "options",
//     ].includes(method);

//     // Temporarily retain Bearer-token compatibility.
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Send CSRF protection with every state-changing request.
//     if (isStateChangingRequest) {
//       const csrf = await getCsrfToken();

//       config.headers = config.headers || {};
//       config.headers["X-CSRF-Token"] = csrf;
//     }

//     // Let the browser set the multipart boundary for FormData.
//     if (config.data instanceof FormData) {
//       delete config.headers["Content-Type"];
//     } else {
//       config.headers = config.headers || {};
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;

// import axios from "axios";

// const baseURL = `${
//   import.meta.env.VITE_API_URL || "http://localhost:5000"
// }/api`;

// const API = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let csrfToken = null;
// let csrfTokenPromise = null;

// const getCsrfToken = async () => {
//   if (csrfToken) {
//     return csrfToken;
//   }

//   if (!csrfTokenPromise) {
//     csrfTokenPromise = axios
//       .get(`${baseURL}/auth/csrf`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         csrfToken = response.data.csrfToken;
//         return csrfToken;
//       })
//       .finally(() => {
//         csrfTokenPromise = null;
//       });
//   }

//   return csrfTokenPromise;
// };

// API.interceptors.request.use(
//   async (config) => {
//     const method = (config.method || "get").toLowerCase();

//     const isStateChangingRequest = ![
//       "get",
//       "head",
//       "options",
//     ].includes(method);

//     if (isStateChangingRequest) {
//       const token = await getCsrfToken();

//       config.headers = config.headers || {};
//       config.headers["X-CSRF-Token"] = token;
//     }

//     config.headers = config.headers || {};

//     if (config.data instanceof FormData) {
//       delete config.headers["Content-Type"];
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;

// import axios from "axios";

// const baseURL = `${
//   import.meta.env.VITE_API_URL || "http://localhost:5000"
// }/api`;

// const API = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let csrfToken = null;
// let csrfTokenPromise = null;

// const getCsrfToken = async () => {
//   if (csrfToken) {
//     return csrfToken;
//   }

//   if (!csrfTokenPromise) {
//     csrfTokenPromise = API.get("/auth/csrf")
//       .then((response) => {
//         csrfToken = response.data.csrfToken;

//         if (!csrfToken) {
//           throw new Error("CSRF token was not returned by the server.");
//         }

//         return csrfToken;
//       })
//       .finally(() => {
//         csrfTokenPromise = null;
//       });
//   }

//   return csrfTokenPromise;
// };

// API.interceptors.request.use(async (config) => {
//   const method = (config.method || "get").toLowerCase();

//   const isStateChangingRequest = ![
//     "get",
//     "head",
//     "options",
//   ].includes(method);

//   if (isStateChangingRequest) {
//     const token = await getCsrfToken();

//     config.headers = config.headers || {};
//     config.headers["X-CSRF-Token"] = token;
//   }

//   if (config.data instanceof FormData) {
//     delete config.headers["Content-Type"];
//     delete config.headers["content-type"];
//   } else {
//     config.headers = config.headers || {};
//     config.headers["Content-Type"] = "application/json";
//   }

//   return config;
// });

// export default API;


// import axios from "axios";

// const baseURL = `${
//   import.meta.env.VITE_API_URL || "http://localhost:5000"
// }/api`;

// const API = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let csrfToken = null;
// let csrfTokenPromise = null;

// const getCsrfToken = async () => {
//   if (csrfToken) {
//     return csrfToken;
//   }

//   if (!csrfTokenPromise) {
//     csrfTokenPromise = API.get("/auth/csrf")
//       .then((response) => {
//         csrfToken = response.data.csrfToken;

//         if (!csrfToken) {
//           throw new Error("CSRF token was not returned by the server.");
//         }

//         return csrfToken;
//       })
//       .finally(() => {
//         csrfTokenPromise = null;
//       });
//   }

//   return csrfTokenPromise;
// };

// API.interceptors.request.use(async (config) => {
//   const method = (config.method || "get").toLowerCase();

//   const isStateChangingRequest = ![
//     "get",
//     "head",
//     "options",
//   ].includes(method);

//   config.headers = config.headers || {};

//   if (isStateChangingRequest) {
//     const token = await getCsrfToken();
//     config.headers["X-CSRF-Token"] = token;
//   }

//   const isFormData =
//     typeof FormData !== "undefined" &&
//     config.data instanceof FormData;

//   if (isFormData) {
//     // Let the browser/Axios generate the multipart boundary.
//     if (typeof config.headers.delete === "function") {
//       config.headers.delete("Content-Type");
//     } else {
//       delete config.headers["Content-Type"];
//       delete config.headers["content-type"];
//     }
//   } else {
//     config.headers["Content-Type"] = "application/json";
//   }

//   return config;
// });

// export default API;

// import axios from "axios";

// const baseURL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

// const API = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let csrfToken = null;
// let csrfTokenPromise = null;

// const getCsrfToken = async () => {
//   if (csrfToken) {
//     return csrfToken;
//   }

//   if (!csrfTokenPromise) {
//     csrfTokenPromise = API.get("/auth/csrf")
//       .then((response) => {
//         csrfToken = response.data.csrfToken;

//         if (!csrfToken) {
//           throw new Error(
//             "CSRF token was not returned by the server."
//           );
//         }

//         return csrfToken;
//       })
//       .finally(() => {
//         csrfTokenPromise = null;
//       });
//   }

//   return csrfTokenPromise;
// };

// API.interceptors.request.use(async (config) => {
//   const method = (config.method || "get").toLowerCase();

//   const isStateChangingRequest = ![
//     "get",
//     "head",
//     "options",
//   ].includes(method);

//   config.headers = config.headers || {};

//   if (isStateChangingRequest) {
//     const token = await getCsrfToken();
//     config.headers["X-CSRF-Token"] = token;
//   }

//   const isFormData =
//     typeof FormData !== "undefined" &&
//     config.data instanceof FormData;

//   if (isFormData) {
//     // Let the browser/Axios generate the multipart boundary.
//     if (typeof config.headers.delete === "function") {
//       config.headers.delete("Content-Type");
//     } else {
//       delete config.headers["Content-Type"];
//       delete config.headers["content-type"];
//     }
//   } else {
//     config.headers["Content-Type"] = "application/json";
//   }

//   return config;
// });

// export default API;


// import axios from "axios";

// const baseURL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

// const API = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let csrfToken = null;
// let csrfTokenPromise = null;

// const getCsrfToken = async () => {
//   if (csrfToken) {
//     return csrfToken;
//   }

//   if (!csrfTokenPromise) {
//     csrfTokenPromise = API.get("/auth/csrf")
//       .then((response) => {
//         csrfToken = response.data.csrfToken;

//         if (!csrfToken) {
//           throw new Error(
//             "CSRF token was not returned by the server."
//           );
//         }

//         return csrfToken;
//       })
//       .finally(() => {
//         csrfTokenPromise = null;
//       });
//   }

//   return csrfTokenPromise;
// };

// API.interceptors.request.use(async (config) => {
//   const method = (config.method || "get").toLowerCase();

//   const isStateChangingRequest = ![
//     "get",
//     "head",
//     "options",
//   ].includes(method);

//   config.headers = config.headers || {};

//   if (isStateChangingRequest) {
//     const token = await getCsrfToken();
//     config.headers["X-CSRF-Token"] = token;
//   }

//   const isFormData =
//     typeof FormData !== "undefined" &&
//     config.data instanceof FormData;

//   if (isFormData) {
//     // Let the browser/Axios generate the multipart boundary.
//     if (typeof config.headers.delete === "function") {
//       config.headers.delete("Content-Type");
//     } else {
//       delete config.headers["Content-Type"];
//       delete config.headers["content-type"];
//     }
//   } else {
//     config.headers["Content-Type"] = "application/json";
//   }

//   return config;
// });

// export default API;


import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let csrfToken = null;
let csrfTokenPromise = null;

const getCsrfToken = async () => {
  if (csrfToken) {
    return csrfToken;
  }

  if (!csrfTokenPromise) {
    csrfTokenPromise = API.get("/auth/csrf")
      .then((response) => {
        csrfToken = response.data.csrfToken;

        if (!csrfToken) {
          throw new Error(
            "CSRF token was not returned by the server."
          );
        }

        return csrfToken;
      })
      .finally(() => {
        csrfTokenPromise = null;
      });
  }

  return csrfTokenPromise;
};

API.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();

  const isStateChangingRequest = ![
    "get",
    "head",
    "options",
  ].includes(method);

  config.headers = config.headers || {};

  if (isStateChangingRequest) {
    const token = await getCsrfToken();
    config.headers["X-CSRF-Token"] = token;
  }

  const isFormData =
    typeof FormData !== "undefined" &&
    config.data instanceof FormData;

  if (isFormData) {
    // Let the browser/Axios generate the multipart boundary.
    if (typeof config.headers.delete === "function") {
      config.headers.delete("Content-Type");
    } else {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default API;