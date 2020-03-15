import axios from "axios";
const ApiService = {
  conversionRates: p =>
    axios.get(`https://api.exchangeratesapi.io/latest?base=CAD`)
};

export default ApiService;
