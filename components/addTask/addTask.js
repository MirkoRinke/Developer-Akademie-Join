import { openCloseDropdown } from "../addTask/userDropdown.js";
window.openCloseDropdown = openCloseDropdown;

let currentPrio = "medium";
let currentProgress = 0;
let currentStatus = "In progress";

export function getNewTaskTemplate() {
  let task = {
    id: "TASK" + Date.now(),
    title: document.getElementById("taskTitleInput").value,
    description: document.getElementById("taskDescription").value,
    assignedTo: { placeholder: "placeholder" },
    dueDate: document.getElementById("taskDueDate").value,
    creationDate: Date.now(),
    creatorId: "",
    priority: currentPrio,
    category: document.getElementById("taskCategory").innerText,
    categoryColor: "",
    progress: currentProgress,
    status: currentStatus,
    subtasks: {
      placeholder: "placeholder",
    },
  };
  // - assign selected users

  // - clear selected users
  return task;
}

// implement function!!! import selectedUsers(Array) from userDropdownlist.js
// change selectedUsers(Array) to an objact and assign it to getNewTaskTemplate

export function createNewSubtask(card, id) {
  if (card == "add") {
    createSubtaskFromAddTaskHTML();
    createSubtaskTemplate();
  }

  if (card == "edit") {
  }
}

export function createSubtaskFromAddTaskHTML() {
  let subtaskText = document.getElementById("subtaskInput").value;
  let subtaskListItem = document.createElement("li");
  subtaskListItem.innerText = subtaskText;
  document.getElementById("subtaskContainer").appendChild(subtaskListItem);
  return subtaskText;
}

function createSubtaskTemplate() {
  let subtaskID = "SUBTASK" + Date.now();
  let newSubtask = {
    subtaskID: {
      creationDate: Date.now(),
      creatorId: "",
      id: subtaskID,
      isDone: false,
      task: createSubtaskFromAddTaskHTML(),
    },
  };
  console.log(newSubtask);
}

// #subtaskInput
// #subtaskContainer

export function selectPrio(event) {
  if (event.target == document.getElementById("prioUrgent")) {
    removePrio();
    document.getElementById("prioUrgent").classList.add("urgentPrio");
    currentPrio = "Urgent";
  } else if (event.target == document.getElementById("prioMedium")) {
    removePrio();
    document.getElementById("prioMedium").classList.add("mediumPrio");
    currentPrio = "Medium";
  } else if (event.target == document.getElementById("prioLow")) {
    removePrio();
    document.getElementById("prioLow").classList.add("lowPrio");
    currentPrio = "Low";
  }
}

export function removePrio() {
  document.getElementById("prioUrgent").classList.remove("urgentPrio");
  document.getElementById("prioMedium").classList.remove("mediumPrio");
  document.getElementById("prioLow").classList.remove("lowPrio");
}

export function selectCategory(selectedCategory) {
  document.getElementById("taskCategory").innerText = selectedCategory;
  document.getElementById("categoryDropdownArrow").classList.toggle("rotatedArrow");
  document.getElementById("categorySelectionContainer").classList.toggle("d_none");
}

export async function getFilteredUsersArray() {
  // wir bauen ein array aus
}
