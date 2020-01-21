import React from "react";
import i18n from "i18next";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/**
 * Page for view a review (admin can delete a review)
 */

export function ReviewView() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>{i18n.t("This is Review View")}</h2>
      </main>
      <Footer />
    </React.Fragment>
  );
}