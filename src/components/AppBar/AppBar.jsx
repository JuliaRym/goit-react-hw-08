import { Navigation } from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import AuthNav from "/src/components/AuthNav/AuthNav.jsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/authSelectors";
import css from "./AppBar.module.css";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
