import { ItineraryItem } from "@shared/itineraryItem.interface";
import axios from "axios";
import { Itinerary } from "@shared/itinerary.interface";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API URL:", apiUrl);
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/register", { email, password });
    return response;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const getItineraryItems = async (itineraryId: string) => {
  try {
    const response = await apiClient.get(`/itineraries/${itineraryId}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching itinerary items:", error);
    return null;
  }
};

export const patchItineraryItem = async (updatedItem: ItineraryItem) => {
  try {
    const response = await apiClient.patch(
      `/itineraries/items/${updatedItem.id}`,
      updatedItem
    );
    console.log("Event updated:", response.data);
  } catch (error) {
    console.error("Error updating itinerary item:", error);
    return null;
  }
};

export const addItineraryItem = async (newItem: ItineraryItem) => {
  try {
    console.log("Adding event:", newItem);
    const itineraryId = newItem.itinerary_id;
    const response = await apiClient.post(
      `/itineraries/${itineraryId}/items`,
      newItem
    );
    console.log("Event added:", response.data);
  } catch (error) {
    console.error("Error adding itinerary item:", error);
    return null;
  }
};

export const deleteItineraryItem = async (itemId: string) => {
  try {
    const response = await apiClient.delete(`/itineraries/items/${itemId}`);
    return response;
  } catch (error) {
    // Log error for debugging
    console.error("Error deleting itinerary item:", error);

    // Throw the error to be handled by the calling function
    throw new Error("Failed to delete itinerary item.");
  }
};

export const createItinerary = async (itinerary: Itinerary) => {
  try {
    const response = await apiClient.post("/itineraries/new", {
      ...itinerary,
      user_id: localStorage.getItem("userId"),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating itinerary:", error);
    return null;
  }
};

export const getUpcomingTrips = async () => {
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  if (!userId) {
    throw new Error("User ID not found in localStorage");
  }

  try {
    const response = await apiClient.post("/itineraries/upcoming", {
      userId,
    });
    return response.data; // return the list of upcoming trips
  } catch (error) {
    console.error("Error fetching upcoming trips:", error);
    throw error;
  }
};

export const getPastTrips = async () => {
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  if (!userId) {
    throw new Error("User ID not found in localStorage");
  }

  try {
    const response = await apiClient.post("/itineraries/past", {
      userId,
    });
    console.log("Past trips:", response);
    return response.data; // return the list of past trips
  } catch (error) {
    console.error("Error fetching past trips:", error);
    throw error;
  }
};

export const getItinerary = async (itineraryId: string) => {
  try {
    const response = await apiClient.get(`/itineraries/${itineraryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return null;
  }
};

export const getDestinations = async () => {
  try {
    const response = await apiClient.get("/destinations");
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return null;
  }
};

export const getDestinationById = async (id: string) => {
  try {
    const response = await apiClient.get(`/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching destination by id:", error);
    return null;
  }
};

export const getActivitiesByDestination = async (destinationId: string) => {
  try {
    const response = await apiClient.get(
      `/destinations/${destinationId}/activities`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching activities by destination:", error);
    return null;
  }
};

export const updateFavoriteStatus = async (
  itineraryId: number,
  isFavorite: boolean
) => {
  try {
    const response = await apiClient.patch(
      `/itineraries/${itineraryId}/favorite`,
      {
        isFavorite,
      }
    );
    console.log("Favorite status updated:", response.data);
  } catch (error) {
    console.error("Error updating favorite status:", error);
    throw new Error("Failed to update favorite status.");
  }
};

export const getFavoriteItineraries = async (userId) => {
  try {
    const response = await apiClient.post("/itineraries/favorites", {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite itineraries:", error);
    throw new Error("Failed to fetch favorite itineraries.");
  }
};

export const changePassword = async (userId, newPassword: string) => {
  try {
    await apiClient.put("/change-password", { userId, newPassword });
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error("Failed to change password.");
  }
};
