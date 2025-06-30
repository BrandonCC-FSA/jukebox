import db from "../client.js";

export const getPlaylistTracks = async (playlistId) => {
  const sql = `
    SELECT t.* 
    FROM tracks t
    JOIN playlists_tracks pt ON t.id = pt.track_id
    WHERE pt.playlist_id = $1
    ORDER BY t.name;
  `;
  const { rows } = await db.query(sql, [playlistId]);
  return rows;
};

export const addTrackToPlaylist = async (playlistId, trackId) => {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
};

export const checkTrackInPlaylist = async (playlistId, trackId) => {
  const sql = `
    SELECT * FROM playlists_tracks 
    WHERE playlist_id = $1 AND track_id = $2;
  `;
  const {
    rows: [track],
  } = await db.query(sql, [playlistId, trackId]);
  return track;
};
