import { Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as smartItineraryApi from "../api/smartItineraryApi";

const ExplorePage = () => {
  const [destinations, setDestinations] = useState([]);

  // Fetch destinations data from the API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await smartItineraryApi.getDestinations();
        console.log("Destinations:", response);
        setDestinations(response); // Store the data in state
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations(); // Call the function when the component mounts
  }, []); // Empty dependency array means this will run once on component mount

  return (
    <>
      <h4> Explore Destinations </h4>

      {/* Flexbox container */}
      <div id="explore-flexbox">
        {destinations.map((destination) => (
          <Link
            id="destination-link"
            to={`/destination/${destination.id}`}
            key={destination.id}
          >
            <Card>
              <CardMedia
                component="img"
                alt={destination.name}
                height="140"
                image={`/images/${destination.image_url}`}
              />
              <CardContent>
                <h6>{destination.city_name}</h6>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ExplorePage;
