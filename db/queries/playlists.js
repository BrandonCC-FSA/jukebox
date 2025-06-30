import db from "../client.js";

export const getAllPlaylists = async () => {
  const sql = `SELECT * FROM playlists ORDER BY name;`;
  const { rows } = await db.query(sql);
  return rows;
};

export const getPlaylistById = async (id) => {
  const sql = `SELECT * FROM playlists WHERE id = $1;`;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
};

export const createPlaylist = async (playlistName, playlistDescription) => {
  const sql = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const {
    rows: [createdPlaylist],
  } = await db.query(sql, [playlistName, playlistDescription]);
  return createdPlaylist;
};
