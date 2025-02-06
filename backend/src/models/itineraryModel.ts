import { Itinerary } from "@shared/itinerary.interface";
import db from "../config/db-setup";
import { ItineraryItem } from "@shared/itineraryItem.interface";

const _getItinerariesByDate = async (id: string, comparison: string) => {
  const currentDate = new Date();
  return db("itineraries as i")
    .join("destinations as d", "i.destination_id", "d.id")
    .select(
      "i.id",
      "i.start_date",
      "i.end_date",
      "i.isFavorite",
      "d.city_name as destination"
    )
    .where("i.user_id", id)
    .andWhere("i.start_date", comparison, currentDate)
    .orderBy("i.start_date", "asc");
};

export const getUpcomingItineraries = async (id: string) => {
  try {
    const upcomingItineraries = await _getItinerariesByDate(id, ">=");
    return upcomingItineraries;
  } catch (error) {
    console.error("Error fetching upcoming itineraries:", error);
    throw new Error("Failed to fetch upcoming itineraries.");
  }
};

export const getPastItineraries = async (id: string) => {
  try {
    const pastItineraries = await _getItinerariesByDate(id, "<");
    return pastItineraries;
  } catch (error) {
    console.error("Error fetching past itineraries:", error);
    throw new Error("Failed to fetch past itineraries.");
  }
};

export const getItineraryItems = async (itineraryId: string) => {
  try {
    const itineraryItems = await db("itinerary_items").where(
      "itinerary_id",
      itineraryId
    );
    return itineraryItems;
  } catch (error) {
    console.error("Error fetching itinerary items:", error);
    throw new Error("Failed to fetch itinerary items.");
  }
};

//Insert itinerary item
export const insertItineraryItem = async (itineraryItem: ItineraryItem) => {
  try {
    const [id] = await db("itinerary_items")
      .insert(itineraryItem)
      .returning("id");
    return id;
  } catch (error) {
    console.error("Error inserting itinerary item:", error);
    throw new Error("Failed to insert itinerary item.");
  }
};

//Update itinerary item
export const updateItineraryItem = async (itineraryItem: ItineraryItem) => {
  try {
    await db("itinerary_items")
      .where("id", itineraryItem.id)
      .update(itineraryItem);
    return itineraryItem;
  } catch (error) {
    console.error("Error updating itinerary item:", error);
    throw new Error("Failed to update itinerary item.");
  }
};

export const deleteItineraryItemById = async (itemId: string) => {
  try {
    const deletedRows = await db("itinerary_items").where("id", itemId).del();

    // If no rows are deleted, return false to indicate failure
    if (deletedRows === 0) {
      return false;
    }
    return true; // Successfully deleted
  } catch (error) {
    console.error("Error deleting itinerary item:", error);
    throw new Error("Failed to delete itinerary item.");
  }
};

export const createItinerary = async (itinerary: Itinerary) => {
  try {
    console.log("Creating itinerary:", itinerary);
    const [id] = await db("itineraries").insert(itinerary).returning("id");
    return id;
  } catch (error) {
    console.error("Error creating itinerary:", error);
    throw new Error("Failed to create itinerary.");
  }
};

export const getItinerary = async (id: string) => {
  console.log("Fetching itinerary by id:", id);
  try {
    const itinerary = await db("itineraries as i")
      .join("destinations as d", "i.destination_id", "d.id")
      .where("i.id", id)
      .select(
        "i.id",
        "i.start_date",
        "i.end_date",
        "i.destination_id as destinationId",
        "d.city_name as destination"
      )
      .first();

    console.log("Itinerary:", itinerary);
    return itinerary;
  } catch (error) {
    console.error("Error fetching itinerary by id:", error);
    throw new Error("Failed to fetch itinerary by id.");
  }
};

export const updateFavoriteStatus = async (
  itineraryId: number,
  isFavorite: boolean
) => {
  try {
    // Update the favorite status in the database
    const updatedRows = await db("itineraries")
      .where("id", itineraryId)
      .update({ isFavorite });

    // Return true if a row was updated, else false
    return updatedRows > 0;
  } catch (error) {
    console.error("Error updating favorite status:", error);
    throw new Error("Database error while updating favorite status");
  }
};

// Function to get all favorite itineraries for a specific user
export const getFavorites = async (userId: number) => {
  try {
    return await db("itineraries")
      .where("user_id", userId)
      .andWhere("isFavorite", true)
      .orderBy("start_date", "asc");
  } catch (error) {
    console.error("Error fetching favorite itineraries:", error);
    throw new Error("Failed to retrieve favorite itineraries");
  }
};
