/**
 * Gammatone auditory filter (cochlear model) — cascade of complex one-pole
 * filters (4th-order by default), gain-normalized to 0 dB at fc.
 *
 * Processor, NOT a design function — unlike bark/erb/mel/octave in this
 * family, gammatone takes and returns an audio buffer: `gammatone(data,
 * params)`, matching the filter/eq family's `fn(data, params)` in-place
 * convention. Pick fc per band from `@audio/auditory-erb`'s output, or
 * call directly with a known center frequency.
 */

export interface GammatoneParams {
  /** center frequency Hz, default 1000 */
  fc?: number
  /** sample rate Hz, default 44100 */
  fs?: number
  /** cascade order — number of one-pole stages, default 4 */
  order?: number
  /** internal: cached gain-normalization and pole/state fields (`_gain`, `_fc`, `_order`, `_fs`, `_s`), persisted across calls on the same params object — do not set */
  [key: string]: unknown
}

/**
 * Apply the gammatone filter in-place and return the same buffer. Persists
 * pole state and cached gain normalization on `params` (fields prefixed
 * `_`) across calls — reuse the same `params` object across chunks for a
 * continuous stream; pass a fresh object to reset state.
 */
export default function gammatone<T extends Float32Array | Float64Array | number[]>(data: T, params: GammatoneParams): T
