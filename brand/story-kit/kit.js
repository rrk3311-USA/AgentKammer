/* Story kit config loader.
   Precedence (lowest to highest): template defaults, window.KIT_CONFIG (injected by shoot.mjs from a JSON file), URL params.
   Fills every [data-slot="key"] element with cfg[key] as plain text. Elements marked data-optional are hidden when empty.
   Date: set cfg.date as YYYY-MM-DD. Derived keys: weekday, weekdayShort, mdy ("September 29, 2026"),
   dateLong ("Tuesday, September 29, 2026"), dateShort ("Tue, Sep 29, 2026"). Any derived key can be overridden. */
(function(){
  function todayISO(){ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  window.applyKitConfig = function(defaults){
    const cfg = Object.assign({}, defaults || {}, window.KIT_CONFIG || {});
    new URLSearchParams(location.search).forEach((v,k)=>{ cfg[k]=v; });
    const iso = cfg.date || todayISO();
    const [y,m,d] = iso.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m-1, d));
    const f = o => new Intl.DateTimeFormat('en-US', Object.assign({timeZone:'UTC'}, o)).format(dt);
    const derived = {
      weekday: f({weekday:'long'}), weekdayShort: f({weekday:'short'}),
      mdy: f({month:'long', day:'numeric', year:'numeric'}),
      dateLong: f({weekday:'long', month:'long', day:'numeric', year:'numeric'}),
      dateShort: f({weekday:'short', month:'short', day:'numeric', year:'numeric'})
    };
    for (const k in derived) if (cfg[k] == null || cfg[k] === '') cfg[k] = derived[k];
    document.querySelectorAll('[data-slot]').forEach(el => {
      const v = cfg[el.dataset.slot];
      if (v == null || String(v).trim() === '') { if (el.hasAttribute('data-optional')) el.hidden = true; }
      else el.textContent = String(v);
    });
    document.querySelectorAll('[data-show-if]').forEach(el => {
      const v = cfg[el.dataset.showIf]; if (v == null || String(v).trim() === '') el.hidden = true;
    });
    const dashes = /[\u2013\u2014]/;
    for (const k in cfg) if (typeof cfg[k] === 'string' && dashes.test(cfg[k])) console.warn('KIT: en/em dash in', k);
    window.__KIT_CFG = cfg;
    return cfg;
  };
})();
