import ffmpeg from 'ffmpeg.js';
var toWav = require('audiobuffer-to-wav');

export async function convertBlobToAudio(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const buffer = reader.result as ArrayBuffer;

      const audioContext = new (window.AudioContext ||
        // @ts-ignore
        window.webkitAudioContext)();

      const audioBuffer =
        buffer && (await audioContext.decodeAudioData(buffer));

      // Convert to WAV
      const wavBuffer = toWav(audioBuffer);

      // Optionally, you can further compress or manipulate the audio here using ffmpeg.js
      // Compress audio using ffmpeg.js
      // ffmpeg({
      //   MEMFS: [{ name: 'input.wav', data: wavBuffer }],
      //   arguments: [
      //     '-i',
      //     'input.wav',
      //     '-codec:a',
      //     'libmp3lame', // Compression codec
      //     '-q:a',
      //     '2', // Quality (0-9), 2 is a good balance between size and quality
      //     '-y', // Overwrite output files without asking
      //     'output.mp3',
      //   ],
      //   // Enable logging
      //   print: function (data) {
      //     console.log(data);
      //   },
      //   printErr: function (data) {
      //     console.error(data);
      //   },
      //   onExit: function (code) {
      //     if (code === 0) {
      //       // Read the compressed audio file
      //       const outputData = ffmpeg.FS('readFile', 'output.mp3');
      //       // Resolve with the compressed audio Blob
      //       resolve(new Blob([outputData], { type: 'audio/mp3' }));
      //     } else {
      //       reject(new Error('ffmpeg.js conversion failed'));
      //     }
      //   },
      // });

      // Resolve with the WAV blob
      resolve(new Blob([wavBuffer], { type: 'audio/wav' }));
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(blob);
  });
}
