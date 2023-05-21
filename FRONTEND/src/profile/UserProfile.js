import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getMovieDetails,
  getUserBooking,
  getUserDetails,
} from "../api-helper/api-helper";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";


const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((error) => console.log(error));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((error) => console.log(error));
  }, []);

  console.log(bookings);
 

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <Box width={"100%"} display={"flex"}>
      <Fragment>
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name: {user.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {user.email}
            </Typography>
          </Box>
        )}
        {bookings &&
          (
            <Box width={"70%"} display={"flex"} flexDirection={"column"}>
              <Typography
                variant="h3"
                fontFamily={"verdana"}
                textAlign={"center"}
                padding={2}
              >
                {" "}
                Bookings{" "}
              </Typography>
              <Box
                margin={"auto"}
                display={"flex"}
                flexDirection={"column"}
                width={"80%"}
              >
                <List>
                  {bookings.map((booking, index) => (
                    <ListItem
                      sx={{
                        bgcolor: "#00d386",
                        color: "white",
                        textAlign: "center",
                        margin: 1,
                      }}
                    >
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left", color: "black" }}
                      >
                        Movie Title: {booking.movie}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Seat: {booking.seatNumber}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Date: {new Date(booking.date).toDateString()}
                      </ListItemText>
                      <IconButton
                        onClick={() => handleDelete(booking._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
