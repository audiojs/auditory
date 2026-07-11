# @audio/auditory-mel [![npm](https://img.shields.io/npm/v/@audio/auditory-mel)](https://www.npmjs.com/package/@audio/auditory-mel) [![MIT](https://img.shields.io/badge/MIT-%E0%A5%90-white)](https://github.com/krishnized/license)

Mel-frequency triangular filter bank

```
npm install @audio/auditory-mel
```

```js
import melBank from '@audio/auditory-mel'
```

`nFilters+2` points equally spaced on the mel scale `mel(f) = 2595*log10(1 + f/700)` (O'Shaughnessy, "Speech Communications: Human and Machine", IEEE Press, 2000) between `fmin`/`fmax`, each band a triangle over three consecutive points — the classic MFCC front-end bank.

**Design function, not a stream processor**: `melBank(fs, opts) → bands`. Positional `fs` first — a deliberate divergence from the filter/eq family's `fn(data, params)` in-place convention. No buffer in, no buffer out — it returns triangle descriptors, not biquad coefficients; apply the triangular weights yourself against a magnitude spectrum.

```js
melBank(44100)                                    // 26 mel filters, defaults
melBank(16000, { nFilters: 40, fmax: 8000 })       // MFCC-style 40-filter bank
```

| Param | Default | |
|---|---|---|
| `fmin` | `0` | Lowest band edge Hz |
| `fmax` | `fs/2` | Highest band edge Hz |
| `nFilters` | `26` | Number of mel filters |

**Use when:** MFCC/speech-recognition feature-extraction front-ends, or any mel-scale spectral binning.

---

Part of [@audio/auditory](https://github.com/audiojs/auditory) — the auditory family umbrella.

MIT © [audiojs](https://github.com/audiojs)
