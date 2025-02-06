const express = require("express");
const itineraryController = require("../controllers/itineraryController");

const itineraryRouter = express.Router();

// Get upcoming and past itineraries
itineraryRouter.post("/upcoming", itineraryController.fetchUpcomingItineraries);
itineraryRouter.post("/past", itineraryController.fetchPastItineraries);

// Create a new itinerary
itineraryRouter.post("/new", itineraryController.createNewItinerary);

//Itinerary Functions
itineraryRouter.get("/:id", itineraryController.getItineraryById);
itineraryRouter.patch(
  "/:id/favorite",
  itineraryController.toggleFavoriteStatus
);
itineraryRouter.post(
  "/favorites",
  itineraryController.fetchFavoriteItineraries
);

// Itinerary items (adding, updating, deleting)
itineraryRouter.post("/:id/items", itineraryController.addItineraryItem);
itineraryRouter.patch("/items/:id", itineraryController.patchItineraryItem);
itineraryRouter.delete("/items/:id", itineraryController.deleteItineraryItem);
itineraryRouter.get("/:id/items", itineraryController.fetchItineraryItems);

export default itineraryRouter;
