import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, songId, audioUrl, score } = req.body;
    db.run(
      `INSERT INTO performances (userId, songId, audioUrl, score) VALUES (?, ?, ?, ?)`,
      [userId, songId, audioUrl, score],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        db.run(
          `INSERT OR REPLACE INTO users (id, username, score) VALUES (?, ?, COALESCE((SELECT score FROM users WHERE id = ?) + ?, ?))`,
          [userId, `User_${userId.slice(0, 8)}`, userId, score, score],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ id: this.lastID });
          }
        );
      }
    );
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}