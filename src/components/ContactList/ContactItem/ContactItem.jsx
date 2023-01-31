import css from './ContactItem.module.css';
import { PropTypes } from 'prop-types';

const ContactItem = ({ idx, name, number, onRemove }) => {
  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button
        type="button"
        className={css.button}
        onClick={() => {
          onRemove(idx);
        }}
      >
        Remove
      </button>
    </li>
  );
};
ContactItem.propTypes = {
  idx: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  onRemove: PropTypes.func,
};
export default ContactItem;
