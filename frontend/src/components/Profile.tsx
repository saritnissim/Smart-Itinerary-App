import { useState, useEffect } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import * as smartItineraryApi from "../api/smartItineraryApi";
import { useAuth } from "../auth/useAuth";
import ItineraryCard from "./ItineraryCard";

const ProfilePage = () => {
  const [password, setPassword] = useState(""); // State for new password
  const [favorites, setFavorites] = useState([]); // State for favorites
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  //   const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await smartItineraryApi.getFavoriteItineraries(
          userId
        );
        setFavorites(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to fetch favorites");
      }
    };

    fetchFavorites();
  }, [userId]);

  const handlePasswordChange = async () => {
    try {
      await smartItineraryApi.changePassword(userId, password);
      setSuccess("Password successfully changed!");
      setPassword(""); // Reset password field
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Error changing password.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4">Profile</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}

        <Box sx={{ marginTop: 2 }}>
          <h6>Change Password</h6>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePasswordChange}
            fullWidth
          >
            Change Password
          </Button>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <h6>Your Favorites</h6>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((favorite, index) => (
                <li key={index}>
                  <ItineraryCard itinerary={favorite} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorites added yet.</p>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
