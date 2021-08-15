import express from "express";
import axios, { AxiosRequestConfig } from "axios";
import cookieSession from "cookie-session";
import cors from "cors";

async function main() {
  var appScopes = "user-top-read user-read-email";

  var app = express();
  app.use(express.json());

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );

  app.use(cookieSession({ name: "session", keys: ["key1", "key2"] }));

  app.get("/callback", async (req, res) => {
    if (!req.query.code) {
      res.status(400).send("invalid response");
    } else {
      req.session!.code = req.query.code;
      let cred = await getTokens(req);
      req.session!.access_token = cred.access_token;
      req.session!.expires_in = cred.expires_in;
      req.session!.refresh_token = cred.refresh_token;
      res.redirect("http://localhost:3000/stats");
    }
  });

  app.get("/authorize", async (req, res) => {
    res.redirect(
      `https://accounts.spotify.com/authorize?client_id=${process.env.client_id}&response_type=code&redirect_uri=${process.env.redirect_uri}&scope=${appScopes}`
    );
  });

  async function getTokens(req: any): Promise<any> {
    let options: AxiosRequestConfig = {
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "authorization_code",
        code: req.session!.code,
        redirect_uri: process.env.redirect_uri,
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
      },
    };

    return axios(options)
      .then((response) => {
        return {
          access_token: response.data.access_token,
          expires_in: response.data.expires_in,
          refresh_token: response.data.refresh_token,
        };
      })
      .catch((error) => {
        console.log("error in getTokens", error.message);
      });
  }

  // Request new access & refresh token
  app.get("/getTokens", async (req, res) => {
    await getTokens(req);
  });

  // Request new access token given refresh token
  app.post("/refreshToken", async (req, res) => {
    axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: req.session!.refresh_token,
      },
      {
        headers: {
          Authorization: `Basic ${process.env.client_id}:${process.env.client_secret}`,
        },
      }
    );
  });

  app.post("/getArtists", async (req, res) => {
    axios
      .get(
        `https://api.spotify.com/v1/me/top/artists?time_range=${req.body.time_range}`,
        {
          headers: {
            Authorization: `Bearer ${req.session!.access_token}`,
          },
        }
      )
      .then((result) => {
        res.send(result.data);
      });
  });

  app.post("/getTracks", async (req, res) => {
    axios
      .get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${req.body.time_range}`,
        {
          headers: {
            Authorization: req.session!.access_token,
          },
        }
      )
      .then((result) => {
        res.send(result.data);
      });
  });

  app.listen(8080, () => {
    console.log(`Example app listening at http://localhost:8080`);
  });
}

main();
