import {
  fetchDestinations,
  getDestinationById,
  getActivitiesByDestination,
} from "../models/destinationModel";
import { Request, response, Response } from "express";

export const getDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await fetchDestinations();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(400).json({ message: "Error getting destinations" });
  }
};

export const fetchDestinationbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const destination = await getDestinationById(id);
    res.status(200).json(destination);
  } catch (error) {
    res.status(400).json({ message: "Error getting destination" });
  }
};

export const fetchActivitiesByDestination = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const activities = await getActivitiesByDestination(id);
    res.status(200).json(activities);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error getting activities by destination" });
  }
};
