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
  const [term, setTerm] = useState("medterm");

  let fetchArtists = async () => {
    let artistsmedterm = await axios
      .post(
        "http://localhost:8080/getArtists",
        {
          time_range: "medium_term",
        },
        { withCredentials: true }
      )
      .then((res) => {
        return res.data;
      });

    let artistsshortterm = await axios
      .post(
        "http://localhost:8080/getArtists",
        {
          time_range: "short_term",
        },
        { withCredentials: true }
      )
      .then((res) => {
        return res.data;
      });

    let artistslongterm = await axios
      .post(
        "http://localhost:8080/getArtists",
        {
          time_range: "long_term",
        },
        { withCredentials: true }
      )
      .then((res) => {
        return res.data;
      });

    setArtists({
      shortterm: artistsshortterm,
      medterm: artistsmedterm,
      longterm: artistslongterm,
    });
  };

  let fetchTracks = async () => {
    let tracksmedterm = await axios
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
        return res.data;
      });

    let trackslongterm = await axios
      .post(
        "http://localhost:8080/getTracks",
        {
          time_range: "long_term",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.data;
      });

    let tracksshortterm = await axios
      .post(
        "http://localhost:8080/getTracks",
        {
          time_range: "short_term",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.data;
      });

    setTracks({
      shortterm: tracksshortterm,
      medterm: tracksmedterm,
      longterm: trackslongterm,
    });
  };

  useEffect(() => {
    fetchArtists();
    fetchTracks();

    axios
      .get("http://localhost:8080/getUser", {
        withCredentials: true,
      })
      .then((res) => {
        setUser({
          display_name: res.data.display_name,
          external_urls: res.data.external_urls,
          image: res.data.images[0].url,
        });
      });
  }, []);

  return (
    <>
      <StatPageMenu user={user} toggle={setDisplay} toggleTime={setTerm} />
      {display === "artists" ? (
        <ItemList statObj={artists} term={term} />
      ) : (
        <ItemList statObj={tracks} term={term} />
      )}
    </>
  );
};
