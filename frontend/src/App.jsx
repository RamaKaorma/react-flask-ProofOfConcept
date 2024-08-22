import { useState, useEffect } from 'react';
import './App.scss';
import ResourceList from './ResourceList';
import ResourceForm from './ResourceForm';

function App() {
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState({});


  useEffect(() => {
    fetchResources()
  }, []);


  const fetchResources = async () => {
    const response = await fetch("http://127.0.0.1:5000/resources");
    const data = await response.json();
    setResources(data.resources);
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentResource({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (resource) => {
    if (isModalOpen) return
    setCurrentResource(resource)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchResources()
  }

  return (
    <>
      <ResourceList resources={resources} updateResource={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal} className='create-new-resource'>Create New Resource</button>
      { isModalOpen && 
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <ResourceForm existingResource={currentResource} updateCallback={onUpdate}/>
          </div>
        </div>
      }
      
    </>
  )
}

export default App;