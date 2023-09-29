
// import { Component } from 'react';

import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { initialContacts } from './initialContacts/initialContacts';
import {Section} from './section/Section';
import {Form} from './contactsForm/ContactsForm';
import { Filter } from './filter/Filter';
import { Contacts } from './contacts/Contacts';
import { useState, useEffect } from 'react';

export const App = () => {

       const [contacts, setContacts] = useState(() => {
         const saveData = localStorage.getItem('contacts');
        //  return saveData || initialContacts;
          return saveData ? JSON.parse(saveData) : [...initialContacts];
});


  useEffect(() => {
         localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
    



  // componentDidMount() {
  //   const saveDataParse = JSON.parse(saveData);
  //   if (saveDataParse) {
  //     this.setState({contacts: saveDataParse})
  //   };
  // };

  // componentDidUpdate(_, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  //   };
  // };

  const onFormSubmitData = ({ name, number }) => {
    if (
      contacts.some(
        contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number.toLowerCase() === number.toLowerCase()
        )
        ) {
          alert(`${name} is already in contacts.`);
          return;
        }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    
    
    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };
  
  const [filter, setFilter] = useState('');

  const deleteContact = contactId => {
    setContacts({
      contacts: contacts.filter(contact => contact.id !== contactId),
    });
  };
  
  
 const filterByString = (field, filterValue) => {
    return field.toLowerCase().trim().includes(filterValue.toLowerCase().trim()
    );
  };
  
  
  const filteredContacts = () => {
    return contacts.filter(
      (contact) =>
        filterByString(contact.name, filter) ||
        filterByString(contact.number, filter)
    );
  };
  
    
    
  const onFilterChange = (event) => {
    const { value } = event.target.value; // деструктурируем значение из объекта event.target
    setFilter(value);
  
  }
  

  const onLengthCheck = () =>{
    return contacts.length
  };


  const renderContacts = () => {
    if(onLengthCheck() === 0){
      return Notify.success('There are no contatcs in your list, sorry');
    } else{
      if(filteredContacts().length > 0){
        return <Contacts 
          contacts={filteredContacts()} 
          deleteContact={deleteContact}/>
      } else{
        return Notify.failure('No contacts found that match the filter');
      }
    }
  }

      return (
     <Section title={"Phonebook"}>
          <Form onChange={onFormSubmitData}/>     

          <Filter
            filter={filter}
            onFilterChange={onFilterChange}
          />
       {renderContacts()}
      </Section>)
 
};