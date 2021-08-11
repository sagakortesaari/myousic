import express from "express";
import axios from "axios";
//import cookieSession from 'cookie-session';

async function main() {
  //var appScopes = "";
  var app = express();
  app.use(express.json());

  //app.use(cookieSession({name: "session", keys: ["key1", "key2"]}))

  app.get("/callback", async (req, res) => {
    console.log("code ", req.query.code);
    //res.redirect(sagak.se/spotifi)
    res.status(200).send("yaaay");
  });

  app.get("/authorize", async (req, res) => {
    res.redirect(
      `https://accounts.spotify.com/authorize?client_id=${process.env.client_id}&response_type=code&redirect_uri=${process.env.redirect_uri}`
    );
  });

  // Request new access & refresh token
  app.post("/getTokens", async (req, res) => {
    let code = req.body.code;

    axios
      .post("https://accounts.spotify.com/api/token", {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.redirect_uri,
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
      })
      .then((response) => {
        // Do I set these in the cache? With the cookie-session
        let access_token = response.data.access_token;
        let expires_in = response.data.expires_in;
        let refresh_token = response.data.refresh_token;

        res.status(200).send("successfully authenticated!");
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send("ERROR: something went wrong - please try again");
      });
  });

  // Request new access token given refresh token
  app.post("/refreshToken", async (req, res) => {
    axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: "refresh_token_here",
      },
      {
        headers: {
          Authorization: `Basic ${process.env.client_id}:${process.env.client_secret}`,
        },
      }
    );
  });

  app.listen(8080, () => {
    console.log(`Example app listening at http://localhost:8080`);
  });
}

main();
