const API_ENDPOINTS = {
  AUTH_ENDPOINTS: {
    NORMAL_SIGNUP: "api/v1/auth/sign-up",
    NORMAL_SIGNIN: "api/v1/auth/sign-in",
    BUSINESS_SIGNUP: "api/v1/auth/sign-up-user-with-business",
  },
  LIBERIA_CITIES: [
  { city: "Monrovia", county: "Montserrado", lat: 6.30054, longitude: -10.7969 },
  { city: "Paynesville", county: "Montserrado", lat: 6.2750, longitude: -10.7092 },
  { city: "Gbarnga", county: "Bong", lat: 6.99543, longitude: -9.47122 },
  { city: "Buchanan", county: "Grand Bassa", lat: 5.87693, longitude: -10.04964 },
  { city: "Ganta", county: "Nimba", lat: 7.235, longitude: -8.98444 },
  { city: "Kakata", county: "Margibi", lat: 6.53104, longitude: -10.35368 },
  { city: "Zwedru", county: "Grand Gedeh", lat: 6.06846, longitude: -8.13559 },
  { city: "Harbel", county: "Margibi", lat: 6.24683, longitude: -10.35642 },
  { city: "Harper", county: "Maryland", lat: 4.3782, longitude: -7.71081 },
  { city: "Pleebo", county: "Maryland", lat: 4.58953, longitude: -7.67218 },
  { city: "Foya", county: "Lofa", lat: 8.36028, longitude: -10.20639 },
  { city: "Voinjama", county: "Lofa", lat: 8.42194, longitude: -9.74778 },
  { city: "Tubmanburg", county: "Bomi", lat: 6.87064, longitude: -10.8211 },
  { city: "Greenville", county: "Sinoe", lat: 5.01133, longitude: -9.0388 },
  { city: "Robertsport", county: "Grand Cape Mount", lat: 6.7533, longitude: -11.3671 },
  { city: "Bomi Hills", county: "Bomi", lat: 6.7560, longitude: -10.8430 },
  { city: "Bensonville", county: "Montserrado", lat: 6.4475, longitude: -10.6125 },
{ city: "Bopolu", county: "Gbarpolu", lat: 7.0667, longitude: -10.4875 },
{ city: "Barclayville", county: "Grand Kru", lat: 4.6744, longitude: -8.2339 },
{ city: "Sanniquellie", county: "Nimba", lat: 7.3622, longitude: -8.7133 },
{ city: "River Cess", county: "Rivercess", lat: 5.4667, longitude: -9.5833 },
{ city: "Fish Town", county: "River Gee", lat: 5.1974, longitude: -7.8758 }
  ],
  BUSINESS_ENDPOINTS: {
    GET_ALL: "api/v1/business/all",
    GET_ONE: (id:any) => `api/v1/business/one/${id}`,
    GET_NEARBY: "api/v1/business/nearby",
    GET_TOP_RATED: "api/v1/business/top-rated",
    GET_RATINGS: (id:any) => `api/v1/business/ratings/${id}`,
    CLAIM: "api/v1/business/claim",
  },

  USER_ENDPOINTS: {
    GET_ME: "api/v1/users/me",
    SUBMIT_RATING: "api/v1/users/submit-rating",
  },
  HEALTHCARE_CATEGORIES:["Hospital", "Clinic", "Pharmacy", 'Laboratory', 'Dental', 'Maternity', 'Eye Care', 'Others'],
//   CITIES_IN_LIBERIA: ["Monrovia", "Gbarnga", "Buchanan", "Harper", "Zwedru", "Voinjama", "Bopolu", "Kakata", "Sanniquellie", "Bensonville"],
  ADMIN_ENDPOINTS: {
    // Exact admin route paths were not provided in the documentation.
    // Add them when the backend routes are confirmed.
  },

  HEALTH_CHECK: "hello",
};

export default API_ENDPOINTS;