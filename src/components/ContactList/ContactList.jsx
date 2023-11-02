import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteBtnClick }) => {
  return (
    <ul className={css.contactsList}>
      {contacts.map(contact => {
        return (
          <li className={css.contactsListItem} key={contact.id}>
            <p className={css.listItemTextcontent}>
              {contact.name}: {contact.number}{' '}
            </p>

            <button
              type="button"
              onClick={() => {
                onDeleteBtnClick(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
