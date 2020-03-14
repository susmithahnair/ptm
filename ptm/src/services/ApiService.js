import axios from "axios";
const ApiService = {
  call: p => axios.get(`/api/myApi`)
};

export default ApiService;
