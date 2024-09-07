import React, { useState } from 'react';
import AvailabilityForm from './components/AvailabilityForm';

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');

  const handleLogin = (email: string) => {
    setUserEmail(email);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">User Availability Input</h1>

      {!userEmail ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <p className="text-center">Logged in as: {userEmail}</p>
          <AvailabilityForm userEmail={userEmail} />
        </div>
      )}
    </div>
  );
};

const Login: React.FC<{ onLogin: (email: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Log In
      </button>
    </form>
  );
};

export default App;
