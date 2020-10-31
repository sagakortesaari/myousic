$("#login-button").submit(function () {
    var client_id = "883553e0c62a4876a9a81a39f65d34ef";
    var redirect_uri = "http://api.dcronqvist.se:12432";

    var url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + client_id;
    url += "&response_type=token";
    url += "&redirect_uri=" + redirect_uri;

    window.location = url;
    return false;
});
