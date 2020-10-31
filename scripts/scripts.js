$("#login-button").submit(function () {
    var client_id = "883553e0c62a4876a9a81a39f65d34ef";
    var redirect_uri = "http://api.dcronqvist.se:12432";
    var scope = "user-top-read";

    var url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + client_id;
    url += "&response_type=token";
    url += "&redirect_uri=" + redirect_uri;
    url += "&scope=" + scope;

    window.location = url;
    return false;
});

(function () {
    var access_token;

    function encodeURL() {
        var split = window.location.href.split("#");
        split = split[1].split("&");
        split = split[0].split("=");
        access_token = split[1];
        console.log(access_token);
    }

    encodeURL();
    console.log(access_token);

    if (access_token) {
        $.ajax({
            url: "https://api.spotify.com/v1/me/top/tracks",
            headers: {
                Authorization: "Bearer " + access_token,
            },
            data: {
                time_range: "medium_term",
            },
            success: function (response) {
                for (let index = 0; index < 20; index++) {
                    let tracks = document.getElementById("toptracks");
                    let newtrack = document.createElement("div");
                    newtrack.innerHTML =
                        response.items[index].name +
                        " by " +
                        response.items[index].artists[0].name;
                    tracks.appendChild(newtrack);
                }
            },
        });
    }
})();
