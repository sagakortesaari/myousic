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
            url: "https://api.spotify.com/v1/me",
            headers: {
                Authorization: "Bearer " + access_token,
            },
            success: function (response) {
                console.log(response);
                $("#answer").html("<img src=" + response.images[0].url + ">");
            },
        });
    }
})();
