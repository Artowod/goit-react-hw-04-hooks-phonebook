import { Component } from 'react';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import './App.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Chack Norris', number: '459-12-56' },
      { id: 'id-2', name: 'Silvester Stallone', number: '443-89-12' },
      { id: 'id-3', name: 'Jacky Chan', number: '645-17-79' },
      { id: 'id-4', name: 'Arnold Schvartseneger', number: '227-91-26' },
      { id: 'id-5', name: 'Bolo Yeng', number: '227-91-26' },
    ],
    filter: '',
  };

  filteredContactList = () => {
    const filterWord = this.state.filter;
    let result = [];
    result = this.state.contacts.filter(item => {
      return item.name.toLowerCase().includes(filterWord.toLowerCase());
    });
    return result;
  };

  filterHandler = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  addContact = newContact => {
    const { name } = newContact;
    const matchedContactsList = this.state.contacts.filter(item => {
      return item.name.toLowerCase() === name.toLowerCase();
    });

    matchedContactsList.length !== 0
      ? alert(`${name} is already in contacts.`)
      : this.setState(prevState => {
          const result = [...prevState.contacts, newContact];
          return { contacts: result };
        });
  };

  deleteHandler = e => {
    const { name: contactId } = e.target;
    const resultedContactsList = this.state.contacts.filter(contact => {
      return contact.id !== contactId;
    });
    this.setState({ contacts: resultedContactsList });
  };

  componentDidUpdate() {
    console.log('-=DidUpdate=-');
    this.setState(({ contacts }) => {
      if (contacts !== this.setState['contacts']) {
        localStorage.setItem('phoneBook', JSON.stringify(contacts));
      }
    });
  }
  componentDidMount() {
    console.log('-=DidMount=-');
    const localStorageData = localStorage.getItem('phoneBook');
    if (localStorageData) {
      this.setState({ contacts: JSON.parse(localStorageData) });
    } else {
      localStorage.setItem('phoneBook', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm newContactHandler={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          filterWord={this.state.filter}
          filterHandler={this.filterHandler}
        />
        <ContactList
          contactsList={this.filteredContactList()}
          deleteHandler={this.deleteHandler}
        />
      </div>
    );
  }
}

export default App;
