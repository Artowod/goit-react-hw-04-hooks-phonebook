import { v4 as uuidv4 } from 'uuid';
import '../../App';
import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  labelNameId = uuidv4();
  labelNumberId = uuidv4();

  inputNameProps = {
    id: this.labelNameId,
    type: 'text',
    name: 'name',
    pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
    title:
      "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.",
  };

  inputNumberProps = {
    id: this.labelNumberId,
    type: 'tel',
    name: 'number',
    pattern:
      '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
    title:
      'Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +',
  };

  state = {
    name: '',
    number: '',
  };

  handleInput = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.newContactHandler({
      id: uuidv4(),
      name: this.state.name,
      number: this.state.number,
    });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form className={s.contactForm} onSubmit={this.handleFormSubmit}>
        <div className={s.nameBlock}>
          <label htmlFor={this.labelNameId} className={s.labelName}>
            Name
          </label>
          <input
            value={this.state.name}
            required
            {...this.inputNameProps}
            onChange={this.handleInput}
          />
        </div>
        <div className={s.numberBlock}>
          <label htmlFor={this.labelNumberId} className={s.labelNumber}>
            Number
          </label>

          <input
            value={this.state.number}
            required
            {...this.inputNumberProps}
            onChange={this.handleInput}
          />
        </div>
        <button type="submit">Add contact </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  newContactHandler: PropTypes.func.isRequired,
};

export default ContactForm;
