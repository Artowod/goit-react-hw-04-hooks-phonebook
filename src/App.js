// import { Component } from 'react';
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import './App.css';

//class App extends Component {
const App = () => {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Chack Norris', number: '459-12-56' },
  //     { id: 'id-2', name: 'Silvester Stallone', number: '443-89-12' },
  //     { id: 'id-3', name: 'Jacky Chan', number: '645-17-79' },
  //     { id: 'id-4', name: 'Arnold Schvartseneger', number: '227-91-26' },
  //     { id: 'id-5', name: 'Bolo Yeng', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Chack Norris', number: '459-12-56' },
    { id: 'id-2', name: 'Silvester Stallone', number: '443-89-12' },
    { id: 'id-3', name: 'Jacky Chan', number: '645-17-79' },
    { id: 'id-4', name: 'Arnold Schvartseneger', number: '227-91-26' },
    { id: 'id-5', name: 'Bolo Yeng', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const filteredContactList = () => {
    const filterWord = filter;
    let result = [];
    result = contacts.filter(item => {
      return item.name.toLowerCase().includes(filterWord.toLowerCase());
    });
    return result;
  };

  const filterHandler = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const addContact = newContact => {
    const { name } = newContact;
    const matchedContactsList = contacts.filter(item => {
      return item.name.toLowerCase() === name.toLowerCase();
    });

    matchedContactsList.length !== 0
      ? alert(`${name} is already in contacts.`)
      : // : this.setState(prevState => {
        //     const result = [...prevState.contacts, newContact];
        //     return { contacts: result };
        // });
        setContacts(prevState => [...prevState, newContact]);
  };

  const deleteHandler = e => {
    const { name: contactId } = e.target;
    const resultedContactsList = contacts.filter(contact => {
      return contact.id !== contactId;
    });
    setContacts(resultedContactsList);
  };

  useEffect(() => {
    localStorage.setItem('phoneBook', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidMount() {
  //   console.log('-=DidMount=-');
  //   const localStorageData = localStorage.getItem('phoneBook');
  //   if (localStorageData) {
  //     this.setState({ contacts: JSON.parse(localStorageData) });
  //   } else {
  //     localStorage.setItem('phoneBook', JSON.stringify(this.state.contacts));
  //   }
  // }

  //didmount replacement  - КАК ИЗБАВИТЬСЯ ОТ ВОРНИНГА ???
  useEffect(() => {
    const localStorageData = localStorage.getItem('phoneBook');
    if (localStorageData) {
      setContacts(JSON.parse(localStorageData));
    } else {
      localStorage.setItem('phoneBook', JSON.stringify(contacts));
    }
  }, []);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm newContactHandler={addContact} />

      <h2>Contacts</h2>
      <Filter filterWord={filter} filterHandler={filterHandler} />
      <ContactList
        contactsList={filteredContactList()}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
