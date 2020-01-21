import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";

/**
 * Page for recovering password
 */

export function AccountPasswordRecovery() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is Account Password Recovery")}</h2>
      </main>
    </React.Fragment>
  );
}
