/**
 * IEC 61260 fractional-octave filter bank at standard ISO 266 center
 * frequencies (fc = 1000 * G^(k/fraction), G = 10^(3/10)).
 *
 * Design function, not a stream processor: `octaveBank(fraction, fs,
 * opts) → bands`. Positional `fraction`, then `fs` — a deliberate
 * divergence from the filter/eq family's `fn(data, params)` in-place
 * convention. No buffer in, no buffer out: returns band descriptors. Feed
 * each band's `coefs` to `digital-filter`'s `filter()` to actually filter
 * audio through it.
 */

/** Normalized biquad coefficients (transposed direct form II). */
export interface BiquadCoef {
  b0: number
  b1: number
  b2: number
  a1: number
  a2: number
}

export interface OctaveBankOptions {
  /** lowest band center Hz, default 31.25 */
  fmin?: number
  /** highest band center Hz, default 16000 */
  fmax?: number
}

/** One fractional-octave band. */
export interface OctaveBand {
  /** ISO 266 standard center frequency Hz */
  fc: number
  /** constant-Q bandpass biquad coefficients at fc, Q = 1/(G^(1/2n) - G^(-1/2n)) */
  coefs: BiquadCoef
}

/**
 * Generate an IEC 61260 fractional-octave filter bank.
 * @param fraction octave fraction — 1 full octave, 3 for 1/3-octave, etc, default 3
 * @param fs sample rate Hz, default 44100
 * @param opts fmin/fmax band-center clamp
 */
export default function octaveBank(fraction?: number, fs?: number, opts?: OctaveBankOptions): OctaveBand[]
