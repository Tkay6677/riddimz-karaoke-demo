import React, { useState, useRef } from 'react';
import axios from 'axios';

interface Song {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
}

interface RecorderProps {
  song: Song;
  userId: string;
}

const Recorder: React.FC<RecorderProps> = ({ song, userId }) => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      axios.post('/api/performances', {
        userId,
        songId: song.id,
        audioUrl: url,
        score: Math.floor(Math.random() * 100),
      });
    };

    mediaRecorderRef.current.start();
    setRecording(true);
    audioRef.current?.play();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    audioRef.current?.pause();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{song.title} - {song.artist}</h2>
      <audio ref={audioRef} src={song.audioUrl} controls className="w-full mb-4" />
      <div className="flex space-x-4">
        <button
          onClick={startRecording}
          disabled={recording}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Stop Recording
        </button>
      </div>
      {audioUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Your Performance:</h3>
          <audio src={audioUrl} controls className="w-full" />
        </div>
      )}
    </div>
  );
};

export default Recorder;