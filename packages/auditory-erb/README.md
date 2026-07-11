# @audio/auditory-erb [![npm](https://img.shields.io/npm/v/@audio/auditory-erb)](https://www.npmjs.com/package/@audio/auditory-erb) [![MIT](https://img.shields.io/badge/MIT-%E0%A5%90-white)](https://github.com/krishnized/license)

ERB-scale band centers and bandwidths (Glasberg & Moore 1990) — no filtering

```
npm install @audio/auditory-erb
```

```js
import erbBank from '@audio/auditory-erb'
```

Band centers equally spaced on the ERB-number scale `E(f) = 21.4*log10(4.37*f/1000 + 1)`, inverted back to Hz, each paired with its equivalent rectangular bandwidth `ERB(f) = 24.7*(4.37*f/1000 + 1)` (Glasberg & Moore, "Derivation of auditory filter shapes from notched-noise data", Hearing Research 47, 1990).

**Design function, not a stream processor**: `erbBank(fs, opts) → bands`. Positional `fs` first — a deliberate divergence from the filter/eq family's `fn(data, params)` in-place convention. No buffer in, no buffer out — and unlike its Bark/mel/octave siblings, it does **no filtering at all**: it returns `{fc, erb}` pairs only, no `coefs`. Pair with `@audio/auditory-gammatone` (one call per band, using each `fc`) to actually filter audio.

```js
erbBank(44100)                    // ERB-spaced bands, defaults
erbBank(44100, { density: 2 })    // double band density
```

| Param | Default | |
|---|---|---|
| `fmin` | `50` | Lowest band center Hz |
| `fmax` | `min(16000, fs/2)` | Highest band center Hz |
| `density` | `1` | Bands per ERB — step along the ERB-number axis is `1/density` |

**Use when:** perceptually-uniform frequency sampling for auditory-model front-ends or excitation-pattern analysis, without committing to a filter shape.

---

Part of [@audio/auditory](https://github.com/audiojs/auditory) — the auditory family umbrella.

MIT © [audiojs](https://github.com/audiojs)
