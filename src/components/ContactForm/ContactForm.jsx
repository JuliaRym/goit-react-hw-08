import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOperations";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{3}$/, "Format must be xxx-xxx-xxx")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

// const ContactForm = () => {
//   const dispatch = useDispatch();

//   const handleSubmit = (values, actions) => {
//     dispatch(addContact(values));
//     actions.resetForm();
//   };

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const contactToAdd = {
      name: values.name,
      phone: values.number, // <- zamiana 'number' na 'phone'
    };
    dispatch(addContact(contactToAdd));
    actions.resetForm();
  };

  // const handleSubmit = (values, actions) => {
  //   const contactToAdd = {
  //     name: values.name,
  //     phone: values.number, // <- klucz "phone" zamiast "number"
  //   };
  //   dispatch(addContact(contactToAdd));
  //   actions.resetForm();
  // };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" as="span" />
        </label>
        <label className={css.label}>
          Number
          <Field type="text" name="number" />
          <ErrorMessage name="number" as="span" />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
