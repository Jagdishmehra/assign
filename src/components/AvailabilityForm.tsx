import React, { useState } from 'react';

interface AvailabilitySlot {
  day: string;
  start: string;
  end: string;
  duration: number;
}

interface AvailabilityFormProps {
  userEmail: string;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ userEmail }) => {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [day, setDay] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);

  const handleAddAvailability = () => {
    const newSlot: AvailabilitySlot = {
      day,
      start,
      end,
      duration,
    };
    setAvailability([...availability, newSlot]);
    setDay('');
    setStart('');
    setEnd('');
  };

  const handleDeleteSlot = (index: number) => {
    const updatedAvailability = availability.filter((_, i) => i !== index);
    setAvailability(updatedAvailability);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Availability</h2>

      <div className="grid grid-cols-1 gap-4">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="p-2 border"
        >
          <option value="">Select Day</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="p-2 border"
        />
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="p-2 border"
        />

        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="p-2 border"
        >
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>

        </select>

        <button
          onClick={handleAddAvailability}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Availability
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-8">Your Availability</h2>
      <ul className="mt-4">
        {availability.length === 0 ? (
          <p>No availability slots added yet.</p>
        ) : (
          availability.map((slot, index) => (
            <li key={index} className="border p-2 mb-2">
              <p>
                <strong>{slot.day}</strong>: {slot.start} - {slot.end} ({slot.duration} minutes)
              </p>
              <button
                onClick={() => handleDeleteSlot(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AvailabilityForm;
