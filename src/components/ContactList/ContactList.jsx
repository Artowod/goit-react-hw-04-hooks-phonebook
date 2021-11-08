import ListElement from './ListElement';
const ContactList = ({ contactsList, deleteHandler }) => {
  return (
    <ul>
      {contactsList.map(({ id, name, number }) => {
        return (
          <ListElement
            key={id}
            name={name}
            number={number}
            deleteBtnName={id}
            deleteHandler={deleteHandler}
          />
        );
      })}
    </ul>
  );
};
export default ContactList;
