// Components for rendering resources
import React from 'react';
import './App.scss';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const ResourceList = ({resources, updateContact, updateCallback}) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE"
      }
      const response = await fetch(`http://127.0.0.1:5000/delete_resource/${id}`, options);
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
    <div className='resource-list'>
      <h2>Resources</h2>
      <table cellSpacing={0}>
        <thead>
            <tr className='table-heading'>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Media</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {resources.map((resource) => (
                <tr key={resource.id}>
                    <td>{resource.firstName}</td>
                    <td>{resource.lastName}</td>
                    <td>{resource.email}</td>
                    <td>{resource.mediaLink}</td>
                    <td>
                        <button onClick={() => updateContact(resource)} className='form-actions'><MdEdit /></button>
                        <button onClick={() => onDelete(resource.id)} className='form-actions fas fa-trash'><FaTrash /></button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResourceList;
