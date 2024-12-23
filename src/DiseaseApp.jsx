import React, { useState } from 'react';

const DiseaseApp = () => {
  const [diseaseName, setDiseaseName] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [error, setError] = useState('');

  const fetchDiseaseInfo = async (diseaseName) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${diseaseName}`);
      if (!response.ok) {
        throw new Error('Disease information not available.');
      }
      const data = await response.json();
      setDiseaseInfo(data);
      setError('');
    } catch (error) {
      setError('Disease information not available.');
      setDiseaseInfo(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchDiseaseInfo(diseaseName);
 setDiseaseName('');
  };

  return (
    <div className="disease-app">
      <h1> Disease Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={diseaseName}
          onChange={(e) => setDiseaseName(e.target.value)}
          placeholder="Enter disease name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {diseaseInfo && (
        <div className="disease-info">
        {/* <img src={diseaseInfo.image} alt={diseaseInfo.name} /> */ }
          <h2>{diseaseInfo.name}</h2>
          <h3>Description:</h3>
           <p>{diseaseInfo.description}</p>
          <h3>Symptoms:</h3>
          <ul>
            {diseaseInfo.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
          <h3>Treatments:</h3>
          <ul>
            {diseaseInfo.treatments.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </ul>
          <h3>Preventions:</h3>
          <ul>
            {diseaseInfo.prevention.map((prevention, index) => (
              <li key={index}>{prevention}</li>
            ))}
          </ul>
         
          <h4>A healthy outside starts from the inside...</h4>
        </div>
      
      )}
    </div>
  );
};


export default DiseaseApp;
