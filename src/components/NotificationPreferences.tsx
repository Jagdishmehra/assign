import React, { useState } from 'react';
import axios from 'axios';

const NotificationPreferences: React.FC = () => {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/user/preferences', { email, sms });
      alert('Preferences updated');
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
      <label>
        <input type="checkbox" checked={email} onChange={() => setEmail(!email)} /> Email Notifications
      </label>
      <label>
        <input type="checkbox" checked={sms} onChange={() => setSms(!sms)} /> SMS Notifications
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save Preferences</button>
    </form>
  );
};

export default NotificationPreferences;
