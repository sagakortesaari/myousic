import axios from "axios";

export const StatsPage = () => {
  axios
    .post(
      "http://localhost:8080/getArtists",
      {
        time_range: "medium_term",
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data);
    });
  return <div> in development :) </div>;
};
