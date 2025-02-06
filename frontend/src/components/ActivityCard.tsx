import { Card, CardContent, CardMedia } from "@mui/material";
const ActivityCard = ({ activity }) => {
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          alt={activity.activity_name}
          image={activity.image_url}
        />
        <CardContent>
          <h6>{activity.activity_name}</h6>
          <p>{activity.description}</p>
        </CardContent>
      </Card>
    </>
  );
};
export default ActivityCard;
