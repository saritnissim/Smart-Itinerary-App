import {
  getPastItineraries,
  getUpcomingItineraries,
  getItineraryItems,
  insertItineraryItem,
  updateItineraryItem,
  deleteItineraryItemById,
  createItinerary,
  getItinerary,
  updateFavoriteStatus,
  getFavorites,
} from "../models/itineraryModel";
import { Request, Response } from "express";
import { ItineraryItem } from "../../../shared/types/itineraryItem.interface";

export const fetchUpcomingItineraries = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const upcomingItineraries = await getUpcomingItineraries(userId);
    res.status(200).json(upcomingItineraries);
  } catch (error) {
    res.status(400).json({ message: "Error fetching itineraries" });
  }
};

export const fetchPastItineraries = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const pastItineraries = await getPastItineraries(userId);
    res.status(200).json(pastItineraries);
  } catch (error) {
    res.status(400).json({ message: "Error fetching itineraries" });
  }
};

export const fetchItineraryItems = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const itineraryItems = await getItineraryItems(id);
    res.status(200).json(itineraryItems);
  } catch (error) {
    res.status(400).json({ message: "Error fetching itinerary" });
  }
};

export const addItineraryItem = async (req: Request, res: Response) => {
  const { id, itinerary_id, description, activity_date, start_time, end_time } =
    req.body;
  const newItineraryItem: ItineraryItem = {
    id,
    itinerary_id,
    description,
    activity_date,
    start_time,
    end_time,
  };
  try {
    const response = await insertItineraryItem(newItineraryItem);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: "Error adding itinerary item" });
  }
};

export const patchItineraryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { itinerary_id, description, activity_date, start_time, end_time } =
    req.body;
  const updatedItineraryItem: ItineraryItem = {
    id,
    itinerary_id,
    description,
    activity_date,
    start_time,
    end_time,
  };
  try {
    const response = await updateItineraryItem(updatedItineraryItem);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: "Error updating itinerary item" });
  }
};

export const deleteItineraryItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Attempt to delete the itinerary item
    const isDeleted = await deleteItineraryItemById(id);

    if (isDeleted) {
      // If the item was successfully deleted, return 204 No Content
      res.status(200).json({ message: "Item was successfully deleted" });
    } else {
      // If no rows were deleted (item not found), return 404 Not Found
      res.status(404).json({ message: "Itinerary item not found." });
    }
  } catch (error) {
    // Catch unexpected errors (e.g., database issues)
    console.error("Error deleting itinerary item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNewItinerary = async (req: Request, res: Response) => {
  const { destination_id, user_id, start_date, end_date } = req.body;
  const newItinerary = {
    destination_id,
    user_id,
    start_date,
    end_date,
  };
  try {
    // Attempt to create a new itinerary
    const response = await createItinerary(newItinerary);

    // If the itinerary was successfully created, return 201 Created
    res.status(201).json(response);
  } catch (error) {
    // Catch unexpected errors (e.g., database issues)
    console.error("Error creating new itinerary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getItineraryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Fetching itinerary by id:", id);

  try {
    const itinerary = await getItinerary(id);
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(400).json({ message: "Error fetching itinerary" });
  }
};

export const toggleFavoriteStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isFavorite } = req.body;

  const itineraryId = parseInt(id);
  try {
    // Fetch the itinerary by ID
    const updated = await updateFavoriteStatus(itineraryId, isFavorite);

    if (!updated) {
      res.status(404).json({ message: "Itinerary not found" });
      return;
    }

    // Return the updated itinerary
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating favorite status" });
  }
};

export const fetchFavoriteItineraries = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const favoriteItineraries = await getFavorites(userId);
    res.status(200).json(favoriteItineraries);
  } catch (error) {
    res.status(400).json({ message: "Error fetching favorite itineraries" });
  }
};
