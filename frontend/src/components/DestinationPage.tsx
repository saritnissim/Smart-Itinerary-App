import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { Card, CardContent, CardMedia, Button } from "@mui/material";
import * as smartItineraryApi from "../api/smartItineraryApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DestinationPage = () => {
  const { id } = useParams<{ id: string }>();

  // State for destination and activities
  const [destination, setDestination] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch destination data and activities from the backend
  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const destination = await smartItineraryApi.getDestinationById(id);
        setDestination(destination);

        const activities = await smartItineraryApi.getActivitiesByDestination(
          id
        );
        setActivities(activities);
      } catch (error) {
        console.error("Error fetching destination data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchDestinationData();
  }, [id]);

  // If still loading, show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    lazyLoad: "ondemand", // Lazy load images
    dots: true, // Enable dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 2, // Number of slides to scroll at once
  };

  return (
    <>
      <h2>Destination: {destination.city_name}</h2>
      <img
        src={`/images/${destination.image_url}`}
        alt={destination.city_name}
        style={{ width: "30%" }}
      />
      {/* Blurb about the destination */}
      <p>{destination.blurb}</p>

      {/* Carousel for top activities */}
      <h6> Things To Do:</h6>

      <div className="slider-container">
        <Slider {...sliderSettings}>
          {activities.map((activity) => (
            <div key={activity.id}>
              <Card sx={{ width: 300, height: 400 }}>
                <CardMedia
                  component="img"
                  alt={activity.activity_name}
                  height="200"
                  image={activity.image_url}
                />
                <CardContent>
                  <h6>{activity.activity_name}</h6>
                  <p>{activity.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      {/* Button to create itinerary */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button variant="contained" color="primary">
          Create a {destination.city_name} Itinerary
        </Button>
      </div>
    </>
  );
};

export default DestinationPage;
