import { useState, useCallback } from "react";

const useFormAndValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    const isFieldValid = event.target.validity.valid;
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity() && isFieldValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, errors, isValid, resetForm };
};

export default useFormAndValidation;
