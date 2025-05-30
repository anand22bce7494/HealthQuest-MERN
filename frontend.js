//front-end
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', weight: '', goal: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users', form);
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
    setForm({ name: '', age: '', weight: '', goal: '' });
  };

  return (
    <div>
      <h1>HealthQuest</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
        <input placeholder="Weight" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} />
        <input placeholder="Goal" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.age} yrs - {user.weight} kg - Goal: {user.goal}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;