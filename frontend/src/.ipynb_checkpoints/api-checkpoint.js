import axios from "axios";

export const predict = async (features) => {
  const response = await axios.post(
    "http://localhost:3001/predict",
    { features }
  );
  return response.data;
};
