// Components for rendering contacts
import React from 'react';
import './App.scss';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const ContactList = ({contacts, updateContact, updateCallback}) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE"
      }
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
      if (response.status == 200) {
        updateCallback()
      } else {
        console.error("Failed to delete")
      }
    } catch (error) {
      alert(error)
    }
  }


  return (
    <div className='contact-list'>
      <h2>Contacts</h2>
      <table cellSpacing={0}>
        <thead>
            <tr className='table-heading'>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {contacts.map((contact) => (
                <tr key={contact.id}>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td>
                        <button onClick={() => updateContact(contact)} className='form-actions'><MdEdit /></button>
                        <button onClick={() => onDelete(contact.id)} className='form-actions fas fa-trash'><FaTrash /></button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList;
