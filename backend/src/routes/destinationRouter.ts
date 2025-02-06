import {
  getDestinations,
  fetchDestinationbyId,
  fetchActivitiesByDestination,
} from "../controllers/destinationController";
const express = require("express");

const destinationRouter = express.Router();

destinationRouter.get("/", getDestinations);

destinationRouter.get("/:id", fetchDestinationbyId);

destinationRouter.get("/:id/activities", fetchActivitiesByDestination);
export default destinationRouter;
