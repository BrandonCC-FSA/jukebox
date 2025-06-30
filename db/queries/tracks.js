import db from "../client.js";

export const createTrack = async (trackName, trackDuration) => {
  const sql = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const {
    rows: [createdTrack],
  } = await db.query(sql, [trackName, trackDuration]);
  return createdTrack;
};

export const getAllTracks = async () => {
  const sql = `SELECT * FROM tracks ORDER BY name;`;
  const { rows } = await db.query(sql);
  return rows;
};

export const getTrackById = async (id) => {
  const sql = `SELECT * FROM tracks WHERE id = $1;`;
  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
};
