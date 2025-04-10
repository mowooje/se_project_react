import React, { useEffect } from "react";
import "./RegisterModal.css";
import useFormAndValidation from "../../utils/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  handleRegistration,
  isOpen,
  onClose,
  isLoading,
  setActiveModal,
}) {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "", name: "", avatar: "" });
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Registering..." : "Next"}
      altButtonText="or Log in"
      altButtonClick={() => setActiveModal("login")}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
      onClose={onClose}
    >
      <label htmlFor="register__email" className="modal__label">
        Email*{" "}
        <input
          className="modal__input"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="register__password" className="modal__label">
        Password*{" "}
        <input
          className="modal__input"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="register__name" className="modal__label">
        Name*{" "}
        <input
          className="modal__input"
          name="name"
          type="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="register__avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          className="modal__input"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Sign Up
        </button>
        <button
          className="modal__to-login"
          type="button"
          onClick={() => setActiveModal("login")}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
