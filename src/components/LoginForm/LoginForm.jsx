import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logIn } from "../../redux/authOperations";
import css from "./LoginForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Too short")
    .max(30, "Too long")
    .required("Password is required"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log("Login success");
      })
      .catch(() => {
        console.log("Login error");
      })
      .finally(() => {
        actions.resetForm();
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className={css.error} />
        </label>

        <button className={css.button} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};
