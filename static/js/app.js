const nationalCode = document.getElementById("national__Code");
const firstName = document.querySelector("#first__name");
const lastName = document.querySelector("#last__name");
const phoneNumber = document.querySelector("#phone");
const password = document.querySelector("#password");
const remmberPass = document.querySelector("#Re__pass");
const submitBtn = document.querySelector("#submit__btn");
const genders = document.getElementsByName("gender");
const degree = document.querySelector("#degree");
const rols = document.querySelector("#rols");
const error_list = document.querySelector(".error__list");
const succesAlert = document.querySelector(".succes__alert");
const loginBtn = document.querySelector(".login__btn");
const regForm = document.querySelector("form");

let errMsg = "";

// get error elemnt of fields
const getErrEl = function (el) {
	return el.parentElement.querySelector(".err");
};
// get accept images of fields
const getacceptImgEL = function (el) {
	return el.parentElement.querySelector(".accept__icon");
};
// persian type

function isPersian(str) {
	let pattern = /^[\u0600-\u06FF\s]+$/;
	return pattern.test(str);
}
// phone validetions
function validateIranianMobileNumber(number) {
	let pattern = /^09\d{9}$/;
	return pattern.test(number);
}
// fix number
const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
const fixNumbers = function (str) {
	if (typeof str === "string") {
		for (var i = 0; i < 10; i++) {
			str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
		}
	}
	return str;
};
function isEqual(str1, str2) {
	return str1 === str2;
}
// validtion Nation Id
function validetionNationID(e) {
	const inputEl = e.target;
	inputEl.setAttribute("maxlength", 10);
	const value = Number(fixNumbers(inputEl.value));
	const errEL = getErrEl(inputEl);
	const acceptEl = getacceptImgEL(inputEl);
	if (isNaN(value)) {
		errMsg = " کد ملی  فقط باید شامل اعداد باشد ";
		errEL.textContent = errMsg;
		errEL.style.display = "block";
		acceptEl.style.display = "none";
		inputEl.style.borderColor = "#FFaaa9";
		return;
	}
	const strVal = value.toString();
	if (strVal.length < 10) {
		errMsg = "کد ملی هر فرد باید ده رقمی باشد";
		errEL.textContent = errMsg;
		errEL.style.display = "block";
		acceptEl.style.display = "none";
		inputEl.style.borderColor = "#FFaaa9";
		return;
	}
	errMsg = "";
	errEL.textContent = "";
	errEL.style.display = "none";
	acceptEl.style.display = "block";
	inputEl.style.borderColor = "#33b864";
}
// validtion first and last names

function validetionTextinput(e) {
	const inputEl = e.target;
	const inputElfield = e.target.id;
	let fieldMsg = "";
	switch (inputElfield) {
		case "first__name":
			fieldMsg = "نام";
			break;
		case "last__name":
			fieldMsg = "نام خانوادگی";
			break;
		default:
			break;
	}
	inputEl.setAttribute("maxlength", 15);
	const value = inputEl.value;
	const errEL = getErrEl(inputEl);
	const acceptEl = getacceptImgEL(inputEl);
	if (!isPersian(value)) {
		errMsg = `لطفا تنها از حروف فارسی استفاده کنید`;
		errEL.textContent = errMsg;
		errEL.style.display = "block";
		acceptEl.style.display = "none";
		inputEl.style.borderColor = "#FFaaa9";
		return;
	}
	if (value.length < 2) {
		errMsg = `${fieldMsg} باید بیش از دو حرف باشد`;
		errEL.textContent = errMsg;
		errEL.style.display = "block";
		acceptEl.style.display = "none";
		inputEl.style.borderColor = "#FFaaa9";
		return;
	}
	errMsg = "";
	errEL.textContent = "";
	errEL.style.display = "none";
	acceptEl.style.display = "block";
	inputEl.style.borderColor = "#33b864";
}

function validetionPhoneNumber(e) {
	const inputEl = e.target;
	inputEl.setAttribute("maxlength", 11);
	const value = fixNumbers(inputEl.value);
	const errEL = getErrEl(inputEl);
	const acceptEl = getacceptImgEL(inputEl);
	if (!validateIranianMobileNumber(value)) {
		errMsg = `شماره تلفتن باید حتما با ۰۹ شروع شود و ۱۱ عدد باشد`;
		errEL.textContent = errMsg;
		errEL.style.display = "block";
		acceptEl.style.display = "none";
		inputEl.style.borderColor = "#FFaaa9";
		return;
	}
	errMsg = "";
	errEL.textContent = "";
	errEL.style.display = "none";
	acceptEl.style.display = "block";
	inputEl.style.borderColor = "#33b864";
}

