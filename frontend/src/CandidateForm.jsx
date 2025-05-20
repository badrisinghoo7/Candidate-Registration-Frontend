import React, { useState } from 'react';
import "./App.css"

const skillsList = ['HTML', 'CSS', 'JavaScript', 'React', 'Node'];

const CandidateForm = ({ onAddCandidate }) => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', gender: '', skills: [], picture: null
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName) errs.fullName = 'Full Name required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid Email';
    if (!/^\d{10}$/.test(formData.phone)) errs.phone = 'Phone must be 10 digits';
    if (!formData.gender) errs.gender = 'Select Gender';
    if (formData.skills.length < 2) errs.skills = 'Select at least 2 skills';
    if (!formData.picture) errs.picture = 'Upload a profile picture';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const newSkills = checked
          ? [...prev.skills, value]
          : prev.skills.filter((s) => s !== value);
        return { ...prev, skills: newSkills };
      });
    } else if (type === 'file') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, picture: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    const reader = new FileReader();
    reader.onloadend = () => {
      onAddCandidate({ ...formData, picture: reader.result });
      setFormData({ fullName: '', email: '', phone: '', gender: '', skills: [], picture: null });
      setPreview(null);
      setErrors({});
    };
    reader.readAsDataURL(formData.picture);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input className='input-box' name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
      {errors.fullName && <span>{errors.fullName}</span>}
      <br />

      <input className='input-box' name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      {errors.email && <span>{errors.email}</span>}
      <br />

      <input className='input-box' name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      {errors.phone && <span>{errors.phone}</span>}
      <br />

      <div>
        Gender:
        <label><input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === 'Male'} /> Male</label>
        <label><input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender === 'Female'} /> Female</label>
      </div>
      {errors.gender && <span>{errors.gender}</span>}

      <div>
        Skills:
        {skillsList.map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              name="skills"
              value={skill}
              checked={formData.skills.includes(skill)}
              onChange={handleChange}
            />
            {skill}
          </label>
        ))}
      </div>
      {errors.skills && <span>{errors.skills}</span>}

      <input type="file" accept="image/*" onChange={handleChange} />
      {errors.picture && <span>{errors.picture}</span>}

      {preview && <img src={preview} alt="Preview" width="100" />}

      <button type="submit">Register</button>
    </form>
  );
};

export default CandidateForm;
