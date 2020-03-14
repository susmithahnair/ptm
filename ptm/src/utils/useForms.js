import { useState } from "react";

export default initForm => {
  const [inputs, setInputs] = useState(initForm);

  const handleInputChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return {
    inputs,
    setInputs,
    handleInputChange
  };
};
