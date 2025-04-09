'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongList from '../components/SongList';
import Recorder from '../components/Recorder';
import Leaderboard from '../components/Leaderboard';

interface Song {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [userId] = useState(Math.random().toString(36).substring(2));

  useEffect(() => {
    axios.get('/api/songs').then((res) => setSongs(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Riddimz Karaoke</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <SongList songs={songs} onSelect={setSelectedSong} />
        </div>
        <div className="col-span-2">
          {selectedSong && <Recorder song={selectedSong} userId={userId} />}
        </div>
      </div>
      <Leaderboard />
    </div>
  );
}