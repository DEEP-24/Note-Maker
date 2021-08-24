const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");
const updatenotecontainer = document.querySelector(".create-notes-container");
const client = require("../configs/db");
console.log(noteId);

const updateNoteButton = document.querySelector(".create-note-button");

const token = localStorage.getItem("jwt");

client.query(`SELECT FROM notes WHERE noteid='${noteId}'`).then((data) => {
  const updateheading = data.heading;
  const updatecontent = data.content;

  // console.log(updateheading, updatecontent);

  const insidehtml = `<div class="heading">Update Note</div><input maxlength="20" type="text placeholder='${updateheading}' class="create-note-heading" /><input maxlength="300" type="text" placeholder='${updatecontent}' class="create-note-input"/><div class="create-note-button">Update Note</div>`;
});

updateNoteButton.addEventListener("click", () => {
  const content = document.querySelector(".create-note-input").value;
  const heading = document.querySelector(".create-note-heading").value;

  if (token) {
    fetch(`/note/update/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ content, heading }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          location.href = "/pages/dashboard/dashboard.html";
        }
      })
      .catch((err) => {
        alert("Error Creating Note!! Re-try....");
        console.log(err);
      });
  }
});
