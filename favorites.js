function changeHeart() {
	var heart = document.getElementById("heart")
	var recipename =  document.getElementById('recipename').textContent

	var cookie = getCookie("fav")

	if (cookie == null) {
		document.cookie = "fav="
	}

	if (heart.getAttribute("src") == "img/heart_no.svg") {
		heart.setAttribute("src", "img/heart_yes.svg")
		if (!getCookie("fav").includes(recipename))
			document.cookie += "|" + recipename
	} else {
		heart.setAttribute("src", "img/heart_no.svg")
		if (getCookie("fav").includes(recipename))
			document.cookie = document.cookie.replace(("|" + recipename), "")
	}
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 