export function renderSidebar() {
  const sidebarRef = document.getElementById("sidebar");
  sidebarRef.innerHTML += renderSidebarTemplate();
}

const urlPath = window.location.pathname;

function renderSidebarTemplate() {
  return /*html*/ `
      <div>
          <img src="/assets/icons/joinLogo.png" />
      </div>
          <div class="sidebar-Block">
              <a  class="${urlPath === "/summary.html" ? "active" : ""}" href="/summary.html"><img src="/assets/icons/summaryicon.png" />Summary</a>
              <a  class="${urlPath === "/addTask.html" ? "active" : ""}" href="/addTask.html"><img src="/assets/icons/addTaskIcon.png" />Add Task</a>
              <a  class="${urlPath === "/board.html" ? "active" : ""}" href="/board.html"><img src="/assets/icons/boardicon.png" />Board</a>
              <a  class="${urlPath === "/contacts.html" ? "active" : ""}" href="/contacts.html"><img src="/assets/icons/contactIcon.png" />Contacts</a>
          </div>
          <div id="informations">
              <a id="privacyPolicy" href="/privacyPolicy.html">Privacy Policy</a>
              <a id="legalNotice" href="/legalNotice.html">Legal Notice</a>
      </div>
  `;
}
