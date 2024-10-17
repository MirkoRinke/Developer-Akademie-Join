import { returnIcon } from "../icons.js";
import { getUsersArray, getTasksArray } from "../../js/script.js";

// The function below is a placeholder until we have the real data structure
// and can fetch the data from the database to render the task detail view.
export async function renderTaskDetailView() {
  let taskID = "TASK3757435747"; // Temporary task ID
  let tasksArray = await getTasksArray(); // Fetch tasks array
  let assignedUsers = await renderAssignedUser(taskID, tasksArray); // Fetch assigned users for the task and render them
  let subtasks = await renderSubtasks(taskID, tasksArray); // Fetch subtasks for the task and render them
  const taskDetailViewRef = document.getElementById("taskDetailView"); // Get task detail view element
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  if (taskDetailViewRef && taskData) taskDetailViewRef.innerHTML = renderTaskDetailViewTemplate(taskData, assignedUsers, subtasks); // Render the task detail view template with the task data, assigned users and subtasks
}

// The function find the assigned users for a task and returns the user data
// for each user assigned to the task.
export async function getAssignedUsersData(taskID, tasksArray) {
  let usersArray = await getUsersArray(); // Fetch users array
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const assignedTo = Object.values(taskData.assignedTo); // Get the assigned users for the task
  const assignedUsers = [];
  assignedTo.forEach((userId) => {
    // Find the user data for each user assigned to the task and push it to the assignedUsers array
    const user = usersArray.find((usersGroup) => usersGroup[1].id === userId);
    if (user) assignedUsers.push(user[1]);
  });
  return assignedUsers;
}

// The function toggles the task detail view on and off
export function toggleTaskDetailView() {
  const taskDetailViewRef = document.getElementById("taskDetailView");
  taskDetailViewRef.classList.toggle("d_none");
}

// The function renders the assigned users for a task and returns the user data as HTML
async function renderAssignedUser(taskID, tasksArray) {
  let assignedUsers = await getAssignedUsersData(taskID, tasksArray); // Fetch assigned users for the task and render them
  let userListHTML = "";
  assignedUsers.forEach((user) => {
    if (user) {
      userListHTML += /*html*/ `
        <li class="userName">
          <span class="userInitials" style="background-color: ${user.user_color}">
            ${user.profile.initials}
          </span>
          ${user.profile.first_name} ${user.profile.last_name}
        </li>
      `;
    }
  });
  return userListHTML;
}

// The function renders the subtasks for a task and returns the subtasks as HTML
async function renderSubtasks(taskID, tasksArray) {
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const subtasks = Object.values(taskData.subtasks); // Get the subtasks for the task
  let subtasksListHTML = "";
  subtasks.forEach((subtask) => {
    // Render the subtasks as HTML and push them to the subtasksListHTML
    if (subtask) {
      subtasksListHTML += /*html*/ `
        <li class="subtask" id="subtasksID${subtask.id}">
          <input 
            onchange="checkedSubtask(event,'${taskID}')" 
            type="checkbox" 
            name="${subtask.id}" 
            id="${subtask.id}" 
            class="checkboxSubtask" 
            ${subtask.isDone ? "checked" : ""}>
          ${subtask.task}
        </li>
      `;
    }
  });
  return subtasksListHTML;
}

// The function checks a subtask and updates the task data with the new subtask status
// and returns the updated task data
export async function checkedSubtask(event, taskID) {
  let tasksArray = await getTasksArray(); // Fetch tasks array to get the task data for the task ID
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  let checkboxId = event.target.id; // Get the checkbox ID the checkbox is the subtask ID
  let isChecked = event.target.checked; // Get the status of the checkbox
  const foundSubtask = taskData.subtasks[checkboxId]; // Find the subtask in the task data with the subtask ID
  if (foundSubtask) foundSubtask.isDone = isChecked; // Update the subtask status with the new status
  // pushToDatabase(taskData); // The is a example function to push the updated task data to the database. The Funktion is not implemented yet.
}

// The function renders the task detail view template with the subtasks and assigned users data
function renderTaskDetailViewTemplate(currentTask, assignedUsers, subtasks) {
  return /*html*/ `
    <div class="taskDetailViewCard">
        <div class="header"> 
            <div class="category" style="background-color: ${currentTask.categoryColor}">${currentTask.category}</div>
            <div onclick="toggleTaskDetailView()" class="closeButton">${returnIcon("closeX")}</div>
        </div>
        <div class="title">${currentTask.title}</div>
        <div class="description">${currentTask.description}</div>
        <div class="dueDate"><span>Due date:</span>${currentTask.dueDate}</div>
        <div class="priority"><span>Priority:</span>${currentTask.priority}</div>
        <div class="assignedTo">
        <span>Assigned To:</span>
        <ul class="userNames">
            ${assignedUsers}
        </ul>
        <div class="subtasks">
        <span>Subtasks</span>
          <ul>
              ${subtasks}
          </ul>
        </div>
        <div class="buttons">
            <button class="deleteButton">${returnIcon("delete")}Delete</button>
            <button class="editButton">${returnIcon("edit")}Edit</button>        
            </div>
        </div>
    </div>  
    `;
}