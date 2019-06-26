const chalk = require('chalk')
const yargs = require('yargs')
// Yargs is process.argv on steroids. It basically allows us to parse command line args which has double hyphens
const notes = require('./notes')
// Retreiving notes file

yargs.version("1.0.1") // This can be used to mention the package's version number

// Adding 'add' command
yargs.command({
  command: 'add',
  builder: {
    // Title for the note (required)
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    },
    // Message of the note (required)
    body: {
      describe: 'Message of the note',
      demandOption: true,
      type: 'string'
    } 
  },
  describe: 'Add a new note',
  handler: (argv) => notes.addNote(argv.title, argv.body)
})

// Adding 'remove' command
yargs.command({
  command: 'remove',
  builder: {
    // Title required to remove the note
    title: {
      demandOption: true,
      type: 'string',
      describe: 'Title of the note'
    }
  },
  describe: 'Remove a specific note',
  handler: (argv) => notes.removeNote(argv.title)
})

// Adding 'list' command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: () => notes.listAllNotes()
})

// Adding 'update' command
yargs.command({
  command: 'update',
  describe: 'Update a specific note',
  builder: {
    title: {
      demandOption: true,
      type: 'string',
      describe: 'Title to be found'
    },
    body: {
      demandOption: true,
      type: 'string',
      describe: 'Updated body for the note'
    }
  },
  handler: (argv) => notes.updateNote(argv.title, argv.body)
})

// Adding 'read' command
yargs.command({
  command: 'read',
  describe: 'Read a specific note',
  handler: (argv) => notes.readNote(argv.title),
  builder: {
    title: {
      demandOption: true,
      describe: 'Title of the note',
      type: 'string'
    }
  }
})

// Allows yargs to parse all the command written above
yargs.parse()
