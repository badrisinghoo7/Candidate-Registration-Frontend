import React, { useState, useEffect } from 'react';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';
import "./App.css"

const App = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('candidates');
    if (stored) setCandidates(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const handleAddCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
  };

  const handleDelete = (email) => {
    const updated = candidates.filter((c) => c.email !== email);
    setCandidates(updated);
  };

  return (
    <div className="app">
      <div className='form'>

      <h1>Candidate Registration</h1>
      <CandidateForm onAddCandidate={handleAddCandidate} />
      <CandidateList candidates={candidates} onDelete={handleDelete} />
      </ div>
    </div>
  );
};

export default App;
