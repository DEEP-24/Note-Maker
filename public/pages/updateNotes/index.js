const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");
const updatenotecontainer = document.querySelector(".create-notes-container");
console.log(noteId);

const updateNoteButton = document.querySelector(".create-note-button");

const token = localStorage.getItem("jwt");

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
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          location.href = "/pages/dashboard/dashboard.html";
        }
      })
      .catch(err => {
        alert("Error Creating Note!! Re-try....");
        console.log(err);
      });
  }
});

window.addEventListener("load", () => {
  if (token) {
    fetch(`/note/getnote/${noteId}`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        data = data.data;
        document.querySelector(".create-note-heading").value = data.heading;
        document.querySelector(".create-note-input").value = data.content;
      });
  }
});
