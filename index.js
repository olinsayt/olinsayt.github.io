window.mobileCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

window.onload = function() {
	var isMobile = false

	if (window.mobileCheck()) {
		document.getElementById("desktop").style.display = "none"
		document.getElementById("mobile").style.display = "block"

		document.body.style.background = "#fff"

		isMobile = true
	}
	
	var search = document.getElementById("search")

	if (!isMobile) {
		search.addEventListener("keyup", function(event) {
			if (event.key == 13 || event.key == "Enter") {
				event.preventDefault()
			
				doSearch(search)
			}
		});
	} else {
		search.addEventListener("keyup", function(event) {
			console.log(event.keyCode)
			if (event.key == 13 || event.key == "Enter") {
				event.preventDefault()
			
				doSearch(search)
			}
		});
	}

	var queryString = window.location.search;

	var urlParams = new URLSearchParams(queryString);

	var page = urlParams.get("p")
	var cathegory = urlParams.get("c")

	var content = document.getElementById("content")

	if (isMobile)
	  	content = document.getElementById("mcontent")

	if (cathegory != "" && cathegory != null) {
		getRecipes(cathegory, content)
	} else {
		if (page == "" || page == null) {
			if (!isMobile)
				getText("Главная", content)
			else
				getText("Главная2", content)
		} else {
			getText(page, content)
		}
	}
}

function getText(name = "Главная", element) {
	$.getJSON( "recipes.json", function( data ) {
		innerStr = "unknown"

		for (const [key, value] of Object.entries(data[0])) {
			for (const [key1, value1] of Object.entries(data[0][key])) {
				if (value1["name"] == name) {
					innerStr = value1["text"]
				}
			}
		}

		if (innerStr == "unknown") {
			innerStr = data[0]["Разное"][0]["text"]
		}

		if (innerStr == undefined) {
			getRecipe(name, element)
		} else {
			element.innerHTML = innerStr
		}
	})
}

function getRecipes(name, element) {
	$.getJSON( "recipes.json", function( data ) {

		console.log(name)

		if (name == "Избранное") {
			console.log("ASASA")

			var cookie = getCookie("fav")

			if (cookie == null || cookie == "")
				innerStr = "<center><h1>" + name + "</h1><p>Вы ещё ничего не добавляли в избранное! Чтобы сделать это, нажмите на сердечко на странице рецепта.</p></center>"
			else {
				innerStr = "<h1>" + name + "</h1>"

				var favs = cookie.split("|")

				favs = favs.filter(function (el) {
					return el != "";
				});

				for (const name of favs) {
					if (!window.mobileCheck())
						innerStr += "<div class='recipe'><a href='index.html?p=" + name + "'><img src='recipeimg/" + name + ".png' alt='Изображение не загружено!'><h2>" + name + "</h2></a></div>"
					else
						innerStr += "<div class='mrecipe'><a href='index.html?p=" + name + "'><img src='recipeimg/" + name + ".png' alt='Изображение не загружено!'><h2>" + name + "</h2></a></div>"
				}

				console.log(favs)
			}
		} else if (name == "Поиск") {
			console.log("asaas")
			var searchtext = new URLSearchParams(window.location.search).get("s")

			console.log(searchtext)

			innerStr = '<h1>Поиск "' + searchtext + '"</h1>'

			for (const [key, value] of Object.entries(data[0])) {
				if (key != "Разное")
					for (const [key1, value1] of Object.entries(data[0][key])) {
						console.log(value1["name"])
						if (value1["name"].toLowerCase().includes(searchtext.toLowerCase()))
							if (!window.mobileCheck())
								innerStr += "<div class='recipe'><a href='index.html?p=" + value1["name"] + "'><img src='recipeimg/" + value1["name"] + ".png' alt='Изображение не загружено!'><h2>" + value1["name"] + "</h2></a></div>"
							else
								innerStr += "<div class='mrecipe'><a href='index.html?p=" + value1["name"] + "'><img src='recipeimg/" + value1["name"] + ".png' alt='Изображение не загружено!'><h2>" + value1["name"] + "</h2></a></div>"
				}
			}

			if (innerStr == '<h1>Поиск "' + searchtext + '"</h1>') {
				innerStr = '<center><h1>Поиск</h1><p>К сожалению, поиск по запросу "' + searchtext + '" ничего не дал.</p></center>'
			}
		} else {
			if (data[0][name] == undefined) {
				innerStr = data[0]["Разное"][0]["text"]
			} else {
				innerStr = "<h1>" + name + "</h1>"

				for (const [key, value] of Object.entries(data[0][name])) {
					if (!window.mobileCheck())
						innerStr += "<div class='recipe'><a href='index.html?p=" + value["name"] + "'><img src='recipeimg/" + value["name"] + ".png' alt='Изображение не загружено!'><h2>" + value["name"] + "</h2></a></div>"
					else
						innerStr += "<div class='mrecipe'><a href='index.html?p=" + value["name"] + "'><img src='recipeimg/" + value["name"] + ".png' alt='Изображение не загружено!'><h2>" + value["name"] + "</h2></a></div>"
				}

				if (innerStr == "<h1>" + name + "</h1>") {
					innerStr = "<center><h1>" + name + "</h1><p>Тут ничего нет :(</p></center>"
				}
			}
		}

		element.innerHTML = innerStr
	})
}

function getRecipe(name, element) {
	$.getJSON( "recipes.json", function( data ) {
		innerStr = ""

		for (const [key, value] of Object.entries(data[0])) {
			for (const [key1, value1] of Object.entries(data[0][key])) {
				if (value1["name"] == name) {
					var ingredients_list = value1["ingredients"].split("|")
					var ingredients = ""

					for (const [idk, ingr] of Object.entries(ingredients_list)) {
						ingredients += "<li>" + ingr + "</li>"
					}

					var recipe_list = value1["recipe"].split("|")
					var recipe = ""

					for (const [idk, r] of Object.entries(recipe_list)) {
						recipe += "<li>" + r + "</li>"
					}

					var cathegory = key
					
					if (!window.mobileCheck())
						innerStr = "<div class='recipepage'><center><h1 id='recipename'>" + value1["name"] + "</h1><h2>" + cathegory + "</h2></center><br><p>Время приготовления: " + value1["time"] + "</p><br><h3>Ингредиенты:</h3><ul>" + ingredients + "</ul><br><h3>Рецепт:</h3><ol>" + recipe + "</ol><br><h3>Добавить в избранное:</h3><img src='img/heart_no.svg' class='heart' id='heart' onclick='changeHeart()'></div>"
					else 
						innerStr = "<div class='mrecipepage'><center><h1 id='recipename'>" + value1["name"] + "</h1><h2>" + cathegory + "</h2></center><br><p>Время приготовления: " + value1["time"] + "</p><br><h3>Ингредиенты:</h3><ul>" + ingredients + "</ul><br><h3>Рецепт:</h3><ol>" + recipe + "</ol><br><h3>Добавить в избранное:</h3><img src='img/heart_no.svg' class='heart' id='heart' onclick='changeHeart()'></div>"
				}
			}
		}

		element.innerHTML = innerStr

		var heart = document.getElementById("heart")
		
		var heart = document.getElementById("heart")
		var recipename =  document.getElementById('recipename').textContent

		var cookie = getCookie("fav")

		if (cookie != null) {
			if (cookie.includes(recipename))
				heart.setAttribute("src", "img/heart_yes.svg")
		}
	})
}