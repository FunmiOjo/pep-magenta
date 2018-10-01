// https://github.com/tensorflow/magenta-js/tree/master/music/checkpoints
// https://github.com/tensorflow/tfjs/issues/424
// https://github.com/tensorflow/magenta-js/blob/master/music/demos/common.ts
const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv'
const improvRNN = new mm.MusicRNN(improvCheckpoint)

const synth = new Tone.DuoSynth().toMaster()
const { Note } = Tonal

const notes = [
  'F4', 'G4', 'G#4', 'C5', 'D#5', 'C#5', 'C5', 'G#4', 'F4', 'D#5', 'C5', 'B4', 'E5', 'B4', 'G4', 'E4', 'A5', 'C5', 'B5', 'F5', 'C5', 'B4', 'G4', 'D#4', 'G4', 'E4', 'E5', 'C#5', 'C5', 'E5', 'C5', 'B4', 'G4', 'A#4', 'G4', 'B4', 'G4', 'D#4', 'G4', 'E4', 'C4', 'B3'
  ]

const notesWithoutOctaves = notes.map(note => note.slice(0, note.length - 1))
//console.log(notesWithoutOctaves)
const notesWithNoRepeats = notesWithoutOctaves.filter((note, index) => {
  notesWithoutOctaves.indexOf(note) === index
})

// console.log(notes.map((note, index) => {
//     return { pitch: Note.midi(note), quantizedStartStep: index * 0.5, quantizedEndStep: (index + 1) * 0.5 }
//     }))

const sequence = {
  ticksPerQuarter: 220,
  totalTime: notes.length * 0.5,
  timeSignatures: [
    {
      time: 0,
      numerator: 3,
      denominator: 4
    }
  ],
  tempos: [
    {
      time: 0,
      qpm: 120
    }
  ],
  notes: notes.map((note, index) => {
    return { pitch: Note.midi(note), startTime: index * 0.5, endTime: (index + 1) * 0.5 }
    })
}

const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 4)
const startProgram = async () => {
  try {
    //await melodyRNN.initialize()
    console.log('improv', melodyRNN)
    //let generatedMelody = await melodyRNN.continueSequence(quantizedSequence, 80)
    //console.log('generatedMelody', generatedMelody)
    //notes.forEach((note, index) => synth.triggerAttackRelease(note, 0.5, index))
    //generatedMelody.notes.forEach((note, index) => synth.triggerAttackRelease(note.pitch, 0.5, index))
    await improvRNN.initialize()
    let improvisedMelody = await improvRNN.continueSequence(quantizedSequence, 160, 1.1, ['Dm', 'Cm', 'Em', 'Gm'])
    console.log('improvisedMelody', improvisedMelody)
    improvisedMelody.notes.forEach((note, index) => {
      synth.triggerAttackRelease(Note.fromMidi(note.pitch), '4n', index)
    })
  } catch (error) {
    console.error(error)
  }
}

console.log(notes.length)
startProgram()
