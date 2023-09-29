// import { Component } from "react";

import { FormStyle } from "./FormStyle.styled"; 

import { useState } from 'react';


export const Form = ({onChange}) => {
    // state = {
    //     name: '',
    //     number: ''
    // };
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = event => {
        switch (event.target.name) {
            case "name":
                setName(event.target.value);
                break;
            case "number":
                setNumber(event.target.value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        onChange({ name, number });
        formReset();
    };

    const formReset = () => {
        setName('');
        setNumber('');
    };


    return (
        <FormStyle>
            <form onSubmit={handleSubmit} className="form">
                <label className='label' htmlFor='name'>
                    <span className="input-title">Name</span>
                    <input className="input"
                        type="text"
                        name="name"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        placeholder='Rosie Simpson'
                        value={name}
                        onChange={handleChange}
                    // pattern="^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
                    />
                </label>
                <label htmlFor='number' className='label'>
                    <span className="input-title">Number</span>
                    <input className="input"
                        type="tel"
                        name="number"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        placeholder='459-12-56'
                        value={number}
                        onChange={handleChange}
                    // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    />
                </label>
                <button
                    className="btn"
                    type='submit'
                    disabled={name === '' && number === ''}
                >Add Contact
                </button>
            </form>
        </FormStyle>
    );
};
