const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
    return 'Notes...'
}

const addNote = function(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note) {
        return note.title == title
    })
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log(chalk.bgGreen("Success!"))
    }
    else{
        console.log(chalk.bgRed("Note title is not available."))
    }
}

const removeNote = function(title){
    const notes = loadNotes()
    const results = notes.filter(function(note) {
        return note.title !== title
    })
    if(notes.length > results.length){
        saveNotes(results)
        console.log(chalk.bgGreen("Success!"))
        
    }
    else{
        console.log(chalk.bgRed("Note was note found."))
    }
}

const listNotes = function(){
    const notes = loadNotes()
    notes.forEach(function(note) {
        console.log(chalk.italic(note.title))
    })
}

const readNote = function(title){
    const notes = loadNotes()
    const result = notes.find((note) => note.title === title)
    if(!result){
        console.log(chalk.bgRed("Note was not found."))
    }
    else{
        console.log(chalk.italic(result.title))
        console.log(result.body)
    }
}

const loadNotes = function() {
    try {
        const data = fs.readFileSync('notes.json')
        const dataJSON = data.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}