# @audio/auditory-octave [![npm](https://img.shields.io/npm/v/@audio/auditory-octave)](https://www.npmjs.com/package/@audio/auditory-octave) [![MIT](https://img.shields.io/badge/MIT-%E0%A5%90-white)](https://github.com/krishnized/license)

IEC 61260 fractional-octave filter bank

```
npm install @audio/auditory-octave
```

```js
import octaveBank from '@audio/auditory-octave'
```

Standard ISO 266 center frequencies, `fc = 1000 * G^(k/fraction)` with `G = 10^(3/10)` (IEC 61260-1:2014, "Electroacoustics — Octave-band and fractional-octave-band filters"), constant-Q bandpass biquads at each `fc` with `Q = 1/(G^(1/2n) - G^(-1/2n))`.

**Design function, not a stream processor**: `octaveBank(fraction, fs, opts) → bands`. Positional `fraction`, then `fs` — a deliberate divergence from the filter/eq family's `fn(data, params)` in-place convention. No buffer in, no buffer out; it returns band descriptors. Feed each band's `coefs` to `digital-filter`'s `filter()` to actually filter audio through it.

```js
octaveBank()                                      // 1/3-octave, defaults (fraction=3, fs=44100)
octaveBank(1, 48000)                               // full-octave bank at 48kHz
octaveBank(3, 44100, { fmin: 100, fmax: 8000 })     // restrict range
```

| Param | Default | |
|---|---|---|
| `fraction` | `3` | Octave fraction — `1` full octave, `3` = 1/3-octave, `6` = 1/6-octave, etc. |
| `fs` | `44100` | Sample rate Hz |
| `opts.fmin` | `31.25` | Lowest band center Hz |
| `opts.fmax` | `16000` | Highest band center Hz |

**Use when:** fixed constant-percentage-bandwidth analysis at standard ISO center frequencies — RTA/spectrum analyzers, room-acoustics measurement.

---

Part of [@audio/auditory](https://github.com/audiojs/auditory) — the auditory family umbrella.

MIT © [audiojs](https://github.com/audiojs)
