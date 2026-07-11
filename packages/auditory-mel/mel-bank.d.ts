/**
 * Mel-frequency triangular filter bank (O'Shaughnessy 2000).
 *
 * Design function, not a stream processor: `melBank(fs, opts) → bands`.
 * Positional `fs` first — a deliberate divergence from the filter/eq
 * family's `fn(data, params)` in-place convention. No buffer in, no buffer
 * out: returns triangle descriptors, not biquad coefficients — apply the
 * triangular weights yourself (e.g. an MFCC front-end) against a magnitude
 * spectrum.
 */

export interface MelBankOptions {
  /** lowest band edge Hz, default 0 */
  fmin?: number
  /** highest band edge Hz, default fs/2 */
  fmax?: number
  /** number of mel filters, default 26 */
  nFilters?: number
}

/** One triangular mel filter: fLow/fHigh are the triangle's base, fc its peak. */
export interface MelBand {
  /** triangle peak frequency Hz */
  fc: number
  /** triangle lower base frequency Hz (previous band's fc) */
  fLow: number
  /** triangle upper base frequency Hz (next band's fc) */
  fHigh: number
  /** fc expressed on the mel scale — mel(f) = 2595*log10(1 + f/700) */
  mel: number
}

/**
 * Generate a mel-spaced triangular filter bank: nFilters+2 points equally
 * spaced on the mel scale between fmin/fmax, each band a triangle over
 * three consecutive points.
 * @param fs sample rate Hz, default 44100
 * @param opts fmin/fmax/nFilters
 */
export default function melBank(fs?: number, opts?: MelBankOptions): MelBand[]
