const chalk = require('chalk');
const fs = require('fs');
const { title } = require('process');

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added'));
  } else console.log(chalk.red.inverse('Note title taken!'));
};

const removeNote = title => {
  const log = console.log;
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length !== notesToKeep.length) {
    log(chalk.bgGreen(`'${title} note' was removed.`));
    saveNotes(notesToKeep);
  } else log(chalk.bgRed(`'${title} note' was not found.`));

  /* Personal solution
  const position = notes.findIndex(note => note.title === title);
  if (position > 0) {
    notes.splice(position, position);
    saveNotes(notes);
    console.log(`${title} note was removed.`);
  }
   */
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.cyan.inverse('Your notes...'));
  if (notes.length === 0) console.log(chalk.inverse.red('[]'));
  notes.forEach(note => console.log(chalk.cyan(`${note.title}`)));
};

const readNote = title => {
  const notes = loadNotes();
  const foundNote = notes.find(note => note.title === title);
  if (foundNote) {
    console.log(chalk.cyan(foundNote.title));
    console.log(foundNote.body);
  } else console.log(chalk.bgRed(`'${title}' note not found.`));
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// returns array of notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

// module.exports = getNotes;
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
