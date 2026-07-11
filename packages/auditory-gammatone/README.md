# @audio/auditory-gammatone [![npm](https://img.shields.io/npm/v/@audio/auditory-gammatone)](https://www.npmjs.com/package/@audio/auditory-gammatone) [![MIT](https://img.shields.io/badge/MIT-%E0%A5%90-white)](https://github.com/krishnized/license)

Gammatone auditory filter — 4th-order cochlear model, in-place

```
npm install @audio/auditory-gammatone
```

```js
import gammatone from '@audio/auditory-gammatone'
```

Cochlear-model bandpass: a cascade of complex one-pole filters (`order` stages, default 4) with pole bandwidth `b = 2π*1.019*ERB(fc)` (Patterson et al., "Complex sounds and auditory images", Auditory Physiology and Perception, 1992), gain-normalized so the response is 0 dB at `fc`.

**Processor, NOT a design function** — unlike Bark/ERB/mel/octave in this family, gammatone takes and returns an audio buffer: `gammatone(data, params)`, matching the filter/eq family's `fn(data, params)` in-place convention. Pick `fc` per band from [`@audio/auditory-erb`](https://www.npmjs.com/package/@audio/auditory-erb)'s output, or call directly with a known center frequency.

```js
gammatone(data, { fc: 1000, fs: 44100 })       // single band, in-place

let params = { fc: 1000, fs: 44100, order: 4 }
gammatone(chunk1, params)
gammatone(chunk2, params)                      // continues chunk1's filter state
```

| Param | Default | |
|---|---|---|
| `fc` | `1000` | Center frequency Hz |
| `fs` | `44100` | Sample rate Hz |
| `order` | `4` | Cascade order — number of one-pole stages |

Gain normalization and pole state are cached on `params` (`_`-prefixed fields) across calls — reuse the same `params` object across chunks for a continuous stream; pass a fresh object to reset state.

**Use when:** filtering actual audio through a single cochlear-model band, e.g. one band picked from `auditory-erb`'s output. For computing a whole bank's layout, see `auditory-bark`/`auditory-erb`/`auditory-mel`/`auditory-octave` instead.

---

Part of [@audio/auditory](https://github.com/audiojs/auditory) — the auditory family umbrella.

MIT © [audiojs](https://github.com/audiojs)
