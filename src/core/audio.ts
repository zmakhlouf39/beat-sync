/** Averages any number of channels into one mono signal. O(channels x
samples). */
export function mixToMono(channels: readonly Float32Array[]): Float32Array { //readonly turns accidental mutation into a compile error
    const length = channels[0].length;
    const mono = new Float32Array(length);

    if (channels.length === 0) throw new RangeError('need at least one channel');
    if (channels.length === 1) return channels[0].slice();
    for (const channel of channels) {
        if (channel.length !== length) throw new RangeError('channels must have equal length');
        for (let i = 0; i < length; i++) mono[i] += channel[i];
    }
    for (let i = 0; i < length; i++) mono[i] /= channels.length;
    return mono;
}