import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [form, setForm] = useState({ name: '',lastname: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, form, { withCredentials: true });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur serveur');
    }
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Inscription</h2>
        {message && <div className="alert">{message}</div>}
        <input name="name" placeholder="Nom" onChange={handleChange} required />
        <input name="lastname" placeholder="Prénom" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirmer mot de passe" onChange={handleChange} required />
        <button type="submit">Créer un compte</button>

        <p className="redirect-text">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
