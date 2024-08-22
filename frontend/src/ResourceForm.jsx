import React from 'react';
import { useState } from 'react';
import './App.scss';

const ResourceForm = ({ existingResource = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingResource.firstName || "");
    const [lastName, setLastName] = useState(existingResource.lastName || "");
    const [email, setEmail] = useState(existingResource.email || "");
    const [mediaLink, setMediaLink] = useState(existingResource.mediaLink || "")

    const updating = Object.entries(existingResource).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault() // Don't refresh the page automatically

        const data = {
            firstName,
            lastName,
            email,
            mediaLink,
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_resource/${existingResource.id}` : "create_resource")
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
        <form onSubmit={onSubmit} className='resource-form'>
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
            <div className='field'>
                <label htmlFor="mediaLink">MediaLink:</label>
                <input 
                    type="text"
                    id="mediaLink"
                    value={mediaLink}
                    onChange={(e) => setMediaLink(e.target.value)} />
            </div>
            <button type='submit' className='submit-form'>{updating ? "Update" : "Create"} Resource</button>
        </form>
    );
};

export default ResourceForm;