import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export const ContactForm = ({ onAddContactForm }) => {
  const onSubmitBtnClick = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const userData = {
      name,
      number,
      id: nanoid(),
    };
    onAddContactForm(userData);

    form.reset();
  };

  return (
    <form onSubmit={onSubmitBtnClick} className={css.form}>
      <label className={css.label}>
        Name
        <input
          className={css.forminput}
          type="text"
          name="name"
          placeholder="Enter contact name"
          pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я]+)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.forminput}
          type="tel"
          name="number"
          placeholder="Enter contact number"
          pattern="^\+?\d{1,4}[ .\-]?\(?\d{1,3}\)?[ .\-]?\d{1,4}[ .\-]?\d{1,4}[ .\-]?\d{1,9}$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};
