import React from 'react';
import "./App.css"

const CandidateList = ({ candidates, onDelete }) => {
  return (
    <div className="candidate-list">
      <h2>Registered Candidates</h2>
      {candidates.map((c) => (
        <div key={c.email} className="candidate-card">
          <img src={c.picture} alt={c.fullName} width="100" />
          <p><strong>{c.fullName}</strong></p>
          <p>{c.email} | {c.phone}</p>
          <p>{c.gender}</p>
          <p>Skills: {c.skills.join(', ')}</p>
          <button onClick={() => onDelete(c.email)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
