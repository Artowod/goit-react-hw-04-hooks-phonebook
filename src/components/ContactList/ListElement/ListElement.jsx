import PropTypes from 'prop-types';
import s from './ListElement.module.css';
const ListElement = ({ name, number, deleteBtnName, deleteHandler }) => {
  return (
    <li>
      {name}: {number}
      <button
        className={s.delete}
        type="button"
        name={deleteBtnName}
        onClick={deleteHandler}
      >
        Delete
      </button>
    </li>
  );
};

ListElement.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteBtnName: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default ListElement;
