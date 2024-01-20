function toggleLightMode() {
	let body = document.querySelector("body");
	let btn = document.querySelector("#dark-btn");
	
	if (body.classList.contains("light")) {
		body.classList.remove("light");
		btn.innerHTML = "🌜"
	}
	else {
		body.classList.add("light");
		btn.innerHTML = "🌞";
	}
}


let darkButton = document.querySelector("#dark-btn");
darkButton.addEventListener("click", toggleLightMode);