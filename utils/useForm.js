import React, { useState } from "react";

export default function useForm(initial = {}) {
  // Create a state object for inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  return { inputs, handleChange };
}
