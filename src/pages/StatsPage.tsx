import axios from "axios";

export const StatsPage = () => {
  axios
    .get("http://localhost:8080/checkCookie", { withCredentials: true })
    .then((res) => {});

  return <div> in development </div>;
};
