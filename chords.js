const { chord }  = require('tonal-detect')
const notes = [
  'F4',
  'G4',
  'G#4',
  'C5',
  'D#5',
  'C#5',
  'C5',
  'G#4',
  'F4',
  'D#5',
  'C5',
  'B4',
  'E5',
  'B4',
  'G4',
  'E4',
  'A5',
  'C5',
  'B5',
  'F5',
  'C5',
  'B4',
  'G4',
  'D#4',
  'G4',
  'E4',
  'E5',
  'C#5',
  'C5',
  'E5',
  'C5',
  'B4',
  'G4',
  'A#4',
  'G4',
  'B4',
  'G4',
  'D#4',
  'G4',
  'E4',
  'C4',
  'B3'
  ]

const notesWithoutOctaves = notes.map(note => note.slice(0, note.length - 1))
//console.log(notesWithoutOctaves)
const notesWithNoRepeats = notesWithoutOctaves.filter((note, index) => {
  notesWithoutOctaves.indexOf(note) === index
})

function detectChord(notes) {
  notes = notes.map(n => Tonal.Note.pc(Tonal.Note.fromMidi(n.note))).sort()
  return Tonal.PcSet.modes(notes)
    .map((mode, i) => {
      const tonic = Tonal.Note.name(notes[i])
      const names = Tonal.Dictionary.chord.names(mode)
      return names.length ? tonic + names[0] : null
    })
    .filter(x => x)
}

console.log(detectChord(notesWithNoRepeats))
console.log(chord(notesWithNoRepeats))

