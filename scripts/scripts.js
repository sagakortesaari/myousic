function ajax_handler(response, div, path) {
    let existingelement = document.getElementById(div);

    for (let index = 0; index < 20; index++) {
        let newelement = document.createElement("li");

        if (path == "tracks") {
            newelement.innerHTML =
                response.items[index].name +
                " by " +
                response.items[index].artists[0].name;
        } else {
            newelement.innerHTML = response.items[index].name;
        }
        existingelement.appendChild(newelement);
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

function callajax(term, path, token, div) {
    $.ajax({
        url: "https://api.spotify.com/v1/me/top/" + path,
        headers: {
            Authorization: "Bearer " + token,
        },
        data: {
            time_range: term,
        },
        success: function (response) {
            console.log(response);
            ajax_handler(response, div, path);
        },
        error: function () {
            $("#results").hide();
            $("#login").show();
            $("#logout").hide();
            $("#footer").hide();
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

function callajax_songs(access_token) {
    callajax("short_term", "tracks", access_token, "toptracks-shortterm");
    callajax("medium_term", "tracks", access_token, "toptracks-mediumterm");
    callajax("long_term", "tracks", access_token, "toptracks-longterm");
}

function callajax_artists(access_token) {
    callajax("long_term", "artists", access_token, "topartists-longterm");
    callajax("medium_term", "artists", access_token, "topartists-mediumterm");
    callajax("short_term", "artists", access_token, "topartists-shortterm");
}

(function () {
    var stateKey = "spotify_auth_state";
    var results = $("#results");
    var login = $("#login");
    var logout = $("#logout");
    var footer = $("#footer");
    var artists_called = false;

    var fragments = encodeURL();

    if (fragments != null) {
        var currentState = fragments.state;
        var storedState = localStorage.getItem(stateKey);

        if (fragments.access_token && currentState == storedState) {
            results.show();
            login.hide();
            //localStorage.removeItem(stateKey);
            logout.show();
            $("#results-artists").hide();

            callajax_songs(fragments.access_token);
            $("#menu-topartists").css("opacity", "0.4");

            $("#menu-topartists").click(function () {
                $("#menu-topartists").css("opacity", "1");
                $("#menu-toptracks").css("opacity", "0.4");
                $("#results-tracks").hide();
                $("#results-artists").show();

                if (artists_called != true) {
                    callajax_artists(fragments.access_token);
                    artists_called = true;
                }
            });

            $("#menu-toptracks").click(function () {
                $("#menu-toptracks").css("opacity", "1");
                $("#menu-topartists").css("opacity", "0.4");
                $("#results-tracks").show();
                $("#results-artists").hide();
            });
        } else {
            login.show();
            results.hide();
            footer.hide();
        }
    } else {
        login.show();
        results.hide();
        footer.hide();
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

$("#logout-button").submit(function () {
    localStorage.removeItem("spotify_auth_state");
});
