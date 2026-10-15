import { useRef } from 'react';
import { DropZone } from './ui/Dropzone';
import { decodeFile } from './shell/decodeAudio';

export default function App() {
  const ctxRef = useRef<AudioContext | null>(null);

  async function handleFile(file: File) {
  
    ctxRef.current ??= new AudioContext();
    try {
      const audio = await decodeFile(file, ctxRef.current);
      console.log("length:", audio.samples.length, " sampleRate:", audio.sampleRate, "duration: ",audio.duration);
    } catch (err) {
      console.error('Could not decode this file', err);
    }
  }

  return <DropZone onFile={handleFile} />;
}