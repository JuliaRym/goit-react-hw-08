import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleInputChange = (evt) => {
    dispatch(setNameFilter(evt.target.value));
  };

  return (
    <label className={css.searchLabel}>
      Find contacts by name
      <input type="text" value={filter} onChange={handleInputChange} />
    </label>
  );
};

export default SearchBox;
