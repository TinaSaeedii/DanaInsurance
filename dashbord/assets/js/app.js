const menu__btn = document.querySelector(".menu__btn");
const userIcon = document.querySelector(".user-icon");
const settingBtn = document.querySelector(".settingBtn");
const settingMenu = document.querySelector(".settingBtn").nextElementSibling;
const userMenu = document.querySelector(".user-icon").nextElementSibling;
const logoutIcon = document.querySelector(".logout-icon");
const logoutMenu = document.querySelector(".logout-icon").nextElementSibling;
const sidebar = document.querySelector(".sidebar");
const toggleBtns = document.querySelectorAll(".toggle-menu");
const today = document.querySelector(".today");

const arrowIcon = document.querySelector(".arrow-icon");

const jdate = new JDate(); // => default to today
let day = jdate.format("dddd DD MMMM YYYY"); // => پنج‌شنبه 12 شهریور 1394
today.innerHTML = day;
menu__btn.addEventListener("click", (e) => {
	sidebar.classList.toggle("active");
});
userIcon.addEventListener("click", (e) => {
	userMenu.classList.toggle("active");
});
logoutIcon.addEventListener("click", (e) => {
	logoutMenu.classList.toggle("active");
});
settingBtn.addEventListener("click", (e) => {
	settingMenu.classList.toggle("active");
});

document.addEventListener("click", function (event) {
	if (event.target.closest("#userMenu") === null) {
		if (userMenu.classList.contains("active")) {
			userMenu.classList.remove("active");
		}
	}
	if (event.target.closest("#logout") === null) {
		if (logoutMenu.classList.contains("active")) {
			logoutMenu.classList.remove("active");
		}
	}
	if (event.target.closest("#settingMenu") === null) {
		if (settingMenu.classList.contains("active")) {
			settingMenu.classList.remove("active");
		}
	}
});

toggleBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		if (e.target.parentNode.children.length > 1) {
			btn.nextElementSibling.classList.toggle("active");
			arrowIcon.classList.toggle("active");
		}
	});
});

function updateClock() {
	let now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	let time = hours + ":" + minutes + ":" + seconds;

	document.querySelector(".clock").innerHTML = time;
}
setInterval(updateClock, 1000);

let fullScreen = false;
function toggleFullScreen() {
	if (!fullScreen) {
		document.querySelector("#textFullScreen").textContent = "خروج از تمام صفحه";
		fullScreen = true;
	} else {
		document.querySelector("#textFullScreen").textContent = "حالت تمام صفحه";
		fullScreen = false;
	}
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen =
		docEl.requestFullscreen ||
		docEl.mozRequestFullScreen ||
		docEl.webkitRequestFullScreen ||
		docEl.msRequestFullscreen;
	var exitFullScreen =
		doc.exitFullscreen ||
		doc.mozCancelFullScreen ||
		doc.webkitExitFullscreen ||
		doc.msExitFullscreen;

	if (
		!doc.fullscreenElement &&
		!doc.mozFullScreenElement &&
		!doc.webkitFullscreenElement &&
		!doc.msFullscreenElement
	) {
		if (docEl.requestFullscreen) {
			docEl.requestFullscreen(); // Trigger fullscreen mode
		} else if (docEl.mozRequestFullScreen) {
			docEl.mozRequestFullScreen();
		} else if (docEl.webkitRequestFullScreen) {
			docEl.webkitRequestFullScreen();
		} else if (docEl.msRequestFullscreen) {
			docEl.msRequestFullscreen();
		}
	} else {
		if (doc.exitFullscreen) {
			doc.exitFullscreen(); // Exit fullscreen mode
		} else if (doc.mozCancelFullScreen) {
			doc.mozCancelFullScreen();
		} else if (doc.webkitExitFullscreen) {
			doc.webkitExitFullscreen();
		} else if (doc.msExitFullscreen) {
			doc.msExitFullscreen();
		}
	}
}
// Attach the toggleFullScreen function to a user-triggered event, such as a button click
var fullscreenButton = document.querySelector(".fullScreen");
fullscreenButton.addEventListener("click", toggleFullScreen);
