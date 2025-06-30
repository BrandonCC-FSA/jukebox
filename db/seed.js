import db from "#db/client";
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  console.log("Creating playlists...");
  const rockPlaylist = await createPlaylist(
    "Rock Classics",
    "The greatest rock anthems of all time"
  );
  const popPlaylist = await createPlaylist(
    "Pop Hits",
    "Chart-topping pop songs that everyone loves"
  );
  const jazzPlaylist = await createPlaylist(
    "Jazz Standards",
    "Timeless jazz classics from the masters"
  );
  const countryPlaylist = await createPlaylist(
    "Country Roads",
    "Best country songs for road trips and good times"
  );
  const hiphopPlaylist = await createPlaylist(
    "Hip-Hop Beats",
    "Hard-hitting hip-hop tracks with incredible flow"
  );
  const alternativePlaylist = await createPlaylist(
    "Alternative Rock",
    "Indie and alternative rock for the discerning listener"
  );
  const electronicPlaylist = await createPlaylist(
    "Electronic Vibes",
    "Pulsing electronic beats for dancing and focus"
  );
  const classicalPlaylist = await createPlaylist(
    "Classical Masterpieces",
    "Beautiful orchestral works from history's greatest composers"
  );
  const bluesPlaylist = await createPlaylist(
    "Blues Legends",
    "Soulful blues tracks that tell stories of life"
  );
  const workoutPlaylist = await createPlaylist(
    "Workout Motivation",
    "High-energy tracks to power through your workout"
  );
  console.log("Playlists created!");

  console.log("Creating tracks...");
  const track1 = await createTrack("Bohemian Rhapsody", 355000);
  const track2 = await createTrack("Sweet Child O' Mine", 356000);
  const track3 = await createTrack("Stairway to Heaven", 482000);
  const track4 = await createTrack("Hotel California", 391000);
  const track5 = await createTrack("Billie Jean", 294000);
  const track6 = await createTrack("Shape of You", 233000);
  const track7 = await createTrack("Blinding Lights", 200000);
  const track8 = await createTrack("Watermelon Sugar", 174000);
  const track9 = await createTrack("Take Five", 324000);
  const track10 = await createTrack("All of Me", 244000);
  const track11 = await createTrack("Blue Moon", 189000);
  const track12 = await createTrack("Sweet Caroline", 203000);
  const track13 = await createTrack("Old Town Road", 113000);
  const track14 = await createTrack("Lose Yourself", 326000);
  const track15 = await createTrack("HUMBLE.", 177000);
  const track16 = await createTrack("Titanium", 245000);
  const track17 = await createTrack("Levels", 202000);
  const track18 = await createTrack("Smells Like Teen Spirit", 301000);
  const track19 = await createTrack("Creep", 238000);
  const track20 = await createTrack("The Thrill Is Gone", 315000);
  console.log("Tracks created!");

  console.log("Linking tracks to playlists...");
  await createPlaylistTrack(rockPlaylist.id, track1.id);
  await createPlaylistTrack(rockPlaylist.id, track2.id);
  await createPlaylistTrack(rockPlaylist.id, track3.id);
  await createPlaylistTrack(rockPlaylist.id, track4.id);
  await createPlaylistTrack(popPlaylist.id, track5.id);
  await createPlaylistTrack(popPlaylist.id, track6.id);
  await createPlaylistTrack(popPlaylist.id, track7.id);
  await createPlaylistTrack(popPlaylist.id, track8.id);
  await createPlaylistTrack(jazzPlaylist.id, track9.id);
  await createPlaylistTrack(jazzPlaylist.id, track10.id);
  await createPlaylistTrack(jazzPlaylist.id, track11.id);
  await createPlaylistTrack(countryPlaylist.id, track12.id);
  await createPlaylistTrack(countryPlaylist.id, track13.id);
  await createPlaylistTrack(hiphopPlaylist.id, track14.id);
  await createPlaylistTrack(hiphopPlaylist.id, track15.id);
  await createPlaylistTrack(electronicPlaylist.id, track16.id);
  await createPlaylistTrack(electronicPlaylist.id, track17.id);
  await createPlaylistTrack(alternativePlaylist.id, track18.id);
  await createPlaylistTrack(alternativePlaylist.id, track19.id);
  await createPlaylistTrack(bluesPlaylist.id, track20.id);
  await createPlaylistTrack(workoutPlaylist.id, track14.id);
  await createPlaylistTrack(workoutPlaylist.id, track16.id);
  await createPlaylistTrack(workoutPlaylist.id, track2.id);

  console.log("Playlist-track relationships created!");
}
