import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';  
import './Login.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(form);
      setMessage("Connexion réussie");
      navigate('/home');  
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion</h2>
        {message && <div className="alert">{message}</div>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          value={form.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
          value={form.password}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
