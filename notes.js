const fs = require('fs')
const chalk = require('chalk')

module.exports = {
  // RETRIEVE ALL NOTES
  listAllNotes () {
    const allNotes = retrieveNotes()
    if (allNotes.notes.length > 0) {
      console.log(chalk.green('Your notes'))
      allNotes.notes.forEach(note => {
        console.log(note.title)
      })
    } else {
      console.log(chalk.green('No notes present !'))
    }
  },
  // READ A SPECIFIC NOTE
  readNote (title) {
    const allNotes = retrieveNotes()
    if (allNotes.notes.find(note => note.title === title)) {
      let specificNote = allNotes.notes.find(note => note.title === title)
      console.log(`${chalk.blue.bold('Title :')} ${specificNote.title}\n${chalk.blue.bold('Body :')} ${specificNote.body}`)
    } else {
      console.log(chalk.bgRed(`No note name '${title}'`))
    }
  },
  // ADD A NOTE
  addNote (title, body) {
    const allNotes = retrieveNotes()
    if (allNotes.notes.find(note => note.title === title)) {
      console.log(chalk.bgRed('Note already exists. Please try again'))
    } else {
      if (title.length > 0) {
        allNotes.notes.push({ title, body })
        saveNotes(allNotes)
        console.log(chalk.bgGreen.black.bold('Note successfully added'))
      } else {
        console.log(chalk.bgRed('Title cannot be empty'))
      }
    }
  },
  // REMOVE A NOTE
  removeNote (title) {
    const allNotes = retrieveNotes()
    if (allNotes.notes.find(note => note.title === title)) {
      allNotes.notes = allNotes.notes.filter(note => note.title !== title)
      saveNotes(allNotes)
      console.log(chalk.bgGreen.black.bold(`Note of title '${title}' successfully removed`))
    } else {
      console.log(chalk.bgRed(`No note named '${title}'`))
    }
  },
  // UPDATE A SPECIFIC NOTE
  updateNote (title, body) {
    const allNotes = retrieveNotes()
    if (allNotes.notes.find(note => note.title === title)) {
      let toBeUpdatedNoteIndex = allNotes.notes.findIndex(note => note.title === title)
      let toBeUpdatedNote = allNotes.notes.find(note => note.title === title)
      toBeUpdatedNote.body = body
      allNotes.notes.splice(toBeUpdatedNoteIndex, 1, toBeUpdatedNote)
      saveNotes(allNotes)
      console.log(chalk.bgGreen.black.bold(`Note of ${title} has been updated successfully with new text "${body}"`))
    } else {
      console.log(chalk.bgRed('No note named ', title))
    }
  }
}
// Common functions w.r.t file system
const retrieveNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('./notes.json')
    return JSON.parse(dataBuffer.toString())
  } catch (err) {
    return JSON.parse('{"notes": []}')
  }
}

const saveNotes = (notesArr) => {
  try {
    const notesArrJSON = JSON.stringify(notesArr)
    fs.writeFileSync('./notes.json', notesArrJSON)
  } catch (err) {
    console.log(err.code)
  }
}