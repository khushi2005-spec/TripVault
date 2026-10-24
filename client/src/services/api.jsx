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

export const clearCsrfToken = () => {
  csrfToken = null;
  csrfTokenPromise = null;
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
    // Let Axios generate the multipart boundary.
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
