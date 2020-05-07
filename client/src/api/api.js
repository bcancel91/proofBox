const BASE_URL =
  process.env.NODE_ENV == "development" ? "http://localhost:8000/" : "/";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const api = () => {
  const get = (url, params = {}) => {
    return fetch(BASE_URL + url, {
      method: "GET",
      ...config,
      ...params,
    });
  };

  const post = (url, params = {}) => {
    console.log("url from api", url);
    console.log("params from api", params);
    return fetch(BASE_URL + url, {
      method: "POST",
      ...config,
      ...params,
    });
  };

  return {
    get,
    post,
  };
};

export default api();
