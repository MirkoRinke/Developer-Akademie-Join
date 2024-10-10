const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

import { getNewUser, hideAddNewUserDialog, getEditUserObject, newUserFeedback } from "../components/contactModal/contactModal.js";

// export let usersArray = [];

export async function addContact() {
  await patchNewUser();
  await loadUsers();
  hideAddNewUserDialog();
  newUserFeedback();
}

export async function deleteChosenUser(id) {
  await deleteUserData(id);
  await loadUsers();
}

async function deleteUserData(id) {
  let path = `/user/${id}`;
  let response = await fetch(baseUrl + path + ".json", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}

async function patchNewUser() {
  let newUser = getNewUser();
  let id = newUser.id;
  let response = await fetch(baseUrl + "/user/" + id + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}

export async function editExistingUser(id, user) {
  getEditUserObject(id, user);
}

export async function loadUsers() {
  let response = await fetch(baseUrl + ".json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  let responseAsJson = await response.json();
  let users = Object.entries(responseAsJson.user);
  return users;
}
