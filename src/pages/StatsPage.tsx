import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ItemList } from "../components/ItemList";
import { StatObject, User } from "../types";
import { StatPageMenu } from "../components/StatPageMenu";

export const StatsPage = () => {
  const [artists, setArtists] = useState<StatObject>();
  const [tracks, setTracks] = useState<StatObject>();
  const [user, setUser] = useState<User>();
  const [display, setDisplay] = useState("artists");

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
        console.log(res.data);
        setTracks(res.data);
      });

    axios
      .get("http://localhost:8080/getUser", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          display_name: res.data.display_name,
          external_urls: res.data.external_urls,
          image: res.data.images[0].url,
        });
      });
  }, []);

  return (
    <>
      <StatPageMenu user={user} toggle={setDisplay} />
      {display === "artists" ? (
        <ItemList statObj={artists} />
      ) : (
        <ItemList statObj={tracks} />
      )}
    </>
  );
};
