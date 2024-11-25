import axios from "axios";

async function addTrackToSpotifyFavourite(id: string[]) {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/tracks?ids=${id.join(",")}`,
      null, // Brak body w PUT
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.error("Error adding track to Spotify favourites:", err);
    throw err;
  }
}

export default addTrackToSpotifyFavourite;