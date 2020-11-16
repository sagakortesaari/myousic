function ajax_handler(response, div, path) {
    let existingelement = document.getElementById(div);

    for (let index = 0; index < 20; index++) {
        let newelement = document.createElement("li");

        if (path == "tracks") {
            let number = document.createElement("span");
            let text = document.createElement("span");
            let photo = document.createElement("img");
            number.innerHTML = index + 1 + ".";
            number.setAttribute("style", "width:40px;");
            number.setAttribute("class", "number");
            photo.setAttribute(
                "src",
                response.items[index].album.images[0].url
            );
            photo.setAttribute("class", "artist-photo");
            text.innerHTML =
                response.items[index].name +
                "<br />" +
                response.items[index].artists[0].name;
            newelement.appendChild(number);
            newelement.appendChild(photo);
            newelement.appendChild(text);
            newelement.setAttribute("class", "artist-li");
            existingelement.appendChild(newelement);
        } else {
            let photo = document.createElement("img");
            let text = document.createElement("span");
            let number = document.createElement("span");
            number.innerHTML = index + 1 + ".";
            number.setAttribute("style", "width: 40px;");
            number.setAttribute("class", "number");
            text.innerHTML = response.items[index].name;
            photo.setAttribute("src", response.items[index].images[0].url);
            photo.setAttribute("class", "artist-photo");
            newelement.appendChild(number);
            newelement.appendChild(photo);
            newelement.appendChild(text);
            newelement.setAttribute("class", "artist-li");
            existingelement.appendChild(newelement);
        }
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
            ajax_handler(response, div, path);
            console.log(response);
        },
        error: function () {
            $("#results").hide();
            $("#login").show();
            $("#logout").hide();
            $("#footer").hide();
            $("#terms").hide();
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

function showDiv(id) {
    div = "#" + id;
    id = $(div);
    id.show();
    id.siblings().hide();
}

(function () {
    var stateKey = "spotify_auth_state";
    var results = $("#results");
    var login = $("#login");
    var logout = $("#logout");
    var footer = $("#footer");
    var terms = $("#terms");
    var artists_called = false;

    var fragments = encodeURL();

    if (fragments != null) {
        var longterms = true;
        var mediumterms = false;
        var shortterms = false;
        var currentState = fragments.state;
        var storedState = localStorage.getItem(stateKey);

        if (fragments.access_token && currentState == storedState) {
            results.show();
            login.hide();
            logout.show();
            $("#results-artists").hide();
            $("#results-tracks").addClass("clicked");

            showDiv("longterm");

            callajax_songs(fragments.access_token);
            $("#menu-topartists").css("opacity", "0.4");

            $("#menu-topartists").click(function () {
                $("#menu-topartists").css("opacity", "1");
                $("#menu-toptracks").css("opacity", "0.4");
                $("#results-tracks").hide();
                $("#results-artists").show();
                $("#results-artists").addClass("clicked");
                $("#results-tracks").removeClass("clicked");

                if (artists_called != true) {
                    callajax_artists(fragments.access_token);
                    artists_called = true;
                }

                if (longterms) {
                    showDiv("longterm-artist");
                } else if (mediumterms) {
                    showDiv("mediumterm-artist");
                } else {
                    showDiv("shortterm-artist");
                }
            });

            $("#menu-toptracks").click(function () {
                $("#menu-toptracks").css("opacity", "1");
                $("#menu-topartists").css("opacity", "0.4");
                $("#results-artists").hide();
                $("#results-artists").removeClass("clicked");
                $("#results-tracks").addClass("clicked");
                $("#results-tracks").show();

                if (longterms) {
                    showDiv("longterm");
                } else if (mediumterms) {
                    showDiv("mediumterm");
                } else {
                    showDiv("shortterm");
                }
            });

            $("#logout").click(function () {
                localStorage.removeItem("spotify_auth_state");
                window.location = "http://api.dcronqvist.se:12432";
            });

            $("#alltime").click(function () {
                if ($("#results-tracks").hasClass("clicked")) {
                    showDiv("longterm");
                } else {
                    showDiv("longterm-artist");
                }

                longterms = true;
                mediumterms = false;
                shortterms = false;
            });

            $("#6months").click(function () {
                if ($("#results-tracks").hasClass("clicked")) {
                    showDiv("mediumterm");
                } else {
                    showDiv("mediumterm-artist");
                }

                mediumterms = true;
                shortterms = false;
                longterms = false;
            });

            $("#lastmonth").click(function () {
                if ($("#results-tracks").hasClass("clicked")) {
                    showDiv("shortterm");
                } else {
                    showDiv("shortterm-artist");
                }

                shortterms = true;
                longterms = false;
                mediumterms = false;
            });
        } else {
            login.show();
            results.hide();
            footer.hide();
            terms.hide();
        }
    } else {
        login.show();
        results.hide();
        footer.hide();
        terms.hide();
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
