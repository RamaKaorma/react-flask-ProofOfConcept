import React from 'react';
import { useState } from 'react';
import './App.scss';

const ContactForm = ({ existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page automatically

        const data = {
            firstName,
            lastName,
            email
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }


    return (
        <form onSubmit={onSubmit} className='contact-form'>
            <div className='field'>
                <label htmlFor="firstName">First Name:</label>
                <input 
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className='field'>
                <label htmlFor="lastName">Last Name:</label>
                <input 
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className='field'>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type='submit' className='submit-form'>{updating ? "Update" : "Create"} Contact</button>
        </form>
    );
};

export default ContactForm;