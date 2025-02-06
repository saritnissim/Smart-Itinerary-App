import { Container, Box } from "@mui/material";
import DayCalendar from "./DayCalendar";
import { useParams } from "react-router-dom";
import * as smartItineraryApi from "../api/smartItineraryApi";
import { useEffect, useState } from "react";
import ExploreNearby from "./ExploreNearby";

function formatDate(dateString: string, daysToAdd = 0) {
  const dateObj = new Date(dateString); // Convert string to Date object

  // Extract year, month, and day
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Get month (0-based, so add 1) and ensure two digits
  const day = String(dateObj.getDate() + daysToAdd).padStart(2, "0"); // Ensure day has two digits

  // Return formatted date in yyyy-mm-dd format
  return `${year}-${month}-${day}`;
}

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date(startDate)); // Initialize with a Date object
  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const itineraryDetails = await smartItineraryApi.getItinerary(id);
        const { destination, destinationId, start_date, end_date } =
          itineraryDetails;

        if (destinationId && destination && start_date && end_date) {
          setDestinationId(destinationId);
          setDestination(destination);
          setStartDate(formatDate(start_date));
          setEndDate(formatDate(end_date, 1));
        } else {
          setError("Error: Missing trip details!");
        }
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
        setError("Error fetching itinerary details");
      }
    };

    fetchItinerary();
  }, [id]);

  const handleDatesSet = (arg) => {
    console.log("Dates set:", arg);
    const newCurrentDate = arg.view.currentStart; // Get the current date being viewed (start of the current view)

    // Update state only if the currentDate is different
    if (newCurrentDate.getTime() !== currentDate?.getTime()) {
      setCurrentDate(newCurrentDate); // Update state with the new date
    }
  };

  const refreshCalendar = () => {
    setCurrentDate(new Date()); // Force a re-render by updating the currentDate
  };

  // Display error if any
  if (error) {
    return <div>{error}</div>;
  }

  // Make sure destination, startDate, and endDate exist
  if (!destinationId || !destination || !startDate || !endDate) {
    return <div>Loading...</div>;
  }

  const isPastTrip = new Date(endDate) < new Date();

  return (
    <>
      <h1>Your Itinerary for {destination}</h1>
      <h3>
        {startDate} to {endDate}
      </h3>

      {/* Main Content Section */}
      <Container id="homepage-main-content">
        {/* Day Schedule Section */}
        <Box id="homepage-day-schedule" className="homepage-box">
          <DayCalendar
            itineraryId={id}
            startDate={formatDate(startDate)}
            endDate={formatDate(endDate, 1)}
            handleDatesSet={handleDatesSet}
          />
        </Box>

        {/* Explore Nearby Section */}
        {!isPastTrip && (
          <Box id="homepage-explore" className="homepage-box">
            <ExploreNearby
              destinationId={destinationId}
              currentDate={currentDate}
              itineraryId={id}
              refreshCalendar={refreshCalendar}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default TripDetails;
