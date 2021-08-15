import express from "express";
import axios from "axios";
import cookieSession from "cookie-session";
import cors from "cors";

async function main() {
    //var appScopes = "";
    var app = express();
    app.use(express.json());

    app.use(
        cors({
            origin: ["http://localhost:3000"],
        })
    );

    app.use(cookieSession({ name: "session", keys: ["key1", "key2"] }));

    app.get("/callback", async (req, res) => {
        if (!req.query.code) {
            res.status(400).send("invalid response");
        } else {
            console.log("code ", req.query.code);
            req.session!.test = "testing cookies";
            res.redirect("http://localhost:3000/stats");
        }
    });

    app.get("/authorize", async (req, res) => {
        res.redirect(
            `https://accounts.spotify.com/authorize?client_id=${process.env.client_id}&response_type=code&redirect_uri=${process.env.redirect_uri}`
        );
    });

    app.get("/checkCookie", async (req, res) => {
        console.log("cookie", req.session!.test);
        res.status(200).send("cookie is set");
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
                req.session!.access_token = response.data.access_token;
                req.session!.expires_in = response.data.expires_in;
                req.session!.refresh_token = response.data.refresh_token;

                res.status(200).send("successfully authenticated!");
            })
            .catch((error) => {
                console.error(error);
                res.status(400).send(
                    "ERROR: something went wrong - please try again"
                );
            });
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
                        Authorization: req.session!.access_token,
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
