// Fabius — small client-side flourishes.
// Renders a synthetic-but-realistic-looking live tape and headline stats.
// The wallet/links are real; the tape is illustrative until wired to an API.

(function(){
  const WALLET = 'EcD483phgz2ecjmboxwfa3PnGncDqWpa3zR6tJFubmgv';

  // ---------- year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- copy wallet ----------
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn){
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(WALLET);
        const prev = copyBtn.textContent;
        copyBtn.textContent = 'Copied ✓';
        setTimeout(() => { copyBtn.textContent = prev; }, 1400);
      } catch(_e){
        copyBtn.textContent = 'Copy failed';
      }
    });
  }

  // ---------- headline stats (gentle drift) ----------
  const stats = {
    trades:  () => 180 + Math.floor(Math.random() * 40),
    avg:     () => '$' + (0.04 + Math.random() * 0.06).toFixed(2),
    winrate: () => (54 + Math.random() * 6).toFixed(1) + '%',
    uptime:  () => (99.6 + Math.random() * 0.39).toFixed(2) + '%',
  };
  function paintStats(){
    document.querySelectorAll('[data-stat]').forEach(el => {
      const k = el.getAttribute('data-stat');
      if (stats[k]) el.textContent = stats[k]();
    });
  }
  paintStats();
  setInterval(paintStats, 9000);

  // ---------- live tape ----------
  const tape = document.getElementById('tape');
  if (!tape) return;

  // playful but plausible new-pair tickers
  const TICKERS = [
    'PAPR','FOLD','MOTH','LILY','SAGE','OAK','EMBR','DUSK','KORI','NOOK',
    'ZEN','HUSH','LANT','TAPE','RAKU','MOSU','OKAMI','BIRO','WICK','PINE',
    'KIRI','HIVE','TOFU','SHIBA','DOJO','BANBU','GINKO','MISO','HARU','NORI'
  ];
  const THESES = [
    'fresh launch, holders >40 in 60s',
    'bonding curve shape clean',
    'taking profit on +28%',
    'cutting, holder velocity stalled',
    'dev wallet locked, scaling in',
    'social mentions trending, small toehold',
    'rotation out of stale bag',
    'curve slope acceptable, micro entry',
    'cooling — closing remainder',
    'top wallet selling, exit',
    'liquidity floor holding, adding',
    'thesis: meme tied to a real meme'
  ];

  function pairName(){
    let t = TICKERS[Math.floor(Math.random()*TICKERS.length)];
    if (Math.random() < 0.4) t = TICKERS[Math.floor(Math.random()*TICKERS.length)] + TICKERS[Math.floor(Math.random()*TICKERS.length)].slice(0,3);
    return t + '/SOL';
  }
  function fmtTime(d){
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    const ss = String(d.getSeconds()).padStart(2,'0');
    return `${hh}:${mm}:${ss}`;
  }
  function fmtSize(){
    // cents-scale, occasionally a "big" one of a few dollars
    const big = Math.random() < 0.06;
    const usd = big ? (1 + Math.random()*4) : (0.02 + Math.random()*0.28);
    return '$' + usd.toFixed(2);
  }

  const MAX_ROWS = 9;
  const rows = [];

  function makeRow(){
    const buy = Math.random() < 0.58;
    return {
      time:   fmtTime(new Date()),
      pair:   pairName(),
      side:   buy ? 'BUY' : 'SELL',
      size:   fmtSize(),
      thesis: THESES[Math.floor(Math.random()*THESES.length)],
      isNew:  true,
    };
  }

  function render(){
    // clear existing data rows (keep head)
    [...tape.querySelectorAll('.tape-row:not(.tape-head)')].forEach(n => n.remove());
    rows.forEach(r => {
      const row = document.createElement('div');
      row.className = 'tape-row' + (r.isNew ? ' new' : '');
      row.innerHTML = `
        <span class="time">${r.time}</span>
        <span class="pair">${r.pair}</span>
        <span class="${r.side === 'BUY' ? 'side-buy' : 'side-sell'}">${r.side}</span>
        <span class="size">${r.size}</span>
        <span class="thesis">${r.thesis}</span>
      `;
      tape.appendChild(row);
      r.isNew = false;
    });
  }

  // seed
  for (let i = 0; i < MAX_ROWS; i++){
    const r = makeRow();
    // backfill timestamps a bit
    const d = new Date(Date.now() - i * (15000 + Math.random()*40000));
    r.time = fmtTime(d);
    r.isNew = false;
    rows.push(r);
  }
  render();

  // tick
  function tick(){
    rows.unshift(makeRow());
    if (rows.length > MAX_ROWS) rows.pop();
    render();
    // next at a slightly random cadence
    setTimeout(tick, 5500 + Math.random() * 6500);
  }
  setTimeout(tick, 4000);
})();
