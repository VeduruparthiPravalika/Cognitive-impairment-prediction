import axios from "axios";

export const predict = async (features) => {
  const response = await axios.post(
    "https://cogni-risk-enginebackend.onrender.com/predict",
    { features }
  );
  return response.data;
};
