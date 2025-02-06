import { useEffect, useState } from "react";
import * as smartItineraryApi from "../api/smartItineraryApi";
import { Itinerary } from "@shared/itinerary.interface";
import ItineraryCard from "./ItineraryCard";
import Grid from "@mui/material/Grid2";

const UpcomingTrips = () => {
  const [trips, setTrips] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUpcomingTrips = async () => {
      try {
        const trips = await smartItineraryApi.getUpcomingTrips();
        setTrips(trips);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching upcoming trips:", error);
        setLoading(false);
      }
    };

    fetchUpcomingTrips();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <p>Loading trips...</p>;
  }

  if (trips.length === 0) {
    return <p>No upcoming trips</p>;
  }

  return (
    <>
      <h3 style={{ marginBottom: 16, textAlign: "left" }}>Upcoming Trips</h3>
      <Grid container spacing={2}>
        {trips.map((trip) => (
          <ItineraryCard key={trip.id} itinerary={trip} />
        ))}
      </Grid>
    </>
  );
};

export default UpcomingTrips;
