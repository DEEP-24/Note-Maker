const client = require("../configs/db");

//route to add a note
exports.addNote = (req, res) => {
  const { heading, content } = req.body;

  client
    .query(
      `INSERT INTO notes(email, heading, content) VALUES('${req.email}', '${heading}','${content}');`
    )
    .then((data) => {
      res.status(200).json({ message: "note added successfully" });
    })

    .catch((err) => {
      res.status(400).json({ message: "Database error occured" });
    });
};

//route to get all notes of a user
exports.getAllNotes = (req, res) => {
  client
    .query(`SELECT * FROM notes where email='${req.email}'`)
    .then((data) => {
      const noteData = data.rows;
      const filteredData = noteData.map((note) => {
        return {
          noteId: note.noteid,
          heading: note.heading,
          content: note.content,
        };
      });

      res
        .status(200)
        .json({ message: "notes received successfully", data: filteredData });
    })

    .catch((err) => {
      res.status(400).json({ message: "Database error occured" });
    });
};

//route to update a particular note
exports.updateNotes = (req, res) => {
  const noteId = req.noteId;
  const { heading, content } = req.body;
  client
    .query(
      `UPDATE notes SET heading='${heading}' , content='${content}' WHERE noteid='${noteId}'`
    )
    .then((data) => {
      res.status(200).json({ message: "success" });
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Database error occured" });
    });
};

//route to delete a particular note
exports.deleteNotes = (req, res) => {
  const noteId = req.noteId;
  const { heading, content } = req.body;
  client
    .query(`DELETE FROM notes WHERE noteid='${noteId}'`)
    .then((data) => {
      res.status(200).json({ message: "Note deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Database error occurred" });
    });
};

//route to get note by id
exports.getAllNotesById = (req, res) => {
  const noteId = req.params.noteId;
  client
    .query(`SELECT * FROM notes WHERE noteid='${noteId}'`)
    .then((data) => {
      data = data.rows[0];
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: "database error occured" });
    });
};
