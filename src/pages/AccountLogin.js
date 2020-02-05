import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import jwt from "jsonwebtoken";

import { signIn } from "../http/authService";
import {
  setErrorMessageCallBackEnd,
  validatorEmail,
  validatorPassword
} from "./pagesUtils";
import { Header } from "../components/Header";
import { useAuth } from "../context/auth-context";

/**
 * Page for logining
 */

export function AccountLogin() {
  const {
    handleSubmit,
    register,
    errors,
    formState,
    setError,
    setValue
  } = useForm({
    mode: "onBlur"
  });
  const history = useHistory();
  const {
    setCurrentUser,
    setAccessToken,
    setRole,
    setCurrentUserId
  } = useAuth();
  const { t } = useTranslation();

  const handleLogin = formData => {
    return signIn(formData)
      .then(response => {
        setCurrentUser(response.data);
        const userData = jwt.decode(response.data.accessToken);
        setAccessToken(response.data.accessToken);
        setRole(userData.role);
        setCurrentUserId(userData.userId);
        history.push("/home");
      })
      .catch(error => {
        setValue("password", "");
        setError("password", "backend", setErrorMessageCallBackEnd(error));
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className="centered-container">
        <h3>{t("Please sign in")}</h3>
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <div
            className={`form-control ${
              errors.email ? "ko" : formState.touched.email && "ok"
            }`}
          >
            <label htmlFor="email">{t("E-mail")}</label>
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
          </div>

          <div
            className={`form-control ${
              errors.password ? "ko" : formState.touched.password && "ok"
            }`}
          >
            <label htmlFor="password">{t("Password")}</label>
            <input
              ref={register(validatorPassword)}
              name="password"
              type="password"
              id="password"
              placeholder={t("Enter your password")}
            ></input>
            {errors.password && (
              <span className="errorMessage">{t(errors.password.message)}</span>
            )}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              {t("Sign in")}
            </button>
            <div className="m-t-lg btn-container">
              <Link to="/account/create">{t("Sign up")}</Link>
              <Link to="/account/password/recovery">
                {t("Forgot password?")}
              </Link>
              <Link to="/email/activation/recovery">
                {t("Lost e-mail activation?")}
              </Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
