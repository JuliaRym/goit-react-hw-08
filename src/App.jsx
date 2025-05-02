import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { RestrictedRoute } from "./components/RestrictedRoute.jsx";
import { refreshUser } from "./redux/authOperations";
import { selectIsRefreshing } from "./redux/authSelectors";
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
