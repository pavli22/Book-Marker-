var webSiteArray = [];
var website = {};
var siteName = document.getElementById("site-name");
var siteURL = document.getElementById("site-URL");
var warning_icon = document.querySelector(".warning-icon");
var accept_icon = document.querySelector(".accept-icon");
var warning_icon2 = document.querySelector(".warning-icon-2");
var accept_icon2 = document.querySelector(".accept-icon-2");
var siteNameSection = document.getElementById("site-name-section");
var siteURLSection = document.getElementById("url-name-section");
var boxContainer = document.getElementById("box-container");
var boxItem = document.getElementById("box-item");
var closeIcon = document.getElementById("close-icon");
closeIcon.addEventListener("click", function () {
  boxContainer.classList.remove("d-flex");
  boxContainer.classList.add("d-none");
});
boxContainer.addEventListener("click", function () {
  boxContainer.classList.remove("d-flex");
  boxContainer.classList.add("d-none");
  boxItem.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

var regExSiteName = /^[a-zA-Z0-9]{3,}$/;
var regExSiteURL =
  /^(http(s):\/\/.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
var flagSiteName = true;
var flagSiteURL = true;

if (localStorage.getItem("website") != null) {
  webSiteArray = JSON.parse(localStorage.getItem("website"));
  display();
}
function SiteNameValidation(name) {
  return regExSiteName.test(name);
}
function SiteUrlValidation(name) {
  return regExSiteURL.test(name);
}
siteName.addEventListener("keyup", function (e) {
  if (SiteNameValidation(siteName.value)) {
    siteName.classList.remove("warning");
    flagSiteName = true;
    siteName.classList.add("accept");
    warning_icon.style.display = "none";
    accept_icon.style.display = "block";
    siteName.style.borderColor = "#008000";
  } else {
    siteName.classList.remove("accept");
    flagSiteName = false;
    siteName.classList.add("warning");
    warning_icon.style.display = "block";
    accept_icon.style.display = "none";
    siteName.style.borderColor = "#dc1c1c";
  }
});
siteURL.addEventListener("keyup", function (e) {
  if (SiteUrlValidation(siteURL.value)) {
    siteURL.classList.remove("warning");
    flagSiteURL = true;
    siteURL.classList.add("accept");
    warning_icon2.style.display = "none";
    accept_icon2.style.display = "block";
    siteURL.style.borderColor = "#008000";
  } else {
    siteURL.classList.remove("accept");
    flagSiteURL = false;
    siteURL.classList.add("warning");
    warning_icon2.style.display = "block";
    accept_icon2.style.display = "none";
    siteURL.style.borderColor = "#dc1c1c";
  }
});
function addItem() {
  website = {
    name: siteName.value,
    url: siteURL.value,
  };
  if (
    flagSiteURL &&
    flagSiteName &&
    !website.name == "" &&
    !website.url == ""
  ) {
    if (!website.url.includes("https://")) {
      website.url = "https://" + website.url;
    }
    webSiteArray.push(website);
    localStorage.setItem("website", JSON.stringify(webSiteArray));
    display();
    clearInput();
  } else {
    boxContainer.classList.remove("d-none");
    boxContainer.classList.add("d-flex");
    siteURL.style.borderColor = "#dc1c1c";
    siteName.style.borderColor = "#dc1c1c";
  }
  warning_icon.style.display = "none";
  accept_icon.style.display = "none";
  siteName.style.borderColor = "transparent";
  warning_icon2.style.display = "none";
  accept_icon2.style.display = "none";
  siteURL.style.borderColor = "transparent";
}
function display() {
  var content = ``;
  for (var i = 0; i < webSiteArray.length; i++) {
    content += ` <tr>  <td>${i + 1}</td>
    <td>${webSiteArray[i].name}</td>
    <td>
       <a href="${
         webSiteArray[i].url
       }" target="_blank">  <button id="visit-btn" class="btn btn-visit "><i class="fa-solid fa-eye pe-1"></i> Visit </button> </a> </td>
    <td><button id="deleteBtn" onclick="deleteWebsite(${i})" class="btn btn-delete"><i class="fa-regular fa-trash-can pe-1"></i> Delete</button></td>
    </tr>`;
  }
  document.getElementById("demo").innerHTML = content;
}
function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

function checkDuplicates(website) {
  for (var i = 0; i < webSiteArray.length; i++) {
    if (webSiteArray[i].name == website.name) {
      return i;
    }
  }
  return -1;
}

function deleteWebsite(website) {
  webSiteArray.splice(website, 1);
  localStorage.setItem("website", JSON.stringify(webSiteArray));
  display();
}
