import { returnIcon } from "../icons.js";
import { getUsersArray } from "../../js/script.js";
const contactDetailsRef = document.getElementById("contactDetails");
const contactListRef = document.getElementById("contactList");
let selectedUserId = null;
let isProcessing = false;

export function selectedUser(id) {
  if (isProcessing) return;
  if (selectedUserId === id) {
    noneSelectedUser();
    isProcessing = true;
  } else {
    isUserSelected(id);
    isProcessing = true;
  }
  setTimeout(() => {
    isProcessing = false;
  }, 600);
}

function isUserSelected(id) {
  highlightedSelectedUser(id);
  switchMobile();
  renderContactDetails(id);
  scrollToUser(id);
  userPanelVisibility();
  selectedUserId = id;
}

function noneSelectedUser() {
  userPanelVisibility();
  highlightedSelectedUser();
  setTimeout(() => {
    renderContactDetails();
    selectedUserId = null;
  }, 500);
}

function highlightedSelectedUser(id) {
  const selectedUserButton = document.querySelectorAll(".userListItem");
  selectedUserButton.forEach((button) => {
    button.classList.remove("selectedUser");
  });
  if (!id) return;
  const selectedUserRef = document.getElementById(id);
  selectedUserRef.classList.add("selectedUser");
}

function userPanelVisibility() {
  setTimeout(() => {
    const contactDetailsBoxRef = document.getElementById("userDetailPanel");
    if (contactDetailsBoxRef) contactDetailsBoxRef.classList.toggle("visible");
  }, 250);
}

function scrollToUser(id) {
  const selectedUserElement = document.getElementById(id);
  if (selectedUserElement) selectedUserElement.scrollIntoView({ behavior: "smooth", block: "center" }); // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
}

export function switchMobile() {
  const contactDetailsComputedStyle = window.getComputedStyle(contactDetailsRef);
  const contactListComputedStyle = window.getComputedStyle(contactListRef);
  if (contactDetailsComputedStyle.display === "none") {
    contactDetailsRef.style.display = "flex";
    contactListRef.style.display = "none";
    highlightedSelectedUser();
  } else if (contactListComputedStyle.display === "none") {
    contactDetailsRef.style.display = "none";
    contactListRef.style.display = "flex";
  }
}

function updateWidth() {
  const width = window.innerWidth; // https://www.w3schools.com/jsref/prop_win_innerwidth.asp
  if (width >= 1401 && contactDetailsRef && contactListRef) {
    if (contactListRef.style.display === "flex") contactDetailsRef.style.display = "flex";
  } else if (width <= 1400 && contactDetailsRef && contactListRef) {
    if (contactListRef.style.display === "flex") contactDetailsRef.style.display = "none";
  }
  if (width == screen.width && contactDetailsRef && contactListRef) {
    contactDetailsRef.style.display = "flex";
    contactListRef.style.display = "flex";
  }
}

window.addEventListener("resize", updateWidth); // https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event

export function userProfileButtonsMobile() {
  const userProfileButtonsRef = document.getElementById("userProfileButtons");
  const userProfileButtonsStyle = window.getComputedStyle(userProfileButtonsRef);
  const userProfileButtonsMobileRef = document.getElementById("userProfileButtonsMobile");
  if (userProfileButtonsStyle.display === "none") {
    userProfileButtonsRef.style.display = "flex";
    userProfileButtonsMobileRef.style.backgroundColor = "#29abe2";
  }
}

document.addEventListener("click", (event) => {
  const userProfileButtonsMobileRef = document.getElementById("userProfileButtonsMobile");
  if (!userProfileButtonsMobileRef) return;
  const contactListComputedStyle = window.getComputedStyle(contactListRef);
  if (contactListComputedStyle.display === "none") {
    if (event.target.id != "userProfileButtonsMobile" && event.target.id != "userProfileButtonsMobileImg") {
      const userProfileButtonsRef = document.getElementById("userProfileButtons");
      userProfileButtonsRef.style.display = "none";
      setTimeout(() => {
        userProfileButtonsMobileRef.style.backgroundColor = "#2a3647";
      }, 500);
    }
  }
});

export async function renderContactDetails(id) {
  if (!id && contactDetailsRef) {
    contactDetailsRef.innerHTML = renderDetailsTemplateFallback();
    return;
  }
  let usersArray = await getUsersArray();
  let user = usersArray.find((user) => user[0] === id);
  if (contactDetailsRef) contactDetailsRef.innerHTML = renderDetailsTemplate(user);
}

export function renderAfterDelete(userId) {
  deleteChosenUser(userId);
  renderContactDetails();
  setInterval(() => {
    renderContactList();
  }, 100);
}

function renderDetailsTemplate(user) {
  return /*html*/ `
    
    
      <div class="contactDetailsBox">
        <div class="headings" >
            <span class="heading">Contacts</span>
            <span class="subHeading" >Better with a team</span>
            <div id="switchMobileButton" class="switchMobileButton" onclick="switchMobile()">${returnIcon("arrowLeft")}</div>            
        </div>  
         <div id="userDetailPanel" class="userDetailPanel">
          <div class="userQuickInfo">
              <div class="userInitials" style="background-color: ${user[1].user_color};" >
              ${user[1].profile.first_name.toUpperCase().charAt(0)}  ${user[1].profile.last_name.toUpperCase().charAt(0)}
              </div>
              <div class="userActions">
                  <div class="userName">
                  ${user[1].profile.first_name} ${user[1].profile.last_name}
                  </div>
                  <div id="userProfileButtons" class="userProfileButtons">
                      <button class="editButton" 
                      onclick="showEditChosenUserDialog('${user[1].id}')">${returnIcon("edit")}Edit</button>
                      <button class="deleteButton" onclick="showConfirmDeleteUserDialog('${user[1].id}')">${returnIcon("delete")}Delete</button>
                  </div>                
              </div>
          </div>
          <div class="contactInfo">
              <div class="heading">Contact Information</div>                    
          <div class="contactEmail">
              <div class="type">Email</div>
              <a href="mailto:${user[1].profile.email}">${user[1].profile.email}</a>            
          </div>
          <div class="contactPhone">
          <div class="type">Phone</div>
              <a href="tel:${user[1].profile.phone}">${user[1].profile.phone}</a>
          </div>
          </div>  
          <button onclick="userProfileButtonsMobile()" id="userProfileButtonsMobile" class="userProfileButtonsMobile">
            <img id="userProfileButtonsMobileImg" class="userProfileButtonsMobileImg" onclick="userProfileButtonsMobile()" src="./assets/icons/more_vert.png" alt="">
          </button>        
        </div>
      </div> 
    `;
}

function renderDetailsTemplateFallback() {
  return /*html*/ `
      
      <div class="contactDetailsBox" >
        <div class="headings" >
            <span class="heading">Contacts</span>
            <span class="subHeading" >Better with a team</span>
            <div id="switchMobileButton" class="switchMobileButton"  onclick="switchMobile()">${returnIcon("arrowLeft")}</div>
        </div>
      </div>
    `;
}
