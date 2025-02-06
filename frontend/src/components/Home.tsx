import { Button, Container } from "@mui/material";
import UpcomingTrips from "./UpcomingTrips";
import CreateTripModal from "./CreateTripModal";
import { useState } from "react";

const Home = () => {
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  return (
    <>
      {/* Welcome Section */}
      <Container id="welcome-section">
        <h2 style={{ textAlign: "left" }}>
          Here are your upcoming trips. Start planning or explore your
          adventures!
        </h2>

        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Create a New Trip
        </Button>
      </Container>

      {/* Create Trip Modal */}
      <CreateTripModal
        open={openModal}
        onClose={() => setOpenModal(false)} // Close the modal
      />

      {/* Upcoming Trips Section */}
      <UpcomingTrips />
    </>
  );
};

export default Home;
