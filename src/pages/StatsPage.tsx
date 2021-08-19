import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ListItem } from "../components/ListItem";
import { StatObject } from "../types";
import { StatPageMenu } from "../components/StatPageMenu";

export const StatsPage = () => {
  let [artists, setArtists] = useState<StatObject>();
  let [tracks, setTracks] = useState<StatObject>();

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/getArtists",
        {
          time_range: "medium_term",
        },
        { withCredentials: true }
      )
      .then((res) => {
        setArtists(res.data);
      });

    axios
      .post(
        "http://localhost:8080/getTracks",
        {
          time_range: "medium_term",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setTracks(res.data);
      });
  }, []);

  return (
    <>
      <div> in development :) </div>
      <StatPageMenu />
      <ListItem statObj={artists} />
    </>
  );
};
