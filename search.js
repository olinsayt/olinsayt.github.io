function doSearch() {
	console.log("hi")

	var text = document.getElementById("msearch").value

	console.log(text)

	window.location.href = "index.html?c=Поиск&s=" + text
}