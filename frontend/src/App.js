import React from 'react';
import { useState } from 'react';
import ResultCard from './components/ResultCard';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toNameChange = (event) => {
    setFormData(prevName=>({...prevName, name: event.target.value }));
  };

  const toLocationChange = (event) => {
    setFormData(prevLocation=>({...prevLocation, location: event.target.value }));
  };

  const tohandleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const url= 'http://localhost:3000/business-data';
      const options ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
      const response = await fetch(url, options);
      const data = await response.json();
      if(response.ok){
        setBusinessData(data);
      }
    } catch (err) {
      alert('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    setLoading(true);
    const url=`http://localhost:3000/regenerate-headline?name=${formData.name}&location=${formData.location}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBusinessData((prev) => ({ ...prev, headline: data.headline }));
    } catch (err) {
      alert('Error regenerating headline');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container">
        <h1 className="title">Local Business Dashboard</h1>
        <form onSubmit={tohandleSubmit}>
          <label htmlFor="name" className='form-label'>Business Name</label>
          <input
            name="name"
            type="text"
        
            placeholder="Business Name"
            value={formData.name}
            onChange={toNameChange}
            required
          />
          <label htmlFor="location" className='form-label'>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={toLocationChange}
            required
          />
          <button type="submit">
            submit
          </button>
        </form>

        {loading?(<div className="loader"></div>):(businessData && (<ResultCard businessData={businessData} regenerateHeadline={regenerateHeadline} />))}
      </div>
    
  )
}
export default App;