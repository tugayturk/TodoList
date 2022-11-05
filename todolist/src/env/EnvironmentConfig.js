const dev = {
  API_BASE_SERVICE_URL: "http://localhost:3000",
};
const prod = {
  API_BASE_SERVICE_URL: "http://localhost:3000",
};
const test = {
  API_BASE_SERVICE_URL: "http://localhost:3000",
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    default:
      break;
  }
};

export const env = getEnv()
