import { useEffect, useState } from "react";
import ItineraryCard from "./ItineraryCard";
import { Itinerary } from "@shared/itinerary.interface";
import * as smartItineraryApi from "../api/smartItineraryApi";
import Grid from "@mui/material/Grid2";

const PastTrips = () => {
  const [trips, setTrips] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchPastTrips = async () => {
      try {
        const trips = await smartItineraryApi.getPastTrips();
        setTrips(trips);
        setLoading(false); // Set loading to false after the data is fetched
      } catch (error) {
        console.error("Error fetching past trips:", error);
        setError("Failed to fetch trips"); // Set error state if the request fails
        setLoading(false); // Also stop loading if there's an error
      }
    };

    fetchPastTrips(); // Call the async function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Render loading, error, or TripCards based on the state
  if (loading) {
    return <p>Loading trips...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (trips.length === 0) {
    return <p>No past trips</p>;
  }

  return (
    <>
      <h3 style={{ marginBottom: 16, textAlign: "left" }}>Past Trips</h3>
      <Grid container spacing={2}>
        {trips.map((trip) => (
          <ItineraryCard key={trip.id} itinerary={trip} /> // Pass each trip as prop to ItineraryCard
        ))}
      </Grid>
    </>
  );
};

export default PastTrips;
