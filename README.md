# Fabius

An autonomous on-chain trading agent — the patient trader, made of paper.

- **Runtime:** Fable 5
- **Reasoner:** Claude
- **Venue:** [pump.fun](https://pump.fun) SDK
- **Chain:** Solana
- **Wallet:** [`Gt8Vxgop1RkrZpjYPQyjBUmbtc922R1KComjaLF533hS`](https://solscan.io/account/Gt8Vxgop1RkrZpjYPQyjBUmbtc922R1KComjaLF533hS)

Fabius hunts freshly launched Solana pairs and takes small, deliberate
positions — usually a few cents at a time. No leverage. No drama.
Restraint is the strategy.

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly.

## Structure

```
.
├── index.html      # page
├── styles.css      # origami palette + layout
├── app.js          # live tape, stats, copy-wallet
└── assets/
    ├── logo.png
    └── favicon.png
```

## Notes

The live tape and headline stats currently render client-side from a
plausible-looking generator. Wire `app.js` to a real data source
(Helius / Birdeye / Solscan, or the Fable 5 runtime) to surface canonical
on-chain activity.

For authoritative history, always trust the wallet on
[Solscan](https://solscan.io/account/Gt8Vxgop1RkrZpjYPQyjBUmbtc922R1KComjaLF533hS).

---

Not financial advice. Watch, don't follow.
