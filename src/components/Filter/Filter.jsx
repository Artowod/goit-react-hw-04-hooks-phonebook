import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ filterWord, filterHandler }) => {
  return (
    <div>
      Find contacts by name
      <input
        className={s.filterInput}
        type="text"
        value={filterWord}
        onChange={filterHandler}
      ></input>
    </div>
  );
};

Filter.propTypes = {
  filterWord: PropTypes.string.isRequired,
  filterHandler: PropTypes.func.isRequired,
};

export default Filter;
