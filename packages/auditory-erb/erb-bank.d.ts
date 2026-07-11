/**
 * ERB-scale band centers and bandwidths (Glasberg & Moore 1990).
 *
 * Design function, not a stream processor: `erbBank(fs, opts) → bands`.
 * Positional `fs` first — a deliberate divergence from the filter/eq
 * family's `fn(data, params)` in-place convention. No buffer in, no buffer
 * out: returns band centers/bandwidths only. Does NO filtering — pair with
 * `@audio/auditory-gammatone` (one call per band, using each band's `fc`)
 * to actually filter audio.
 */

export interface ErbBankOptions {
  /** lowest band center Hz, default 50 */
  fmin?: number
  /** highest band center Hz, default min(16000, fs/2) */
  fmax?: number
  /** bands per ERB — step along the ERB-number axis is 1/density, default 1 */
  density?: number
}

/** One ERB-spaced band: center frequency and its equivalent rectangular bandwidth. */
export interface ErbBand {
  /** band center frequency Hz */
  fc: number
  /** equivalent rectangular bandwidth at fc Hz — ERB(f) = 24.7*(4.37*f/1000 + 1) */
  erb: number
}

/**
 * Generate ERB-spaced band center frequencies and bandwidths, equally
 * spaced on the ERB-number scale E(f) = 21.4*log10(4.37*f/1000 + 1) and
 * inverted back to Hz.
 * @param fs sample rate Hz, default 44100
 * @param opts fmin/fmax/density
 */
export default function erbBank(fs?: number, opts?: ErbBankOptions): ErbBand[]
