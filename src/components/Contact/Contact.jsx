import React from "react";
import css from "./Contact.module.css";

const Contact = ({ contact }) => {
  return (
    <div className={css.contact}>
      <p className={css.name}>{contact.name}</p>
      <p className={css.phone}>{contact.phone}</p>
    </div>
  );
};

export default Contact;
