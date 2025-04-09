import React from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
}

interface SongListProps {
  songs: Song[];
  onSelect: (song: Song) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onSelect }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Song Library</h2>
      <ul>
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelect(song)}
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;