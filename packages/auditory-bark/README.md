# @audio/auditory-bark [![npm](https://img.shields.io/npm/v/@audio/auditory-bark)](https://www.npmjs.com/package/@audio/auditory-bark) [![MIT](https://img.shields.io/badge/MIT-%E0%A5%90-white)](https://github.com/krishnized/license)

Bark-scale critical-band filter bank (Zwicker & Terhardt 1980)

```
npm install @audio/auditory-bark
```

```js
import barkBank from '@audio/auditory-bark'
```

24 Zwicker critical bands (Zwicker & Terhardt, "Analytical expressions for critical-band rate and critical bandwidth as a function of frequency", JASA 68, 1980), edges fixed at the standard table `20, 100, 200, 300, ..., 12000, 15500` Hz. Each band's center is the geometric mean of its edges, `fc = sqrt(fLow*fHigh)`, and its `coefs` are a bandpass biquad at `fc` with `Q = fc/(fHigh-fLow)`.

**Design function, not a stream processor**: `barkBank(fs, opts) → bands`. Positional `fs` first — a deliberate divergence from the filter/eq family's `fn(data, params)` in-place convention. No buffer in, no buffer out; it returns band descriptors. Feed each band's `coefs` to `digital-filter`'s `filter()` to actually filter audio through it.

```js
barkBank(44100)                                // 24 bands, defaults
barkBank(44100, { fmin: 100, fmax: 8000 })      // restrict to a sub-range
```

| Param | Default | |
|---|---|---|
| `fmin` | `20` | Lowest band edge Hz; a caller-supplied value below the table's first edge is honored (band 1's `fLow`), not clamped up |
| `fmax` | `min(15500, fs/2)` | Highest band edge Hz |

**Use when:** fixed 24-band Bark-scale decomposition for critical-band loudness/masking models or perceptual audio coding.

---

Part of [@audio/auditory](https://github.com/audiojs/auditory) — the auditory family umbrella.

MIT © [audiojs](https://github.com/audiojs)
