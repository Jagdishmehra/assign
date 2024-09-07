import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);  
  const [selectedUser, setSelectedUser] = useState<string>('');  
  const [availability, setAvailability] = useState<any[]>([]);  
  const [sessions, setSessions] = useState<any[]>([]);  


  useEffect(() => {

    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    if (selectedUser) {
      const fetchAvailability = async () => {
        const response = await axios.get(`http://localhost:3000/api/availability/user/${selectedUser}`);
        setAvailability(response.data);
      };

      fetchAvailability();
    }
  }, [selectedUser]);


  const scheduleSession = async (slot: any) => {
    try {
      const sessionData = {
        user: selectedUser,
        start: slot.start,
        end: slot.end,
        attendees: ['admin@gmail.com'],  
        type: 'one-on-one',
      };

      const response = await axios.post('http://localhost:3000/api/sessions/schedule', sessionData);
      alert(response.data.message);
    } catch (error:any) {
      alert('Error scheduling session: ' + error.response.data.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>

      <label>Select User:</label>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="border px-2 py-1 mb-4">
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>

      <h3 className="text-xl mb-4">User Availability:</h3>
      {availability.length > 0 ? (
        <div>
          {availability.map((slot) => (
            <div key={slot.start} className="border p-4 mb-2">
              <p>Start: {new Date(slot.start).toLocaleString()}</p>
              <p>End: {new Date(slot.end).toLocaleString()}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2"
                onClick={() => scheduleSession(slot)}
              >
                Schedule Session
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No availability found for this user.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
