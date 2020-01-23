import React, { useEffect, useState } from "react";
import i18n from "i18next";

import { Link } from "react-router-dom";

export function Header() {
  const [lang, setLang] = useState("en");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const langStored = localStorage.getItem("re:lang");
    if (langStored) {
      //console.log("Language stored", langStored)
      setLang(langStored);
      i18n.changeLanguage(langStored);
    } else {
      let userLang = navigator.language || navigator.userLanguage;
      if (userLang) {
        userLang = userLang.substring(0, 2);
        switch (userLang) {
          case "es":
          case "it":
          case "en":
            i18n.changeLanguage(userLang);
            setLang(userLang);
            //console.log("Language browser", userLang);
            break;
          default:
            i18n.changeLanguage("en");
            setLang(userLang);
            //console.log("Language browser no encontrado", userLang);
            break;
        }
      } else {
        i18n.changeLanguage("en");
        setLang(userLang);
        //console.log("Default languade EN!!!!!");
      }
    }
  }, [lang]);

  //console.log("Lenguage impostado", i18n.languages[0])

  return (
    <header className="header">
      <Link to="/">
        <h1>Rating Empresas</h1>
      </Link>
      <ul className="header">
        <li className="header-item header-item">
          <label>
            English
              <input
              type="radio"
              name="language"
              value="en"
              checked={lang === "en"}
              onChange={e => {
                localStorage.setItem("re:lang", "en");
                setLang("en");
                i18n.changeLanguage("en");
              }}
            />
          </label>
        </li>
        <li className="header-item">
          <label>
            Spanish
              <input
              type="radio"
              name="language"
              value="es"
              checked={lang === "es"}
              onChange={e => {
                localStorage.setItem("re:lang", "es");
                setLang("es");
                i18n.changeLanguage("es");
              }}
            />
          </label>
        </li>
        <li className="header-item">
          <label>
            Italian
              <input
              type="radio"
              name="language"
              value="it"
              checked={lang === "it"}
              onChange={e => {
                localStorage.setItem("re:lang", "it");
                setLang("it");
                i18n.changeLanguage("it");
              }}
            />
          </label>
        </li>
      </ul>
      <nav className="header-item">
        <ul className="header">
          <li className="header-item">
            <Link to="/account/login">
              <p>Sign In
                    </p>
            </Link>
          </li>
          <li className="header-item">
            <Link to="/account/create">
              <p>Sign Up
                    </p>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="menu header-item" onClick={() => setShowMenu(true)}>{i18n.t(" Menu")}
        {showMenu && (
          <div className="m-t-lg lista-menu" onMouseLeave={() => setShowMenu(false)}>
            <ul>
              <li><Link to="/company/create">{i18n.t("My company")}</Link></li>
              <li><Link to="/review/create">{i18n.t("Create review")}</Link></li>
              <li><Link to="/review/user">{i18n.t("My review")}</Link></li>
              <li><Link to="/user/update">{i18n.t("My profile")}</Link></li>
              <li><Link to="/account/password/change">{i18n.t("Change password")}</Link></li>
              <li><Link to="/user/delete">{i18n.t("Delete user")}</Link></li >
              <li><Link to="/home">{i18n.t("Logout")}</Link></li >
            </ul>
          </div>
        )}
      </nav>
    </header >
  );
}
