import axios from "axios";

const api = async params => {
  try {
    const res = await axios(params);
    return new Promise(reslove => {
      reslove(res);
    });
  } catch (e) {
    throw(e)
  }
};

export default api;
