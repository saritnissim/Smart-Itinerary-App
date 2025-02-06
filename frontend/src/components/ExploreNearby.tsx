import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import * as smartItineraryApi from "../api/smartItineraryApi";
import ActivityCard from "./ActivityCard";
import Box from "@mui/material/Box"; // Correct import
import Button from "@mui/material/Button"; // Use MUI Button instead of HTML button

const ExploreNearby = ({
  destinationId,
  currentDate,
  itineraryId,
  refreshCalendar,
}) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      try {
        const places = await smartItineraryApi.getActivitiesByDestination(
          destinationId
        );
        setNearbyPlaces(places);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching nearby places:", error);
        setLoading(false);
      }
    };
    if (destinationId) {
      fetchNearbyPlaces();
    }
  }, [destinationId]);

  const handleClick = async (place) => {
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];
    const itineraryActivity = {
      id: `event_${Date.now()}`,
      itinerary_id: itineraryId,
      description: place.activity_name,
      activity_date: formattedCurrentDate,
      start_time: `${formattedCurrentDate}T00:00:00+00:00`, // Using +02:00 as the timezone
      end_time: `${formattedCurrentDate}T01:00:00+00:00`, // Using +02:00 as the timezone
    };
    try {
      const response = await smartItineraryApi.addItineraryItem(
        itineraryActivity
      );
      console.log("Response from createItineraryItem", response);
      refreshCalendar();
    } catch (error) {
      console.error("Error creating itinerary item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3>Explore Nearby</h3>
      <Grid container spacing={2} style={{ justifyContent: "center" }}>
        {nearbyPlaces.map((place) => (
          <Grid item key={place.id} xs={12} sm={6} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* Activity card */}
              <ActivityCard activity={place} />
              {/* Button below ActivityCard */}
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "8px" }}
                onClick={() => handleClick(place)} // Pass the place to handleClick
              >
                Add to Itinerary
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ExploreNearby;
