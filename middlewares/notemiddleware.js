//handleNoteIdparam will give the noteId value
exports.handleNoteIdparam = (req, res, next, id) => {
  req.noteId = id;
  next();
};
