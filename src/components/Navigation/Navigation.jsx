import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/authSelectors";
import css from "./Navigation.module.css";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //   return (
  //     <nav>
  //       <NavLink className={css.link} to="/">
  //         Home
  //       </NavLink>
  //       {isLoggedIn && (
  //         <NavLink className={css.link} to="/tasks">
  //           Tasks
  //         </NavLink>
  //       )}
  //     </nav>
  //   );

  return (
    <nav className={css.link}>
      <NavLink to="/"> Home </NavLink>
      {isLoggedIn && <NavLink to="/contacts"> Contacts </NavLink>}
    </nav>
  );
};
