import axios from "axios";
export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/users/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((error) => console.log(error));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occured");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    console.log("Unexpected Error Occured");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios
    .get(`/movie/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((error) => console.log(error));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/users/bookings/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = axios
    .delete(`/booking/${id}`)
    .catch((error) => console.log(error));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/users/${id}`)
    .catch((error) => console.log(error));

    if(res.status !== 200){
      return console.log("unexpected Error");
    }

    const resData = await res.data;
    return resData;
};

export const addMovie = async(data) => {
  const res = await axios.post("/movie",{
    title: data.title,
    description: data.description,
    releaseDate: data.releaseDate,
    posterUrl: data.posterUrl,
    featured: data.featured,
    actors: data.actors,
    admin: localStorage.getItem("adminId"),
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .catch((error)=>console.log(error));

  if(res.status !==201){
    return console.log("Unexpected Error Occured");
  }

  const resData = await res.data;
  return resData;
};


export const getAdminById = async() => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios.get(`/admin/${adminId}`).catch((error)=>console.log(error));

  if(res.status !== 200){
    return console.log("unexpected Error");
  }

  const resData = await res.data;
  return resData;
}
