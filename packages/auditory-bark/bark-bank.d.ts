/**
 * Bark-scale critical-band filter bank (Zwicker & Terhardt 1980).
 *
 * Design function, not a stream processor: `barkBank(fs, opts) → bands`.
 * Positional `fs` first — a deliberate divergence from the filter/eq
 * family's `fn(data, params)` in-place convention. No buffer in, no buffer
 * out: returns band descriptors. Feed each band's `coefs` to
 * `digital-filter`'s `filter()` to actually filter audio through it.
 */

/** Normalized biquad coefficients (transposed direct form II). */
export interface BiquadCoef {
  b0: number
  b1: number
  b2: number
  a1: number
  a2: number
}

export interface BarkBankOptions {
  /** lowest band edge Hz; honored even below the table's first edge instead of clamped up, default 20 */
  fmin?: number
  /** highest band edge Hz, default min(15500, fs/2) */
  fmax?: number
}

/** One Zwicker critical band. */
export interface BarkBand {
  /** Bark number, 1-24 */
  bark: number
  /** band lower edge Hz */
  fLow: number
  /** band upper edge Hz */
  fHigh: number
  /** band center frequency Hz, geometric mean sqrt(fLow*fHigh) */
  fc: number
  /** bandpass biquad coefficients at fc, Q = fc/(fHigh-fLow) */
  coefs: BiquadCoef
}

/**
 * Generate the Bark-scale filter bank — up to 24 Zwicker critical bands
 * clamped to fmin/fmax/Nyquist.
 * @param fs sample rate Hz, default 44100
 * @param opts fmin/fmax band-edge clamp
 */
export default function barkBank(fs?: number, opts?: BarkBankOptions): BarkBand[]
