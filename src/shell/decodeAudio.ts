import { mixToMono } from "../core/audio.ts";

export interface DecodedAudio {
    readonly buffer: AudioBuffer; // kept for playback
    readonly samples: Float32Array; // mono copy for analysis and drawing
    readonly sampleRate: number;
    readonly duration: number;  // seconds
}

/** Shell code: browser APIs only, no maths. decodeAudioData resamples to ctx.sampleRate. */
export async function decodeFile(file: File, ctx: AudioContext):
Promise<DecodedAudio> {
const bytes = await file.arrayBuffer();
const buffer = await ctx.decodeAudioData(bytes); // rejects on unsupported or corrupt files
const channels = Array.from({ length: buffer.numberOfChannels }, (_, c) => buffer.getChannelData(c));
return { buffer, samples: mixToMono(channels), sampleRate:
buffer.sampleRate, duration: buffer.duration };
}