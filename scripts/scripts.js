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

/*
    callajax function
    term: time-range for the intended request
    action: function to call at success
    path: path parameter
    token: access_token generated from API
    div: what div to append result to

*/

function callajax(term, action, path, token, div) {
    $.ajax({
        url: "https://api.spotify.com/v1/me/top/" + path,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: {
            time_range: term,
        },
        success: function (response) {
            action(response, div);
        },
        error: function () {
            $("#results").hide();
            $("#login").show();
        },
    });
}

function encodeURL() {
    var split = window.location.href.split("#");
    if (split[1]) {
        split = split[1].split("&");
        var fragments = {
            access_token: split[0].split("=")[1],
            token_type: split[1].split("=")[1],
            expires_in: split[2].split("=")[1],
            state: split[3].split("=")[1],
        };
        return fragments;
    }
}

(function () {
    var stateKey = "spotify_auth_state";
    var results = $("#results");
    var login = $("#login");

    var fragments = encodeURL();

    if (fragments != null) {
        var currentState = fragments.state;
        var storedState = localStorage.getItem(stateKey);

        if (fragments.access_token && currentState == storedState) {
            results.show();
            login.hide();
            localStorage.removeItem(stateKey);

            callajax(
                "short_term",
                topsongs,
                "tracks",
                fragments.access_token,
                "toptracks-shortterm"
            );

            callajax(
                "medium_term",
                topsongs,
                "tracks",
                fragments.access_token,
                "toptracks-mediumterm"
            );
        } else {
            login.show();
            results.hide();
        }
    } else {
        login.show();
        results.hide();
    }

    $("#login-button").submit(function () {
        var client_id = "883553e0c62a4876a9a81a39f65d34ef";
        var redirect_uri = "http://api.dcronqvist.se:12432";
        var scope = "user-top-read";
        var state = Math.floor(Math.random() * 10000);
        localStorage.setItem(stateKey, state);

        var url = "https://accounts.spotify.com/authorize";
        url += "?client_id=" + client_id;
        url += "&response_type=token";
        url += "&redirect_uri=" + redirect_uri;
        url += "&state=" + state;
        url += "&scope=" + scope;

        window.location = url;
        return false;
    });
})();
