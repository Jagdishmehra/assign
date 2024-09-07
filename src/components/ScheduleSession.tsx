import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Session {
  id: string;
  start: string;
  end: string;
  participants: { name: string; email: string }[];
  isOneOnOne: boolean;
}

const ScheduledSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sessions');
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id} className="border p-4 mb-2 rounded shadow">
            <p><strong>Start:</strong> {new Date(session.start).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(session.end).toLocaleString()}</p>
            <p><strong>Participants:</strong> {session.participants.map(p => p.name).join(', ')}</p>
            <p><strong>Session Type:</strong> {session.isOneOnOne ? 'One-on-One' : 'Group'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledSessions;
