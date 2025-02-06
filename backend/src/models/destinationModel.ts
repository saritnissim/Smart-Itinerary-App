import db from "../config/db-setup";

export const fetchDestinations = async () => {
  try {
    const destinations = await db("destinations").select("*");
    return destinations;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw new Error("Failed to fetch destinaations.");
  }
};

export const getDestinationById = async (id: string) => {
  try {
    const destination = await db("destinations").where("id", id).first();
    return destination;
  } catch (error) {
    console.error("Error fetching destination by id:", error);
    throw new Error("Failed to fetch destination by id.");
  }
};

export const getActivitiesByDestination = async (destinationId: string) => {
  try {
    const activities = await db("activities").where(
      "destination_id",
      destinationId
    );
    return activities;
  } catch (error) {
    console.error("Error fetching activities by destination:", error);
    throw new Error("Failed to fetch activities by destination.");
  }
};
