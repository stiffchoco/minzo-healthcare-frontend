const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://minzo-mvp-backend.onrender.com"
    // :"http://192.168.153.36:5002";
    // : "https://vaisualize-api.onrender.com"
    : "https://minzo-mvp-backend.onrender.com"
    // : "https://vaisualize-api.onrender.com"

    // : "http://127.0.0.1:8000";
    // :"https://football-cleansheet-data-api.onrender.com"

export default baseURL 
