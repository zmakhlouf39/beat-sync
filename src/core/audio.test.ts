import { describe, expect, it } from 'vitest';
import { mixToMono } from './audio.ts';
describe('mixToMono', () => {
it('averages channels', () => {
const mono = mixToMono([new Float32Array([1, 0, -1]), new Float32Array([0, 0, 1])]);
expect(Array.from(mono)).toEqual([0.5, 0, 0]);
});
});