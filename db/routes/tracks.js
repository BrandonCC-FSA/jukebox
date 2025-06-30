import express from "express";
import { getAllTracks, getTrackById } from "../queries/tracks.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tracks = await getAllTracks();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const track = await getTrackById(id);
    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch track" });
  }
});

export default router;
