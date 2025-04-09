import React, { useEffect } from "react";
import "./LoginModal.css";
import useFormAndValidation from "../../utils/useFormAndValidation.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  handleLogin,
  isOpen,
  onClose,
  isLoading,
  setActiveModal,
}) => {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(values);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "" });
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Login"
      buttonText={isLoading ? "Logging in" : "Login"}
      altButtonText="or Register"
      altButtonClick={() => setActiveModal("register")}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="email-login">
        Email
      </label>
      <input
        className="modal__input"
        id="email-login"
        name="email"
        type="email"
        minLength="4"
        maxLength="64"
        placeholder="Email"
        value={values.email || ""}
        onChange={handleChange}
        required
      />
      <label className="modal__label" htmlFor="password-login">
        Password
      </label>
      <input
        className="modal__input"
        id="password-login"
        name="password"
        type="password"
        placeholder="Password"
        value={values.password || ""}
        onChange={handleChange}
        required
      />
      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Login
        </button>
        <button
          className="modal__to-register"
          type="button"
          // onClick={handleRegister}
        >
          or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
