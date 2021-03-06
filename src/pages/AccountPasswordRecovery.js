import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { passwordRecovery } from "../http/authService";
import { Header } from "../components/Header";
import { setErrorMessageCallBackEnd, validatorEmail } from "./pagesUtils";

/**
 * Page for recovering password
 */

export function AccountPasswordRecovery() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();
  const { t } = useTranslation();

  const handleRecoveryPassword = formData => {
    return passwordRecovery(formData)
      .then(response => {
        history.push("/account/login");
      })
      .catch(error => {
        setError("email", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <div className="boxAccount">
          <h1 className="f-s-l">{t("Forgot password?")}</h1>
          <form onSubmit={handleSubmit(handleRecoveryPassword)} noValidate>
            <label className="form-control">{t("E-mail")}
              <input
                ref={register(validatorEmail)}
                name="email"
                id="email"
                type="email"
                placeholder={t("Enter your e-mail")}
              ></input>
              {errors.email && (
                <span className="errorMessage">{t(errors.email.message)}</span>
              )}
            </label>
            <p className="f-c-fourgray">
              {t("We will send you an e-mail with a new password")}
            </p>
            <div className="btn-container">
              <button
                type="submit"
                className="m-t-md btn"
                disabled={formState.isSubmitting}
              >
                {t("Send")}
              </button>
              <div className="m-t-md btn-container">
                <Link to="/account/login">{t("Sign in")}</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
}
