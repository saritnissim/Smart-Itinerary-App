import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as smartItineraryApi from "../api/smartItineraryApi";
import { Itinerary } from "@shared/itinerary.interface";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const CreateTripModal = ({ open, onClose }) => {
  const [destinationId, setDestinationId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destinations, setDestinations] = useState([]);

  const navigate = useNavigate();
  const { userId } = useAuth();

  // Fetch destinations from the database when the modal opens
  useEffect(() => {
    if (open) {
      const fetchDestinations = async () => {
        try {
          const fetchedDestinations = await smartItineraryApi.getDestinations();
          setDestinations(fetchedDestinations);
        } catch (err) {
          console.error("Error fetching destinations:", err);
        }
      };

      fetchDestinations();
    }
  }, [open]);

  const handleCreateTrip = async () => {
    try {
      const newTrip: Itinerary = {
        user_id: userId, // Assuming user_id is 1 for now
        destination_id: destinationId, // Use destination_id
        start_date: startDate,
        end_date: endDate,
      };

      const createdTrip = await smartItineraryApi.createItinerary(newTrip);
      onClose(); // Close the modal after creating the trip
      navigate(`/trip-details/${createdTrip.id}`);
    } catch (err) {
      console.error("Error creating trip:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Trip</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Destination</InputLabel>
          <Select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            label="Destination"
          >
            {destinations.map((dest) => (
              <MenuItem key={dest.id} value={dest.id}>
                {dest.city_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="date"
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateTrip} color="primary">
          Create Trip
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTripModal;
