import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Leader {
  username: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    axios.get('/api/leaderboard').then((res) => setLeaders(res.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <ul>
        {leaders.map((leader, index) => (
          <li key={index} className="p-2 border-b">
            {leader.username}: {leader.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;