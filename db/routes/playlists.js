import express from "express";
import {
  getAllPlaylists,
  createPlaylist,
  getPlaylistById,
} from "../queries/playlists.js";
import {
  getPlaylistTracks,
  addTrackToPlaylist,
  checkTrackInPlaylist,
} from "../queries/playlists_tracks.js";
import { getTrackById } from "../queries/tracks.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const playlists = await getAllPlaylists();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const playlist = await createPlaylist(name, description);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to create playlist" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
});

router.get("/:id/tracks", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const tracks = await getPlaylistTracks(id);
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch playlist tracks" });
  }
});

router.post("/:id/tracks", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const playlistId = parseInt(req.params.id);
    if (isNaN(playlistId)) {
      return res.status(400).json({ error: "Invalid playlist ID format" });
    }

    const { trackId } = req.body;
    if (!trackId) {
      return res.status(400).json({ error: "trackId is required" });
    }

    const trackIdNum = parseInt(trackId);
    if (isNaN(trackIdNum)) {
      return res.status(400).json({ error: "Invalid track ID format" });
    }

    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const track = await getTrackById(trackIdNum);
    if (!track) {
      return res.status(400).json({ error: "Track does not exist" });
    }

    const existingTrack = await checkTrackInPlaylist(playlistId, trackIdNum);
    if (existingTrack) {
      return res.status(400).json({ error: "Track is already in playlist" });
    }

    const playlistTrack = await addTrackToPlaylist(playlistId, trackIdNum);
    res.status(201).json(playlistTrack);
  } catch (error) {
    res.status(500).json({ error: "Failed to add track to playlist" });
  }
});

export default router;
