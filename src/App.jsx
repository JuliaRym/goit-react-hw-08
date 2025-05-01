// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchContacts } from "./redux/contactsOperations";
// import ContactForm from "./components/ContactForm/ContactForm";
// import SearchBox from "./components/SearchBox/SearchBox";
// import ContactList from "./components/ContactList/ContactList";
// import "./App.css";

// export default function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // pobieranie kontaktów
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   return (
//     <div className="container">
//       <h1>Phonebook</h1>
//       <ContactForm />
//       <SearchBox />
//       <ContactList />
//     </div>
//   );
// }

// import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Contacts from "./pages/Contacts";
// import PrivateRoute from "./routes/PrivateRoute";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/contacts"
//         element={
//           <PrivateRoute>
//             <Contacts />
//           </PrivateRoute>
//         }
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export { App };

import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
// import PrivateRoute from "./components/PrivateRoute";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
// import RestrictedRoute from "./components/RestrictedRoute";
import { RestrictedRoute } from "./components/RestrictedRoute.jsx";
import { refreshUser } from "./redux/authOperations";
import { selectIsRefreshing } from "./redux/authSelectors";
// import css from "./App.css";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const ContactsPage = lazy(() =>
  import("./pages/ContactsPage/ContactsPage.jsx")
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <div className="container">
      <AppBar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
