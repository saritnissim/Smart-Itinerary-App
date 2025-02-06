import { Itinerary } from "@shared/itinerary.interface";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as smartItineraryApi from "../api/smartItineraryApi";

// Define the interface for the component props
interface ItineraryCardProps {
  itinerary: Itinerary; // The `itinerary` prop is of type `Itinerary`
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary }) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  };

  // Initialize state based on the itinerary's isFavorite value
  const [isFavorite, setIsFavorite] = useState<boolean>(
    itinerary.isFavorite || false
  );

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    console.log("Itinerary changed:", itinerary);
    // When itinerary changes, update the favorite status
    setIsFavorite(itinerary.isFavorite || false);
  }, [itinerary]);

  const toggleFavorite = async () => {
    // Toggle the favorite state locally
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Send the updated favorite status to the backend
    try {
      await smartItineraryApi.updateFavoriteStatus(
        itinerary.id,
        newFavoriteStatus
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // Optionally revert the state if the API request fails
      setIsFavorite(isFavorite);
    }
  };

  return (
    <>
      <Card id="itinerary-card" key={itinerary.id}>
        <CardContent>
          <h4 style={{ marginBottom: "8px" }}>{itinerary.destination}</h4>
          <p style={{ marginBottom: "8px" }}>
            Date: {formatDate(itinerary.start_date)} -{" "}
            {formatDate(itinerary.end_date)}
          </p>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: "auto", marginRight: "auto" }}
            onClick={() => navigate(`/trip-details/${itinerary.id}`)}
          >
            View Details
          </Button>
          {/* Add to Favorites Button */}
          <IconButton
            onClick={toggleFavorite}
            color={isFavorite ? "secondary" : "default"}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default ItineraryCard;
