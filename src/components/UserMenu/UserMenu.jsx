import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/authOperations";
import { selectUser } from "../../redux/authSelectors";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}</p>
      <button
        className={css.logout}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </div>
  );
};