function validatePassword(e) {
	let errors = [];
	console.log(errors);
	const inputEl = e.target;
	const value = inputEl.value;
	const errEL = getErrEl(inputEl);
	const acceptEl = getacceptImgEL(inputEl);
	if (value.length < 8) {
		errors.push(".کلمه عبور باید حداقل ۸ کارکتر باشد");
	}
	if (value.search(/[a-z]/i) < 0) {
		errors.push(".پسورد باید دارای حداقل ۲ حرف انگلیسی باشد");
	}
	if (value.search(/[0-9]/) < 0) {
		errors.push("پسورد با شامل حداقل ۱ عدد انگلیسی باشد.");
	}
	console.log(errors);
	if (errors.length > 0) {
		errMsg = "";
		errors.forEach((err) => {
			errMsg += `<span>${err}</span>`;
		});
		errEL.innerHTML = errMsg;
		errEL.style.display = "block";
		acceptEl.style.display = "none";
		inputEl.style.borderColor = "#FFaaa9";
		return false;
	}
	errMsg = "";
	errEL.textContent = "";
	errEL.style.display = "none";
	acceptEl.style.display = "block";
	inputEl.style.borderColor = "#33b864";
	return true;
}

function validateRemmberPassword(e) {
	const inputEl = e.target;
	const value = inputEl.value;
	const errEL = getErrEl(inputEl);
	const acceptEl = getacceptImgEL(inputEl);
	if (!isEqual(value, password.value)) {
		errEL.textContent = "تکرار کلمه عبور با کلمه عبور مطابقت ندارد";
		errEL.style.display = "block";
		acceptEl.style.display = "none";
		inputEl.style.borderColor = "#FFaaa9";
		return false;
	}
	errMsg = "";
	errEL.textContent = "";
	errEL.style.display = "none";
	acceptEl.style.display = "block";
	inputEl.style.borderColor = "#33b864";
	return true;
}

function getgender() {
	let genderArr = [];
	for (let index = 0; index < genders.length; index++) {
		const gender = genders[index];
		if (gender.checked) {
			genderArr.push(gender);
		}
	}
	if (genderArr.length === 0) {
		return false;
	}
	return true;
}

function checkError(e) {
	let errArry = [];
	if (!rols.checked) {
		errArry.push("لطفا قوانین و سیاست های سامانه را مطالعه و  برای ثبت نام آنها را بپذیرید .");
	}
	if (firstName.value == "") {
		errArry.push("فیلد نام تکمیل نشده است");
	}
	if (lastName.value == "") {
		errArry.push("فیلد نام خانوادگی تکمیل نشده است");
	}
	if (phoneNumber.value == "") {
		errArry.push("فیلد شماره موبایل وارد نشده است");
	}
	if (nationalCode.value == "") {
		errArry.push("فیلد کد ملی تکمیل نشده است");
	}
	if (password.value == "") {
		errArry.push("فیلد کلمه عبور تکمیل نشده است");
	}
	if (!getgender()) {
		errArry.push("لطفا جنسیت خود را انتخاب کنید");
	}
	if (degree.value == "") {
		errArry.push("لطفا مدرک تحصیلی خود را انتخاب کنید");
	}

	if (errArry.length > 0) {
		errMsg = "";
		errArry.forEach((err) => {
			errMsg += `<li>${err}</li>`;
		});
		error_list.innerHTML = errMsg;
		error_list.classList.add("active");
		return false;
	} else {
		errMsg = "";
		error_list.innerHTML = "";
		error_list.classList.remove("active");
		succesAlert.classList.add("active");
	}
}

nationalCode.addEventListener("input", validetionNationID);
firstName.addEventListener("input", validetionTextinput);
lastName.addEventListener("input", validetionTextinput);
phoneNumber.addEventListener("input", validetionPhoneNumber);
password.addEventListener("input", validatePassword);
remmberPass.addEventListener("input", validateRemmberPassword);
submitBtn.addEventListener("click", checkError);
loginBtn.addEventListener("click", (e) => {
	e.preventDefault();
	succesAlert.classList.remove("active");
	regForm.reset();
	let imgsAccept = document.querySelectorAll(".accept__icon");
	let allInput = document.querySelectorAll("input");
	imgsAccept.forEach((img) => {
		img.style.display = "none";
	});
	allInput.forEach((inp) => {
		inp.style.borderColor = "rgba(0, 0, 5, 0.1)";
	});
});
