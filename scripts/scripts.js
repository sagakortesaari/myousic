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

function topsongs(response, div) {
    for (let index = 0; index < 20; index++) {
        let tracks = document.getElementById(div);
        let newtrack = document.createElement("li");
        newtrack.innerHTML =
            response.items[index].name +
            " by " +
            response.items[index].artists[0].name;
        tracks.appendChild(newtrack);
    }
}

function callajax(term, action, type, token, div) {
    $.ajax({
        url: "https://api.spotify.com/v1/me/top/" + type,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: {
            time_range: term,
        },
        success: function (response) {
            action(response, div);
        },
    });
}

(function () {
    var access_token;

    function encodeURL() {
        var split = window.location.href.split("#");
        split = split[1].split("&");
        split = split[0].split("=");
        access_token = split[1];
    }

    encodeURL();

    if (access_token) {
        callajax(
            "short_term",
            topsongs,
            "tracks",
            access_token,
            "toptracks-shortterm"
        );

        callajax(
            "medium_term",
            topsongs,
            "tracks",
            access_token,
            "toptracks-mediumterm"
        );
    }
})();
