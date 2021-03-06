import { useState, useEffect } from "react";

export default function useForm(initial = []) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join();

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function changeHandler(e) {
    let { value, name, type } = e.target;
    if (type === "file") [value] = e.target.files;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetInitial() {
    setInputs(initial);
  }

  return {
    inputs,
    changeHandler,
    resetInitial,
  };
}
