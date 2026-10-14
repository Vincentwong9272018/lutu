/* Lutu 旅途 — 智能旅遊小助手 */
(() => {
  const KEY = "lutu.v1";
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  const ICONS = {
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    plane: '<path d="M2 12h8l-2 8 12-8H12l2-8z"/>',
    map: '<polygon points="1 6 9 2 15 6 23 2 23 18 15 22 9 18 1 22 1 6"/><line x1="9" y1="2" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="22"/>',
    bag: '<path d="M6 8h12l1 13H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    gift: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
    wallet: '<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M16 12h4"/>',
    bed: '<path d="M2 20v-8a2 2 0 0 1 2-2h16v10"/><path d="M2 18h20"/><path d="M6 10V6a2 2 0 0 1 2-2h4"/>',
    train: '<rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M8 19l-2 3"/><path d="M16 19l2 3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    coin: '<circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9.5c1.5-1 6-1 6 1.5s-4 2-4 3.5 3.5 2 6 1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
    back: '<polyline points="15 18 9 12 15 6"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.7 1 1.2 1.7 1.3H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    up: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    spark: '<path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/><path d="M19 15l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.1l2.4-2.4a5 5 0 0 0-7.1-7.1L11 5"/><path d="M14 11a5 5 0 0 0-7.5-.1L4.1 13.3a5 5 0 0 0 7.1 7.1L13 19"/>',
    swap: '<path d="M16 3l4 4-4 4"/><path d="M20 7H4"/><path d="M8 21l-4-4 4-4"/><path d="M4 17h16"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.6 2z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    print: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.5 9a9 9 0 0 1 14.8-3.3L23 10M1 14l4.7 4.3A9 9 0 0 0 20.5 15"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>',
  };

  function icon(name, size = 18) {
    const p = ICONS[name] || ICONS.more;
    return `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  }

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const state = {
    trips: [],
    settings: {
      homeCurrency: "HKD",
      aiMode: "netlify",
      customEndpoint: "http://127.0.0.1:1234/v1/chat/completions",
      customModel: "",
      customKey: "",
      theme: "day",
    },
    view: "home",
    tripId: null,
    tab: "overview",
    sub: { lists: "packing", money: "spend", guide: "info", journalDay: null, journalView: "day" },
    homeQuery: "",
    spotQuery: "",
    filter: "all",
    busy: null,
    rates: null,
    currencies: [],
  };

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "null");
      if (raw?.trips) state.trips = raw.trips;
      if (raw?.settings) state.settings = { ...state.settings, ...raw.settings };
    } catch {}
    document.documentElement.dataset.theme = state.settings.theme === "night" ? "night" : "day";
  }
  function persist() {
    localStorage.setItem(KEY, JSON.stringify({ trips: state.trips, settings: state.settings }));
  }
  function trip() {
    return state.trips.find((t) => t.id === state.tripId) || null;
  }
  function saveTrip(t, rerender = true) {
    t.updatedAt = Date.now();
    const i = state.trips.findIndex((x) => x.id === t.id);
    if (i >= 0) state.trips[i] = t;
    else state.trips.unshift(t);
    persist();
    if (rerender) render();
  }

  const photoURLs = {};
  let photoCtx = null;
  let searchTimer = 0;
  function searchField(id, placeholder, value) {
    return `<div class="search-wrap">
      <input id="${id}" type="text" lang="zh-Hant" inputmode="text" enterkeyhint="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${esc(
        placeholder
      )}" value="${esc(value || "")}">
    </div>`;
  }
  function isSearchBox(el) {
    return el && (el.id === "home-q" || el.id === "spot-q");
  }
  function homeResultsHtml(q) {
    const query = String(q || "").trim();
    if (!query) return "";
    const hits = state.trips.flatMap((tr) => spotsList(tr, query).map(({ it, idx }) => ({ tr, it, idx })));
    if (!hits.length) return `<div class="card empty"><p>搵唔到「${esc(query)}」嘅回憶。</p></div>`;
    return hits.map(({ tr, it, idx }) => spotCard(tr, it, idx, { showTrip: true })).join("");
  }
  function paintSearchResults(from) {
    if (from === "home-q" || from === "home") {
      const box = $("#home-results");
      if (!box) return;
      const html = homeResultsHtml(state.homeQuery);
      box.innerHTML = html;
      box.hidden = !html;
      hydratePhotos();
      return;
    }
    const t = trip();
    const box = $("#spot-results");
    if (!t || !box) return;
    const list = spotsList(t, state.spotQuery);
    box.innerHTML = list.map(({ it, idx }) => spotCard(t, it, idx)).join("") || spotsEmpty(state.spotQuery);
    hydratePhotos();
  }
  function applySearchBox(el) {
    if (!isSearchBox(el)) return;
    if (el.id === "home-q") state.homeQuery = el.value;
    else state.spotQuery = el.value;
    paintSearchResults(el.id);
  }
  function openMediaDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open("lutu-media", 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains("photos")) req.result.createObjectStore("photos");
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  async function putPhoto(id, blob) {
    const db = await openMediaDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction("photos", "readwrite");
      tx.objectStore("photos").put(blob, id);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }
  async function getPhoto(id) {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("photos", "readonly");
      const req = tx.objectStore("photos").get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }
  async function removePhoto(id) {
    if (photoURLs[id]) {
      URL.revokeObjectURL(photoURLs[id]);
      delete photoURLs[id];
    }
    const db = await openMediaDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction("photos", "readwrite");
      tx.objectStore("photos").delete(id);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }
  async function photoSrc(id) {
    if (photoURLs[id]) return photoURLs[id];
    const blob = await getPhoto(id);
    if (!blob) return "";
    photoURLs[id] = URL.createObjectURL(blob);
    return photoURLs[id];
  }
  async function hydratePhotos() {
    const imgs = $$("[data-photo]");
    for (const img of imgs) {
      const src = await photoSrc(img.dataset.photo);
      if (src) img.src = src;
    }
  }
  function compressImage(file, max = 1600, quality = 0.72) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (Math.max(w, h) > max) {
          const s = max / Math.max(w, h);
          w = Math.round(w * s);
          h = Math.round(h * s);
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            blob ? resolve(blob) : reject(new Error("壓縮失敗"));
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("相片無法讀取"));
      };
      img.src = url;
    });
  }
  function mapsSearch(loc) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`;
  }
  function mapsTransit(from, to) {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=transit`;
  }
  function itemsForDay(t, day) {
    return (t.itinerary || [])
      .filter((i) => String(i.day) === String(day))
      .sort((a, b) => String(a.time).localeCompare(String(b.time)));
  }
  function timeToMin(s) {
    const [h, m] = String(s || "00:00").split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  }
  function todayFocus(t) {
    const st = tripStatus(t);
    const day = st === "now" ? currentDayIndex(t) : 1;
    const items = itemsForDay(t, day);
    let current = null;
    let next = null;
    if (st === "now") {
      const mins = new Date().getHours() * 60 + new Date().getMinutes();
      for (const it of items) {
        if (timeToMin(it.time) <= mins) current = it;
        else {
          next = it;
          break;
        }
      }
    } else {
      next = items[0] || null;
    }
    const nextIdx = next ? items.indexOf(next) : -1;
    const rest = nextIdx >= 0 ? items.slice(nextIdx) : st === "now" && current && !next ? [] : items.slice(0, 4);
    return { st, day, items, current, next, rest };
  }
  function todayShareText(t) {
    const focus = todayFocus(t);
    const day = focus.st === "past" ? tripDays(t) : focus.day;
    const date = dateOfDay(t, day);
    const items = itemsForDay(t, day);
    const lines = [`${t.destination} · 第 ${day} 日（${niceDate(date)}）`, ""];
    if (!items.length) lines.push("今日未有行程項目。");
    items.forEach((it) => {
      lines.push(`${it.time}  ${it.content}`);
      if (it.location) lines.push(`地圖：${mapsSearch(it.location)}`);
      lines.push("");
    });
    lines.push("— 由 Lutu 旅途分享");
    return lines.join("\n");
  }
  function photoGrid(ids, ctx) {
    const list = ids || [];
    return `<div class="photo-grid">
      ${list
        .map(
          (id) => `<div class="photo-cell">
            <img data-photo="${esc(id)}" alt="" data-act="view-photo" data-id="${esc(id)}">
            <button type="button" class="photo-x" data-act="del-photo" data-id="${esc(id)}" data-kind="${esc(ctx.kind)}" data-parent="${esc(
            ctx.parent || ""
          )}">${icon("x", 12)}</button>
          </div>`
        )
        .join("")}
      <button type="button" class="photo-add" data-act="pick-photo" data-kind="${esc(ctx.kind)}" data-parent="${esc(ctx.parent || "")}" data-day="${esc(
      ctx.day || ""
    )}">${icon("camera", 22)}<span>加相片</span></button>
    </div>`;
  }
  function starsHtml(rating, dataAttrs) {
    return `<div class="stars" role="group" aria-label="體驗評分">${[1, 2, 3, 4, 5]
      .map(
        (n) =>
          `<button type="button" class="${n <= (rating || 0) ? "on" : ""}" ${dataAttrs} data-n="${n}">${icon("star", 22)}</button>`
      )
      .join("")}</div>`;
  }
  function hasMem(it) {
    return !!(it && (it.memory || it.rating || (it.photoIds || []).length));
  }
  function memStars(n) {
    n = Number(n) || 0;
    return n ? "★".repeat(n) + "☆".repeat(5 - n) : "";
  }
  async function clearItemMemory(it) {
    if (!it) return;
    for (const id of it.photoIds || []) {
      try {
        await removePhoto(id);
      } catch {}
    }
    it.memory = "";
    it.rating = 0;
    it.photoIds = [];
  }
  function openMemory(idx) {
    const t = trip();
    const it = t?.itinerary?.[idx];
    if (!it) return;
    it.photoIds = it.photoIds || [];
    const date = dateOfDay(t, it.day);
    openModal(`
      <p class="kicker" style="color:var(--muted)">第 ${esc(it.day)} 日 · ${esc(it.time)} · ${niceDate(date)}</p>
      <h3>${esc(it.content)}</h3>
      ${it.location ? `<p class="help">${esc(it.location)}</p>` : ""}
      <div class="help" style="margin-top:8px">體驗評分</div>
      ${starsHtml(it.rating, `data-act="rate-item" data-idx="${idx}"`)}
      <form class="form" data-submit="save-memory" style="margin-top:12px">
        <input type="hidden" name="idx" value="${idx}">
        <div class="field"><label>呢個景點記低</label>
          <textarea name="memory" placeholder="排隊幾耐、好唔好食、值唔值得返、小貼士…">${esc(it.memory || "")}</textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-act="close-modal">取消</button>
          <button type="submit" class="btn btn-primary">儲存回憶</button>
        </div>
      </form>
      <div class="help" style="margin-top:8px">相片</div>
      ${photoGrid(it.photoIds, { kind: "item", parent: it.id })}
      ${
        hasMem(it)
          ? `<button type="button" class="btn btn-danger btn-block" style="margin-top:14px" data-act="del-memory" data-idx="${idx}">${icon(
              "trash",
              14
            )} 刪除評論</button>`
          : ""
      }`);
    hydratePhotos();
  }
  function spotsList(t, q) {
    const query = String(q || "").trim().toLowerCase();
    return (t.itinerary || [])
      .map((it, idx) => ({ it, idx }))
      .filter(({ it }) => {
        if (!hasMem(it)) return false;
        if (!query) return true;
        return [it.content, it.location, it.memory, it.type].join(" ").toLowerCase().includes(query);
      })
      .sort((a, b) => Number(a.it.day) - Number(b.it.day) || String(a.it.time).localeCompare(String(b.it.time)));
  }
  function spotsEmpty(q) {
    return `<div class="card empty"><p>${
      String(q || "").trim() ? "搵唔到呢個回憶。" : "未有景點評論。去行程撳「記低」先寫。"
    }</p></div>`;
  }
  function spotCard(t, it, idx, { showTrip } = {}) {
    const thumbs = (it.photoIds || []).slice(0, 3);
    return `<article class="card card-pad mem-card" data-act="open-memory" data-trip="${esc(t.id)}" data-idx="${idx}">
      <div class="mem-card-top">
        <div>
          <div class="help">${showTrip ? esc(t.destination) + " · " : ""}第 ${esc(it.day)} 日 · ${esc(it.time)}${
      it.type ? " · " + esc(it.type) : ""
    }</div>
          <h4>${esc(it.content)}</h4>
        </div>
        ${
          hasMem(it)
            ? `<button type="button" class="icon-btn danger" title="刪除評論" data-act="del-memory" data-trip="${esc(
                t.id
              )}" data-idx="${idx}">${icon("trash", 16)}</button>`
            : ""
        }
      </div>
      ${it.location ? `<div class="help">${esc(it.location)}</div>` : ""}
      ${it.rating ? `<div class="mem-stars">${memStars(it.rating)}</div>` : ""}
      ${
        it.memory
          ? `<p class="mem-snip">${esc(it.memory)}</p>`
          : hasMem(it)
            ? ""
            : `<p class="help">未有記低 · 撳入去寫</p>`
      }
      ${
        thumbs.length
          ? `<div class="mem-thumbs">${thumbs.map((id) => `<img data-photo="${esc(id)}" alt="">`).join("")}</div>`
          : ""
      }
    </article>`;
  }
  function journalOf(t, day, create) {
    t.journal = t.journal || [];
    let j = t.journal.find((x) => String(x.day) === String(day));
    if (!j && create) {
      j = { id: uid(), day: String(day), text: "", rating: 0, photoIds: [] };
      t.journal.push(j);
    }
    return j;
  }
  function tripPhotoIds(t) {
    const ids = [];
    (t.tickets || []).forEach((tk) => (tk.photoIds || []).forEach((id) => ids.push(id)));
    (t.journal || []).forEach((j) => (j.photoIds || []).forEach((id) => ids.push(id)));
    (t.itinerary || []).forEach((it) => (it.photoIds || []).forEach((id) => ids.push(id)));
    return ids;
  }

  function parseLocal(date, time = "00:00") {
    const [y, m, d] = date.split("-").map(Number);
    const [hh, mm] = (time || "00:00").split(":").map(Number);
    return new Date(y, m - 1, d, hh || 0, mm || 0);
  }
  function tripDays(t) {
    const a = parseLocal(t.startDate);
    const b = parseLocal(t.endDate);
    return Math.max(1, Math.round((b - a) / 86400000) + 1);
  }
  function dateOfDay(t, day) {
    const d = parseLocal(t.startDate);
    d.setDate(d.getDate() + (Number(day) - 1));
    return d;
  }
  function ymd(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function niceDate(d) {
    if (!(d instanceof Date)) d = parseLocal(d);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }
  function weekday(d) {
    return "日一二三四五六"[d.getDay()];
  }
  function tripStatus(t) {
    const now = new Date();
    const a = parseLocal(t.startDate, t.startTime || "00:00");
    const b = parseLocal(t.endDate, t.endTime || "23:59");
    if (now < a) return "upcoming";
    if (now > b) return "past";
    return "now";
  }
  function daysUntil(t) {
    const a = parseLocal(t.startDate, t.startTime || "00:00");
    return Math.ceil((a - new Date()) / 86400000);
  }
  function currentDayIndex(t) {
    const now = new Date();
    const a = parseLocal(t.startDate);
    a.setHours(0, 0, 0, 0);
    const i = Math.floor((now - a) / 86400000) + 1;
    return Math.min(Math.max(i, 1), tripDays(t));
  }
  function destCurrency(dest) {
    const d = (dest || "").toLowerCase();
    if (/日本|東京|大阪|京都|北海道|福岡|沖繩|札幌|名古屋|tokyo|osaka|kyoto|japan/.test(d)) return "JPY";
    if (/韓國|首爾|釜山|濟州|korea|seoul/.test(d)) return "KRW";
    if (/台灣|台北|高雄|台中|taiwan|taipei/.test(d)) return "TWD";
    if (/中國|內地|上海|北京|深圳|廣州|成都|杭州|china/.test(d)) return "CNY";
    if (/泰國|曼谷|清邁|布吉|thailand|bangkok/.test(d)) return "THB";
    if (/新加坡|singapore/.test(d)) return "SGD";
    if (/馬來|吉隆坡|malaysia/.test(d)) return "MYR";
    if (/越南|河內|胡志明|vietnam/.test(d)) return "VND";
    if (/英國|倫敦|uk|london/.test(d)) return "GBP";
    if (/美國|紐約|洛杉磯|夏威夷|usa|new york/.test(d)) return "USD";
    if (/歐|巴黎|羅馬|米蘭|巴塞|德國|法國|意大利|西班牙|荷蘭/.test(d)) return "EUR";
    if (/澳洲|悉尼|墨爾本|australia/.test(d)) return "AUD";
    if (/澳門|macau/.test(d)) return "MOP";
    if (/香港|hong kong/.test(d)) return "HKD";
    return "JPY";
  }
  function packingProgress(t) {
    const list = t.packing || [];
    if (!list.length) return 0;
    return Math.round((list.filter((x) => x.done).length / list.length) * 100);
  }
  function guessCoverColor(name) {
    const palettes = [
      ["#1f6b63", "#c24d2c"],
      ["#2c4a7c", "#c9923a"],
      ["#7a3b4a", "#d7a15a"],
      ["#3d5a3a", "#c45c26"],
      ["#4a3b73", "#e07a55"],
    ];
    let h = 0;
    for (const c of name || "") h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return palettes[h % palettes.length];
  }

  /* ---------- toasts / modal / busy ---------- */
  let toastTimer;
  function toast(msg) {
    const root = $("#toast-root");
    root.innerHTML = `<div class="toast">${esc(msg)}</div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (root.innerHTML = ""), 2400);
  }
  function setBusy(title, msg) {
    state.busy = { title, msg };
    drawBusy();
  }
  function clearBusy() {
    state.busy = null;
    drawBusy();
  }
  function drawBusy() {
    let el = $("#busy");
    if (!state.busy) {
      el?.remove();
      return;
    }
    if (!el) {
      el = document.createElement("div");
      el.id = "busy";
      el.className = "busy-overlay";
      document.body.appendChild(el);
    }
    el.innerHTML = `<div class="busy-card">
      <div class="spinner"></div>
      <h3 style="font-family:var(--display);margin:0 0 8px">${esc(state.busy.title)}</h3>
      <p class="help">${esc(state.busy.msg || "請稍候…")}</p>
    </div>`;
  }
  function closeModal() {
    $("#modal-root").innerHTML = "";
  }
  function openModal(html) {
    $("#modal-root").innerHTML = `<div class="modal-back"><div class="modal" data-stop="1">${html}</div></div>`;
  }
  function formModal({ title, fields, submit = "儲存", extra = "" }) {
    const body = fields
      .map((f) => {
        const id = "f_" + f.name;
        const val = f.value ?? "";
        let input = "";
        if (f.type === "select") {
          input = `<select id="${id}" name="${f.name}">${(f.options || [])
            .map((o) => {
              const v = typeof o === "string" ? o : o.v;
              const l = typeof o === "string" ? o : o.l;
              return `<option value="${esc(v)}" ${v == val ? "selected" : ""}>${esc(l)}</option>`;
            })
            .join("")}</select>`;
        } else if (f.type === "textarea") {
          input = `<textarea id="${id}" name="${f.name}" placeholder="${esc(f.placeholder || "")}">${esc(val)}</textarea>`;
        } else {
          input = `<input id="${id}" name="${f.name}" type="${f.type || "text"}" value="${esc(val)}" placeholder="${esc(
            f.placeholder || ""
          )}" ${f.required ? "required" : ""} ${f.step ? `step="${f.step}"` : ""}>`;
        }
        return `<div class="field ${f.half ? "half" : ""}"><label>${esc(f.label)}</label>${input}</div>`;
      })
      .join("");
    const halves = fields.some((f) => f.half);
    openModal(`
      <h3>${esc(title)}</h3>
      <form class="form ${halves ? "cols" : ""}" data-submit="form-ok">
        ${body}
        ${extra ? `<div class="extra">${extra}</div>` : ""}
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-act="close-modal">取消</button>
          <button class="btn btn-primary">${esc(submit)}</button>
        </div>
      </form>`);
  }
  function readForm(form) {
    const data = {};
    new FormData(form).forEach((v, k) => (data[k] = String(v)));
    return data;
  }
  let pendingForm = null;
  function confirmModal(title, msg, ok = "確定") {
    return new Promise((resolve) => {
      pendingForm = { kind: "confirm", resolve };
      openModal(`
        <h3>${esc(title)}</h3>
        <p class="help">${esc(msg)}</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-act="confirm-no">取消</button>
          <button class="btn btn-accent" data-act="confirm-yes">${esc(ok)}</button>
        </div>`);
    });
  }

  /* ---------- APIs ---------- */
  async function callAI(messages, temperature = 0.7) {
    const s = state.settings;
    const isCustom = s.aiMode === "custom";
    const url = isCustom ? s.customEndpoint || "http://127.0.0.1:1234/v1/chat/completions" : "/.netlify/functions/chat";
    const headers = { "Content-Type": "application/json" };
    if (isCustom && s.customKey) headers.Authorization = "Bearer " + s.customKey;
    const body = isCustom
      ? { model: s.customModel || "local-model", messages, temperature }
      : { messages, temperature };
    const resp = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("AI 回覆無法解析");
    }
    if (!resp.ok) throw new Error(data.error || data.message || `AI 錯誤 (${resp.status})`);
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error("AI 沒有回傳內容");
    return text;
  }

  const SYS = "你係香港旅遊規劃助手。用繁體中文，口吻自然精簡。地點必須係 Google Maps 搜得到嘅真實地名或地址，唔好加括號說明，唔好用 Markdown。";

  async function fetchRates() {
    try {
      const base = state.settings.homeCurrency || "HKD";
      const data = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`).then((r) => r.json());
      if (data.result === "success" && data.rates) {
        state.rates = data.rates;
        state.rates[base] = 1;
        state.currencies = Object.keys(state.rates).sort();
        return;
      }
    } catch {}
    try {
      const data = await fetch("https://api.frankfurter.dev/v1/latest?from=USD").then((r) => r.json());
      state.rates = data.rates || {};
      state.rates[data.base || "USD"] = 1;
      state.currencies = Object.keys(state.rates).sort();
    } catch {
      state.rates = { HKD: 1, USD: 0.13, JPY: 19, EUR: 0.12, CNY: 0.92, TWD: 4, KRW: 175, THB: 4.2 };
      state.currencies = Object.keys(state.rates);
    }
  }
  function convert(amount, from, to) {
    if (!state.rates) return 0;
    const a = Number(amount) || 0;
    const rf = state.rates[from];
    const rt = state.rates[to];
    if (!rf || !rt) return 0;
    return (a / rf) * rt;
  }

  function weatherIcon(code) {
    if (code <= 1) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌧️";
    if (code <= 86) return "❄️";
    if (code >= 95) return "⛈️";
    return "🌈";
  }
  async function fetchWeather(t, silent) {
    if (!silent) setBusy("查天氣", `正在獲取「${t.destination}」7 日預報…`);
    try {
      let lat = t.lat, lon = t.lon;
      if (lat == null || lon == null) {
        const geo = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(t.destination)}&count=1&language=zh`
        ).then((r) => r.json());
        if (!geo.results?.[0]) throw new Error("找不到呢個目的地");
        lat = geo.results[0].latitude;
        lon = geo.results[0].longitude;
        t.lat = lat;
        t.lon = lon;
        t.country = geo.results[0].country;
        t.timezone = geo.results[0].timezone;
      }
      const w = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
      ).then((r) => r.json());
      t.weather = w.daily.time.slice(0, 7).map((date, i) => ({
        date: date.slice(5),
        icon: weatherIcon(w.daily.weathercode[i]),
        max: Math.round(w.daily.temperature_2m_max[i]),
        min: Math.round(w.daily.temperature_2m_min[i]),
        rain: w.daily.precipitation_probability_max?.[i] ?? null,
      }));
      saveTrip(t, !silent);
    } catch (e) {
      if (!silent) toast(e.message || "天氣獲取失敗");
    } finally {
      if (!silent) clearBusy();
    }
  }

  async function enrichTrip(t) {
    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(t.destination)}&count=1&language=zh`
      ).then((r) => r.json());
      if (geo.results?.[0]) {
        const g = geo.results[0];
        t.lat = g.latitude;
        t.lon = g.longitude;
        t.country = g.country;
        t.timezone = g.timezone;
      }
    } catch {}
    for (const lang of ["zh", "en"]) {
      if (t.cover && t.extract) break;
      try {
        const wiki = await fetch(
          `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(t.destination)}`
        ).then((r) => r.json());
        const img = wiki.originalimage?.source || wiki.thumbnail?.source;
        if (img && !t.cover) t.cover = img.split("?")[0];
        if (wiki.extract && !t.extract) t.extract = wiki.extract;
      } catch {}
    }
    saveTrip(t, true);
  }

  function getEmergency(dest) {
    const d = (dest || "").toLowerCase();
    const table = [
      [/日本|東京|大阪|京都|北海道|福岡|沖繩|札幌|japan|tokyo|osaka/, "【日本】\n警察 110\n火警／救護 119\n海上求救 118"],
      [/台灣|台北|高雄|台中|taiwan/, "【台灣】\n警察 110\n火警／救護 119"],
      [/韓國|首爾|釜山|濟州|korea|seoul/, "【韓國】\n警察 112\n火警／救護 119\n旅遊熱線 1330"],
      [/泰國|曼谷|清邁|布吉|thailand/, "【泰國】\n報警 191\n救護 1669\n旅遊警察 1155"],
      [/中國|內地|上海|北京|深圳|廣州|china/, "【中國內地】\n警察 110\n救護 120\n火警 119"],
      [/澳門|macau/, "【澳門】\n緊急 999 或 112"],
      [/香港|hong kong/, "【香港】\n緊急 999"],
      [/英國|倫敦|uk|london/, "【英國】\n緊急 999 或 112\n非緊急醫療 111"],
      [/美國|紐約|洛杉磯|夏威夷|usa/, "【美國】\n緊急 911"],
      [/澳洲|悉尼|墨爾本|australia/, "【澳洲】\n緊急 000"],
      [/馬來|吉隆坡|malaysia/, "【馬來西亞】\n緊急 999"],
      [/新加坡|singapore/, "【新加坡】\n警察 999\n火警／救護 995"],
      [/越南|vietnam/, "【越南】\n警察 113\n救護 115\n火警 114"],
      [/法國|巴黎|france/, "【法國】\n緊急 112\n警察 17\n救護 15"],
      [/意大利|羅馬|italy/, "【意大利】\n緊急 112"],
      [/西班牙|巴塞|spain/, "【西班牙】\n緊急 112"],
    ];
    for (const [re, text] of table) if (re.test(d)) return text;
    return "";
  }

  /* ---------- AI generators ---------- */
  function linesOf(text) {
    return String(text || "")
      .split(/\n/)
      .map((l) => l.replace(/^[\s`*-]+/, "").trim())
      .filter(Boolean);
  }

  async function genItinerary(t, replace = true) {
    const days = tripDays(t);
    const items = replace ? [] : t.itinerary.slice();
    for (let d = 1; d <= days; d++) {
      setBusy("AI 規劃行程", `正在為「${t.destination}」排第 ${d}／${days} 日…`);
      const arrive = d === 1 ? t.startTime || "14:00" : "09:00";
      const leave = d === days ? t.endTime || "18:00" : "21:00";
      const prompt = `目的地：${t.destination}
這是第 ${d} 日（共 ${days} 日）。當日可用時間 ${arrive} 至 ${leave}。
請安排 3 至 5 個真實景點或餐廳，路線要順路、可步行或大眾運輸。
餐廳必須寫出真實店名。
每行格式（用 | 分隔，不要其他文字）：
HH:MM|類型|項目名稱|GoogleMap地點
類型只可以係：景點、餐廳、交通、購物、其他`;
      const res = await callAI([
        { role: "system", content: SYS },
        { role: "user", content: prompt },
      ]);
      for (const line of linesOf(res)) {
        const p = line.split("|").map((x) => x.trim());
        if (p.length < 3) continue;
        const time = (p[0].match(/\d{1,2}:\d{2}/) || [])[0];
        if (!time) continue;
        const type = /景點|餐廳|交通|購物|其他/.test(p[1]) ? p[1] : "景點";
        const content = (p[2] || "").replace(/[*[\]#]/g, "").trim();
        const location = (p[3] || "").replace(/[()（）*[\]#]/g, "").trim();
        if (!content) continue;
        items.push({
          id: uid(),
          day: String(d),
          time: time.padStart(5, "0"),
          type,
          content,
          location,
          url: p[4] || "",
          notes: "",
          memory: "",
          rating: 0,
          photoIds: [],
        });
      }
    }
    t.itinerary = items;
    saveTrip(t, true);
  }

  async function genPacking(t) {
    setBusy("AI 行李清單", "正在按目的地同季節建議行李…");
    const res = await callAI([
      { role: "system", content: SYS },
      {
        role: "user",
        content: `去「${t.destination}」由 ${t.startDate} 到 ${t.endDate}，列出 16 件行李。每行：分類|物品名稱
分類只可以係：衣物、電子、盥洗、文件、其他。不要編號。`,
      },
    ]);
    t.packing = t.packing || [];
    for (const line of linesOf(res)) {
      const p = line.split("|").map((x) => x.trim());
      const cat = p.length > 1 ? p[0].replace(/[*\d.]/g, "") : "其他";
      const text = (p[1] || p[0] || "").replace(/[*\d.]/g, "").trim();
      if (text.length < 2) continue;
      t.packing.push({ id: uid(), cat: cat || "其他", text, qty: 1, done: false });
    }
    saveTrip(t, true);
  }

  async function genSouvenirs(t) {
    setBusy("AI 手信", "正在搵當地特色手信…");
    const res = await callAI([
      { role: "system", content: SYS },
      {
        role: "user",
        content: `去「${t.destination}」建議 8 款特色手信。每行：手信名稱|購買地點（商場、車站或店名，可留空）`,
      },
    ]);
    t.souvenirs = t.souvenirs || [];
    for (const line of linesOf(res)) {
      const p = line.split("|").map((x) => x.trim());
      const text = (p[0] || "").replace(/[*\d.]/g, "").trim();
      if (text.length < 2) continue;
      t.souvenirs.push({ id: uid(), text, location: p[1] || "", done: false });
    }
    saveTrip(t, true);
  }

  async function genNotes(t) {
    setBusy("AI 旅遊須知", "整理注意事項同緊急電話…");
    const exact = getEmergency(t.destination);
    const res = await callAI([
      { role: "system", content: SYS },
      {
        role: "user",
        content: exact
          ? `針對「${t.destination}」寫 6 條旅遊注意事項（簽證、交通卡、小費、插座、現金、文化）。每行一條，不要標題。`
          : `針對「${t.destination}」寫 6 條注意事項，然後用一行 --- 分隔，再寫當地警察同救護電話。`,
      },
    ]);
    if (exact) {
      t.notes = res.replace(/[*#]/g, "").trim();
      t.emergency = exact;
    } else {
      const parts = res.split(/---+|\|\|\|/);
      t.notes = (parts[0] || "").replace(/[*#]/g, "").trim();
      t.emergency = (parts[1] || "請自行查詢當地緊急電話").replace(/[*#]/g, "").trim();
    }
    saveTrip(t, true);
  }

  async function genPhrases(t) {
    setBusy("AI 旅行用語", "產生當地常用短句…");
    const res = await callAI([
      { role: "system", content: SYS },
      {
        role: "user",
        content: `去「${t.destination}」，列出 10 句旅行用語。每行：中文|當地語言|羅馬拼音或讀音
包括：你好、多謝、幾錢、廁所、唔該路、救命、唔辣、有素食嗎、呢個好好味、支票定現金。`,
      },
    ]);
    t.phrases = [];
    for (const line of linesOf(res)) {
      const p = line.split("|").map((x) => x.trim());
      if (p[0] && p[1]) t.phrases.push({ zh: p[0], local: p[1], reading: p[2] || "" });
    }
    saveTrip(t, true);
  }

  async function autoPlan(t) {
    try {
      await genItinerary(t, true);
      await genPacking(t);
      await genSouvenirs(t);
      await genNotes(t);
      await genPhrases(t);
      await fetchWeather(t, true);
      setBusy("完成", "行程已經規劃好。");
      await new Promise((r) => setTimeout(r, 600));
      toast("AI 規劃完成");
    } catch (e) {
      toast(e.message || "AI 規劃失敗。可喺設定檢查 API。");
    } finally {
      clearBusy();
      render();
    }
  }

  /* ---------- views ---------- */
  function coverStyle(t) {
    const [a, b] = guessCoverColor(t.destination);
    return `background:linear-gradient(135deg,${a},${b})`;
  }
  function coverImg(t, cls = "cover") {
    return t.cover
      ? `<img class="${cls}" src="${esc(t.cover)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">`
      : "";
  }

  function viewHome() {
    const filtered = state.trips.filter((t) => state.filter === "all" || tripStatus(t) === state.filter);
    const next = state.trips
      .filter((t) => tripStatus(t) !== "past")
      .sort((a, b) => parseLocal(a.startDate, a.startTime) - parseLocal(b.startDate, b.startTime))[0];

    const hero = next
      ? `<article class="card hero-card fade" data-act="open-trip" data-id="${next.id}" style="${coverStyle(next)}">
          ${coverImg(next)}
          <div class="veil"></div>
          ${
            tripStatus(next) === "upcoming"
              ? `<div class="countdown"><b>${Math.max(0, daysUntil(next))}</b><span>日後出發</span></div>`
              : `<div class="countdown"><b>D${currentDayIndex(next)}</b><span>進行中</span></div>`
          }
          <div class="hero-body">
            <p class="kicker">${tripStatus(next) === "now" ? "而家喺路上" : "下一趟旅程"}</p>
            <h2>${esc(next.destination)}</h2>
            <div class="hero-meta">
              <span class="chip">${icon("cal", 12)} ${esc(next.startDate)} → ${esc(next.endDate)}</span>
              ${next.country ? `<span class="chip">${esc(next.country)}</span>` : ""}
              ${
                tripStatus(next) === "now" && todayFocus(next).next
                  ? `<span class="chip">${esc(todayFocus(next).next.time)} ${esc(String(todayFocus(next).next.content).slice(0, 16))}</span>`
                  : ""
              }
            </div>
          </div>
        </article>`
      : `<article class="card empty fade">
          <div class="illus">${icon("compass", 72)}</div>
          <h4>旅程由一張白紙開始</h4>
          <p>新增目的地，Lutu 幫你排行程、執行李、換算匯率。</p>
          <button class="btn btn-primary" data-act="add-trip">${icon("plus")} 建立第一趟旅程</button>
        </article>`;

    const filters = [
      ["all", "全部"],
      ["upcoming", "即將出發"],
      ["now", "進行中"],
      ["past", "已結束"],
    ]
      .map(
        ([id, l]) =>
          `<button class="filter ${state.filter === id ? "on" : ""}" data-act="filter" data-id="${id}">${l}</button>`
      )
      .join("");

    const cards = filtered
      .map((t) => {
        const st = tripStatus(t);
        const label = st === "now" ? "進行中" : st === "upcoming" ? "即將出發" : "已結束";
        const pct = packingProgress(t);
        return `<article class="card trip-card" data-act="open-trip" data-id="${t.id}">
          <div class="thumb" style="${coverStyle(t)}">${coverImg(t, "")}</div>
          <div class="body">
            <h4>${esc(t.destination)}</h4>
            <p class="when">${esc(t.startDate)}　${tripDays(t)} 日</p>
            <div class="progress" title="行李 ${pct}%"><i style="width:${pct}%"></i></div>
            <div style="margin-top:8px"><span class="chip chip-ink">${label}</span></div>
          </div>
          <div class="trip-actions">
            <button type="button" class="icon-btn" title="匯出" data-act="export-trip" data-id="${t.id}">${icon("down", 16)}</button>
            <button type="button" class="icon-btn danger" title="刪除" data-act="delete-trip" data-id="${t.id}">${icon("trash", 16)}</button>
          </div>
        </article>`;
      })
      .join("");

    return `
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark"><img src="icons/icon-192.png" alt="Lutu"></div>
          <div>
            <h1>Lutu 旅途</h1>
            <p>智能旅遊小助手</p>
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="badge-local"><i class="dot"></i>本機儲存</span>
          <button class="icon-btn" data-act="settings" title="設定">${icon("gear")}</button>
        </div>
      </header>
      ${hero}
      ${searchField("home-q", "搵已有評論嘅景點回憶…", state.homeQuery)}
      <div id="home-results" class="mem-list" style="margin-bottom:16px" ${
        (state.homeQuery || "").trim() ? "" : "hidden"
      }>${homeResultsHtml(state.homeQuery)}</div>
      <div class="section-head">
        <h3>我的旅程</h3>
        <div style="display:flex;gap:8px">
          <button class="btn btn-soft btn-sm" data-act="import">${icon("up", 14)} 匯入</button>
          <button class="btn btn-primary btn-sm" data-act="add-trip">${icon("plus", 14)} 新增</button>
        </div>
      </div>
      ${
        state.trips.length
          ? `<div class="filters">${filters}</div>
      <div class="trip-list" style="margin-top:12px">
        ${cards || `<div class="card empty"><p>呢個分類暫時冇旅程。</p></div>`}
      </div>`
          : ""
      }`;
  }

  function tabsHtml() {
    const tabs = [
      ["overview", "總覽", "home"],
      ["itinerary", "行程", "map"],
      ["lists", "清單", "list"],
      ["money", "花費", "wallet"],
      ["stay", "出行", "bed"],
      ["journal", "日誌", "edit"],
      ["guide", "指南", "book"],
    ];
    return `<nav class="tabs">${tabs
      .map(
        ([id, l, ic]) =>
          `<button class="tab ${state.tab === id ? "on" : ""}" data-act="tab" data-id="${id}">${icon(ic, 16)}<span>${l}</span></button>`
      )
      .join("")}</nav>`;
  }

  function viewTrip(t) {
    const st = tripStatus(t);
    const count =
      st === "upcoming"
        ? `<div class="countdown"><b>${Math.max(0, daysUntil(t))}</b><span>日後出發</span></div>`
        : st === "now"
        ? `<div class="countdown"><b>D${currentDayIndex(t)}</b><span>今日</span></div>`
        : `<div class="countdown"><b>${tripDays(t)}</b><span>日回憶</span></div>`;
    const body = {
      overview: tabOverview,
      itinerary: tabItinerary,
      lists: tabLists,
      money: tabMoney,
      stay: tabStay,
      journal: tabJournal,
      guide: tabGuide,
    }[state.tab](t);

    return `
      <header class="topbar">
        <div class="brand">
          <button class="icon-btn" data-act="home">${icon("back")}</button>
          <div>
            <h1>${esc(t.destination)}</h1>
            <p>${esc(t.startDate)} → ${esc(t.endDate)}</p>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="icon-btn" title="更多" data-act="trip-menu">${icon("more")}</button>
        </div>
      </header>
      <article class="card hero-card" style="min-height:180px;${coverStyle(t)}">
        ${coverImg(t)}
        <div class="veil"></div>
        ${count}
        <div class="hero-body" style="min-height:180px">
          <p class="kicker">${esc(t.country || "旅程")}</p>
          <h2>${esc(t.destination)}</h2>
          <div class="hero-meta">
            <span class="chip">${icon("cal", 12)} ${tripDays(t)} 日</span>
            <span class="chip">${icon("bag", 12)} 行李 ${packingProgress(t)}%</span>
          </div>
        </div>
      </article>
      ${tabsHtml()}
      <div class="fade">${body}</div>`;
  }

  function tabOverview(t) {
    const days = tripDays(t);
    const spent = (t.expenses || []).reduce(
      (s, e) => s + convert(e.amount, e.currency || destCurrency(t.destination), state.settings.homeCurrency),
      0
    );
    const budget = Number(t.budget?.amount) || 0;
    const focus = todayFocus(t);
    const weather = (t.weather || [])
      .map(
        (w) => `<div class="wday"><div class="d">${esc(w.date)}</div><div class="ico">${w.icon}</div><div class="t">${w.min}°～${w.max}°</div></div>`
      )
      .join("");
    const headline =
      focus.st === "now" ? (focus.next ? "下一站" : focus.current ? "今日行程已經行完" : "今日未有行程") : focus.st === "upcoming" ? "出發日第一站" : "旅程回顧";
    const main = focus.next || (focus.st === "now" ? focus.current : focus.items[0]);
    const prevLoc = focus.current && focus.next && focus.current.location && focus.next.location ? focus.current.location : "";
    const rest = (focus.rest || []).filter((x) => x !== main).slice(0, 4);
    const j = journalOf(t, focus.day, false);

    return `
      <section class="card now-card">
        <p class="kicker">${focus.st === "now" ? "而家" : focus.st === "upcoming" ? "即將出發" : "回憶"} · 第 ${focus.day} 日</p>
        <div class="help">${headline}</div>
        ${
          main
            ? `<h3><span class="time">${esc(main.time)}</span> ${esc(main.content)}</h3>
            <div class="meta" style="display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 12px">
              ${main.type ? `<span class="pill">${esc(main.type)}</span>` : ""}
              ${
                main.location
                  ? `<a class="pill map" target="_blank" rel="noopener" href="${mapsSearch(main.location)}">${icon("pin", 12)} ${esc(
                      main.location
                    )}</a>`
                  : ""
              }
              ${
                prevLoc
                  ? `<a class="pill train" target="_blank" rel="noopener" href="${mapsTransit(prevLoc, main.location)}">${icon(
                      "train",
                      12
                    )} 去下一站</a>`
                  : ""
              }
            </div>`
            : `<p class="help">未有行程。可用 AI 一鍵規劃。</p>`
        }
        ${rest
          .map(
            (i) => `<div class="preview-row">
              <span class="time">${esc(i.time)}</span>
              <div class="txt"><p>${esc(i.content)}</p></div>
            </div>`
          )
          .join("")}
        <div class="toolbar" style="margin:12px 0 0">
          <button class="btn btn-primary btn-sm" data-act="share-today">${icon("share", 14)} 分享今日</button>
          <button class="btn btn-soft btn-sm" data-act="share-qr">${icon("link", 14)} QR</button>
          <button class="btn btn-soft btn-sm" data-act="tab" data-id="itinerary">睇全部</button>
          <button class="btn btn-gold btn-sm" data-act="tab" data-id="journal">${icon("edit", 14)} ${
      j?.text || j?.rating ? "睇日誌" : "寫今日"
    }</button>
        </div>
      </section>
      <div class="stat-grid">
        <div class="stat"><b>${days}</b><span>日行程</span></div>
        <div class="stat"><b>${packingProgress(t)}%</b><span>行李進度</span></div>
        <div class="stat"><b>${budget ? Math.round((spent / budget) * 100) + "%" : "—"}</b><span>預算使用</span></div>
      </div>
      ${
        t.extract
          ? `<div class="card card-pad" style="margin-bottom:12px"><p class="help" style="margin:0">${esc(t.extract)}</p></div>`
          : ""
      }
      <div class="card card-pad" style="margin-bottom:12px">
        <div class="section-head" style="margin:0 0 10px"><h3 style="font-size:1rem">天氣</h3>
          <button class="btn btn-soft btn-sm" data-act="weather">${icon("refresh", 14)} 更新</button></div>
        <div class="weather-row">${weather || `<p class="help">未有預報。撳更新獲取 7 日天氣。</p>`}</div>
      </div>
      <div class="toolbar">
        <button class="btn btn-accent" data-act="ai-all">${icon("spark")} AI 一鍵規劃</button>
        <button class="btn btn-soft" data-act="print">${icon("print")} 列印行程</button>
      </div>`;
  }

  function typeIcon(type) {
    return { 景點: "pin", 餐廳: "utensils", 交通: "train", 購物: "gift", 其他: "map" }[type] || "map";
  }

  function tabItinerary(t) {
    const grouped = {};
    (t.itinerary || []).forEach((it) => {
      (grouped[it.day] ||= []).push(it);
    });
    const days = Math.max(tripDays(t), ...Object.keys(grouped).map(Number), 1);
    const today = tripStatus(t) === "now" ? String(currentDayIndex(t)) : null;
    let html = `<div class="toolbar">
      <button class="btn btn-gold btn-sm" data-act="ai-iti">${icon("spark", 14)} AI 自動排</button>
      <button class="btn btn-soft btn-sm" data-act="add-iti">${icon("plus", 14)} 新增項目</button>
      <button class="btn btn-danger btn-sm" data-act="clear-iti">清空</button>
    </div>`;

    if (!t.itinerary?.length) {
      html += `<div class="card empty"><h4>行程表係空嘅</h4><p>交畀 AI，或自己加第一個景點。</p></div>`;
      return html;
    }
    for (let d = 1; d <= days; d++) {
      const list = (grouped[d] || []).sort((a, b) => a.time.localeCompare(b.time));
      if (!list.length) continue;
      const date = dateOfDay(t, d);
      html += `<div class="day-block">
        <div class="day-head"><h4>第 ${d} 日</h4><span>${niceDate(date)}（${weekday(date)}）
          <a class="pill map" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/${list
            .filter((x) => x.location)
            .map((x) => encodeURIComponent(x.location))
            .join("/")}" >${icon("map", 12)} 全日路線</a>
        </span></div>
        <div class="timeline">`;
      list.forEach((it, idx) => {
        const prev = [...list.slice(0, idx)].reverse().find((x) => x.location);
        const oIdx = t.itinerary.findIndex((x) => x.id === it.id);
        const matched = (t.souvenirs || []).filter((s) => {
          if (!s.location || !it.location) return false;
          const a = s.location.toLowerCase();
          const b = it.location.toLowerCase();
          return a && (b.includes(a) || a.includes(b));
        });
        const transit = prev?.location && it.location
          ? `<a class="pill train" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
              prev.location
            )}&destination=${encodeURIComponent(it.location)}&travelmode=transit">${icon("train", 12)} 交通</a>`
          : "";
        const gift =
          matched.length > 0
            ? `<button class="pill gift" data-act="show-gifts" data-msg="${esc(matched.map((s) => s.text).join("、"))}">${icon(
                "gift",
                12
              )} 手信 ${matched.length}</button>`
            : "";
        const web = it.url
          ? `<a class="pill web" target="_blank" rel="noopener" href="${esc(it.url.startsWith("http") ? it.url : "https://" + it.url)}">${icon(
              "link",
              12
            )} 介紹</a>`
          : "";
        html += `<div class="item ${today === String(d) ? "today" : ""}">
          <button class="item-x" data-act="del-iti" data-idx="${oIdx}">${icon("x", 14)}</button>
          <div class="item-top">
            <span class="time" data-act="edit-iti" data-idx="${oIdx}">${esc(it.time)}</span>
            <div style="flex:1;min-width:0">
              <h5 data-act="edit-iti" data-idx="${oIdx}">${icon(typeIcon(it.type), 14)} ${esc(it.content)}</h5>
              <div class="meta">
                ${
                  it.location
                    ? `<a class="pill map" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        it.location
                      )}">${icon("pin", 12)} ${esc(it.location)}</a>`
                    : `<span class="pill">無地點</span>`
                }
                ${transit}${gift}${web}
                <button class="pill" data-act="edit-iti" data-idx="${oIdx}">${icon("edit", 12)} 改</button>
                <button type="button" class="pill ${hasMem(it) ? "gift" : ""}" data-act="open-memory" data-idx="${oIdx}">${icon(
          "star",
          12
        )} ${hasMem(it) ? (it.rating ? memStars(it.rating) : "回憶") : "記低"}</button>
              </div>
              ${
                hasMem(it)
                  ? `<p class="mem-snip">${it.rating ? memStars(it.rating) + " " : ""}${esc(it.memory || "已有相片")}</p>`
                  : ""
              }
            </div>
          </div>
        </div>`;
      });
      html += `</div></div>`;
    }
    return html;
  }

  function tabLists(t) {
    const sub = state.sub.lists || "packing";
    const subs = [
      ["packing", "行李"],
      ["souvenirs", "手信"],
      ["docs", "文件"],
      ["tickets", "票據"],
    ];
    let body = `<div class="subtabs">${subs
      .map((s) => `<button class="subtab ${sub === s[0] ? "on" : ""}" data-act="sub" data-tab="lists" data-id="${s[0]}">${s[1]}</button>`)
      .join("")}</div>`;

    if (sub === "packing") {
      const cats = ["衣物", "電子", "盥洗", "文件", "其他"];
      const by = {};
      (t.packing || []).forEach((p, i) => {
        (by[p.cat || "其他"] ||= []).push({ ...p, i });
      });
      body += `<div class="toolbar">
        <button class="btn btn-gold btn-sm" data-act="ai-pack">${icon("spark", 14)} AI 建議</button>
        <button class="btn btn-soft btn-sm" data-act="add-pack">${icon("plus", 14)} 新增</button>
        <button class="btn btn-danger btn-sm" data-act="clear-pack">清空</button>
      </div>
      <div class="card card-pad">
        <p class="help">完成 ${packingProgress(t)}%</p>
        <div class="progress"><i style="width:${packingProgress(t)}%"></i></div>
        ${
          cats
            .filter((c) => by[c]?.length)
            .map(
              (c) =>
                `<div class="cat-label">${c}</div>` +
                by[c]
                  .map(
                    (p) => `<div class="check-row ${p.done ? "done" : ""}">
                    <input class="check" type="checkbox" ${p.done ? "checked" : ""} data-act="toggle-pack" data-idx="${p.i}">
                    <span class="txt" data-act="edit-pack" data-idx="${p.i}">${esc(p.text)}</span>
                    <button class="icon-btn" style="width:32px;height:32px" data-act="del-pack" data-idx="${p.i}">${icon("trash", 14)}</button>
                  </div>`
                  )
                  .join("")
            )
            .join("") || `<p class="help">清單係空嘅</p>`
        }
      </div>`;
    } else if (sub === "souvenirs") {
      body += `<div class="toolbar">
        <button class="btn btn-gold btn-sm" data-act="ai-souv">${icon("spark", 14)} AI 建議</button>
        <button class="btn btn-soft btn-sm" data-act="add-souv">${icon("plus", 14)} 新增</button>
        <button class="btn btn-danger btn-sm" data-act="clear-souv">清空</button>
      </div>
      <div class="card card-pad">
        ${(t.souvenirs || [])
          .map(
            (s, i) => `<div class="check-row ${s.done ? "done" : ""}">
            <input class="check" type="checkbox" ${s.done ? "checked" : ""} data-act="toggle-souv" data-idx="${i}">
            <div>
              <div class="txt" data-act="edit-souv" data-idx="${i}">${esc(s.text)}</div>
              <div class="help">${s.location ? "📍 " + esc(s.location) : "未填購買地點"}</div>
            </div>
            <button class="icon-btn" style="width:32px;height:32px" data-act="del-souv" data-idx="${i}">${icon("trash", 14)}</button>
          </div>`
          )
          .join("") || `<p class="help">未有手信清單</p>`}
      </div>`;
    } else if (sub === "tickets") {
      t.tickets = t.tickets || [];
      body += `<div class="toolbar">
        <button class="btn btn-soft btn-sm" data-act="add-ticket">${icon("plus", 14)} 新增票據</button>
      </div>
      ${
        t.tickets
          .map(
            (tk) => `<div class="card card-pad" style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
              <div>
                <span class="pill">${esc(tk.kind || "其他")}</span>
                <h4 style="margin:8px 0 4px;font-family:var(--display)">${esc(tk.title)}</h4>
                ${tk.note ? `<p class="help">${esc(tk.note)}</p>` : ""}
              </div>
              <div>
                <button type="button" class="icon-btn" data-act="edit-ticket" data-id="${tk.id}">${icon("edit", 16)}</button>
                <button type="button" class="icon-btn danger" data-act="del-ticket" data-id="${tk.id}">${icon("trash", 16)}</button>
              </div>
            </div>
            ${photoGrid(tk.photoIds, { kind: "ticket", parent: tk.id })}
          </div>`
          )
          .join("") || `<div class="card empty"><p>未有票據。可影機票、酒店確認、JR Pass。</p></div>`
      }`;
    } else {
      if (!t.docs?.length) {
        t.docs = ["護照", "簽證／入境卡", "旅遊保險", "機票／車票", "酒店確認", "信用卡／現金", "轉換插頭", "常用藥物"].map((text) => ({
          id: uid(),
          text,
          done: false,
        }));
        saveTrip(t, false);
      }
      body += `<div class="toolbar">
        <button class="btn btn-soft btn-sm" data-act="add-doc">${icon("plus", 14)} 新增</button>
      </div>
      <div class="card card-pad">
        ${t.docs
          .map(
            (d, i) => `<div class="check-row ${d.done ? "done" : ""}">
            <input class="check" type="checkbox" ${d.done ? "checked" : ""} data-act="toggle-doc" data-idx="${i}">
            <span class="txt">${esc(d.text)}</span>
            <button class="icon-btn" style="width:32px;height:32px" data-act="del-doc" data-idx="${i}">${icon("trash", 14)}</button>
          </div>`
          )
          .join("")}
      </div>`;
    }
    return body;
  }

  function tabJournal(t) {
    const view = state.sub.journalView || "day";
    const top = `<div class="subtabs">
      <button type="button" class="subtab ${view === "day" ? "on" : ""}" data-act="sub" data-tab="journalView" data-id="day">按日</button>
      <button type="button" class="subtab ${view === "spots" ? "on" : ""}" data-act="sub" data-tab="journalView" data-id="spots">景點回憶</button>
    </div>`;
    if (view === "spots") {
      const list = spotsList(t, state.spotQuery);
      const remembered = (t.itinerary || []).filter(hasMem).length;
      return `${top}
        ${searchField("spot-q", "搵已有評論嘅景點…", state.spotQuery)}
        <p class="help">${remembered} 個景點已有評論</p>
        <div id="spot-results" class="mem-list">
          ${list.map(({ it, idx }) => spotCard(t, it, idx)).join("") || spotsEmpty(state.spotQuery)}
        </div>`;
    }
    const days = tripDays(t);
    const st = tripStatus(t);
    const today = st === "now" ? currentDayIndex(t) : st === "upcoming" ? 1 : days;
    const day = Number(state.sub.journalDay) || today;
    state.sub.journalDay = String(day);
    const j = journalOf(t, day, false) || { text: "", rating: 0, photoIds: [], day: String(day) };
    const date = dateOfDay(t, day);
    const chips = Array.from({ length: days }, (_, i) => {
      const d = i + 1;
      const row = journalOf(t, d, false);
      const mark = row?.rating ? "★".repeat(row.rating) : row?.text ? "·" : "";
      return `<button type="button" class="subtab ${d === day ? "on" : ""}" data-act="journal-day" data-id="${d}">D${d}${
        mark ? ` ${mark.slice(0, 1)}` : ""
      }</button>`;
    }).join("");
    const daySpots = itemsForDay(t, day);
    return `${top}
      <div class="subtabs">${chips}</div>
      <div class="card card-pad">
        <p class="kicker" style="color:var(--muted)">第 ${day} 日 · ${niceDate(date)}（${weekday(date)}）</p>
        <h3 style="margin:4px 0 10px;font-family:var(--display)">今日記低</h3>
        <div class="help" style="margin-bottom:6px">體驗評分</div>
        ${starsHtml(j.rating, `data-act="rate-journal" data-day="${day}"`)}
        <form class="form" data-submit="save-journal" style="margin-top:14px">
          <input type="hidden" name="day" value="${day}">
          <div class="field"><label>寫低排隊、好食、改行程…</label>
            <textarea name="text" placeholder="例如：泉天空之湯好正，行李櫃 $500。">${esc(j.text || "")}</textarea>
          </div>
          <button class="btn btn-primary">儲存呢日</button>
        </form>
        <div class="help" style="margin-top:16px">相片附件</div>
        ${photoGrid(j.photoIds, { kind: "journal", parent: String(day), day: String(day) })}
      </div>
      ${
        daySpots.length
          ? `<h3 style="margin:18px 0 10px;font-size:1rem">呢日嘅景點</h3>
        <div class="mem-list">${daySpots
          .map((it) => {
            const idx = t.itinerary.indexOf(it);
            return spotCard(t, it, idx);
          })
          .join("")}</div>`
          : ""
      }`;
  }

  function tabMoney(t) {
    const sub = state.sub.money || "spend";
    const home = state.settings.homeCurrency;
    let body = `<div class="subtabs">
      <button class="subtab ${sub === "spend" ? "on" : ""}" data-act="sub" data-tab="money" data-id="spend">記帳</button>
      <button class="subtab ${sub === "fx" ? "on" : ""}" data-act="sub" data-tab="money" data-id="fx">匯率</button>
    </div>`;
    if (sub === "fx") {
      const curs = state.currencies.length ? state.currencies : ["HKD", "JPY", "USD", "EUR", "KRW", "TWD", "THB", "CNY"];
      const from = destCurrency(t.destination) === "HKD" ? "HKD" : state.settings.homeCurrency;
      const to = destCurrency(t.destination);
      body += `<div class="card card-pad">
        <div class="fx-stage"><input class="fx-amt" id="exAmt" type="number" value="100" data-act="calc-fx"></div>
        <div class="fx-row">
          <select id="exFrom" data-act="calc-fx">${curs.map((c) => `<option ${c === from ? "selected" : ""}>${c}</option>`).join("")}</select>
          <button class="icon-btn" data-act="swap-fx">${icon("swap")}</button>
          <select id="exTo" data-act="calc-fx">${curs.map((c) => `<option ${c === to ? "selected" : ""}>${c}</option>`).join("")}</select>
        </div>
        <div class="fx-result"><small>約等於</small><b id="exRes">—</b></div>
      </div>`;
      queueMicrotask(calcFx);
      return body;
    }
    const cats = ["交通", "住宿", "飲食", "景點", "購物", "其他"];
    const colors = ["#1f6b63", "#2c4a7c", "#c24d2c", "#c9923a", "#7a3b4a", "#6d6258"];
    const spentBy = {};
    let totalHome = 0;
    (t.expenses || []).forEach((e) => {
      const v = convert(e.amount, e.currency || destCurrency(t.destination), home);
      spentBy[e.cat || "其他"] = (spentBy[e.cat || "其他"] || 0) + v;
      totalHome += v;
    });
    const budget = Number(t.budget?.amount) || 0;
    const max = Math.max(totalHome, 1);
    body += `<div class="card card-pad" style="margin-bottom:12px">
      <div class="exp-sum">
        <div>
          <div class="help">已用（${esc(home)}）</div>
          <b>${totalHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</b>
        </div>
        <div style="text-align:right">
          <div class="help">預算 ${budget ? budget.toLocaleString() + " " + esc(t.budget?.currency || home) : "未設"}</div>
          <button class="btn btn-soft btn-sm" data-act="set-budget">設定預算</button>
        </div>
      </div>
      ${budget ? `<div class="progress"><i style="width:${Math.min(100, (totalHome / convert(budget, t.budget.currency || home, home)) * 100)}%"></i></div>` : ""}
      <div class="bars" style="margin-top:14px">
        ${cats
          .map((c, i) => {
            const v = spentBy[c] || 0;
            return `<div class="bar-row"><span>${c}</span><div class="bar"><i style="width:${(v / max) * 100}%;background:${colors[i]}"></i></div><span>${v.toFixed(0)}</span></div>`;
          })
          .join("")}
      </div>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary btn-sm" data-act="add-exp">${icon("plus", 14)} 記一筆</button>
    </div>
    <div class="card card-pad">
      ${(t.expenses || [])
        .slice()
        .reverse()
        .map((e, ri) => {
          const i = t.expenses.length - 1 - ri;
          const h = convert(e.amount, e.currency, home);
          return `<div class="check-row">
            <span class="pill">${esc(e.cat)}</span>
            <div><div>${esc(e.note || e.cat)}</div><div class="help">${esc(e.date)} · ${esc(e.amount)} ${esc(e.currency)}</div></div>
            <div style="text-align:right">
              <div style="font-weight:700">${h.toFixed(0)} ${esc(home)}</div>
              <button class="pill" data-act="del-exp" data-idx="${i}">刪</button>
            </div>
          </div>`;
        })
        .join("") || `<p class="help">未有花費紀錄</p>`}
    </div>`;
    return body;
  }

  function tabStay(t) {
    return `
      <h3 style="margin:8px 0 10px;font-size:1rem">住宿</h3>
      <div class="toolbar">
        <button class="btn btn-soft btn-sm" data-act="add-stay">${icon("plus", 14)} 新增住宿</button>
      </div>
      ${(t.stays || [])
        .map(
          (s, i) => `<div class="card card-pad" style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;gap:8px">
            <div>
              <h4 style="margin:0 0 4px;font-family:var(--display)">${esc(s.name)}</h4>
              <p class="help">${esc(s.checkIn)} → ${esc(s.checkOut)}</p>
              ${s.address ? `<a class="pill map" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}">${icon("pin", 12)} ${esc(s.address)}</a>` : ""}
              ${s.confirmation ? `<div class="help">確認號 ${esc(s.confirmation)}</div>` : ""}
            </div>
            <div>
              <button class="icon-btn" data-act="edit-stay" data-idx="${i}">${icon("edit", 16)}</button>
              <button class="icon-btn danger" data-act="del-stay" data-idx="${i}">${icon("trash", 16)}</button>
            </div>
          </div>
        </div>`
        )
        .join("") || `<div class="card empty"><p>未有住宿資料</p></div>`}

      <h3 style="margin:18px 0 10px;font-size:1rem">交通</h3>
      <div class="toolbar">
        <button class="btn btn-soft btn-sm" data-act="add-trans">${icon("plus", 14)} 新增交通</button>
      </div>
      ${(t.transport || [])
        .map(
          (s, i) => `<div class="card card-pad" style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;gap:8px">
            <div>
              <span class="chip chip-teal">${esc(s.mode)}</span>
              <h4 style="margin:8px 0 4px;font-family:var(--display)">${esc(s.title || s.number || s.mode)}</h4>
              <p class="help">${esc(s.from || "")} → ${esc(s.to || "")}</p>
              <p class="help">${esc(s.datetime || "")} ${s.number ? "· " + esc(s.number) : ""}</p>
              ${s.confirmation ? `<div class="help">確認號 ${esc(s.confirmation)}</div>` : ""}
            </div>
            <div>
              <button class="icon-btn" data-act="edit-trans" data-idx="${i}">${icon("edit", 16)}</button>
              <button class="icon-btn danger" data-act="del-trans" data-idx="${i}">${icon("trash", 16)}</button>
            </div>
          </div>
        </div>`
        )
        .join("") || `<div class="card empty"><p>未有機票／車票</p></div>`}`;
  }

  function tabGuide(t) {
    const sub = state.sub.guide || "info";
    const subs = [
      ["info", "須知"],
      ["phrases", "用語"],
      ["chat", "助手"],
    ];
    let body = `<div class="subtabs">${subs
      .map((s) => `<button class="subtab ${sub === s[0] ? "on" : ""}" data-act="sub" data-tab="guide" data-id="${s[0]}">${s[1]}</button>`)
      .join("")}</div>`;
    if (sub === "phrases") {
      body += `<div class="toolbar">
        <button class="btn btn-gold btn-sm" data-act="ai-phrases">${icon("spark", 14)} AI 產生用語</button>
      </div>
      <div class="card card-pad">
        ${(t.phrases || [])
          .map(
            (p) => `<div class="phrase">
            <div class="zh">${esc(p.zh)}</div>
            <div class="local">${esc(p.local)}</div>
            <div class="read">${esc(p.reading)}</div>
          </div>`
          )
          .join("") || `<p class="help">未有用語。撳 AI 產生當地常用句。</p>`}
      </div>`;
      return body;
    }
    if (sub === "chat") {
      body += `<div class="card card-pad">
        <div class="chat-log" id="chatLog">
          ${(t.chat || [])
            .map((m) => `<div class="bubble ${m.role === "user" ? "user" : "ai"}">${esc(m.content)}</div>`)
            .join("") || `<p class="help">問我任何關於「${esc(t.destination)}」嘅問題，例如餐廳、交通卡、第二天點行。</p>`}
        </div>
        <form class="chat-form" data-submit="chat">
          <input name="q" placeholder="問旅途助手…" required>
          <button class="btn btn-primary">${icon("chat", 16)}</button>
        </form>
      </div>`;
      return body;
    }
    body += `<div class="toolbar">
      <button class="btn btn-gold btn-sm" data-act="ai-notes">${icon("spark", 14)} AI 重新獲取</button>
      <button class="btn btn-soft btn-sm" data-act="weather">${icon("sun", 14)} 天氣</button>
    </div>
    <div class="card card-pad" style="margin-bottom:12px">
      <h3 style="margin:0 0 8px;font-size:1rem">注意事項</h3>
      <div class="note-box" data-act="edit-notes">${esc(t.notes || "撳 AI 獲取目的地須知，或喺呢度自己寫。")}</div>
    </div>
    <div class="card card-pad">
      <h3 style="margin:0 0 8px;font-size:1rem">${icon("phone", 16)} 緊急電話</h3>
      <div class="note-box em" data-act="edit-em">${esc(t.emergency || getEmergency(t.destination) || "未有資料")}</div>
    </div>`;
    return body;
  }

  function viewSettings() {
    const s = state.settings;
    return `
      <header class="topbar">
        <div class="brand">
          <button class="icon-btn" data-act="home">${icon("back")}</button>
          <div><h1>設定</h1><p>Lutu 旅途</p></div>
        </div>
      </header>
      <div class="settings-list">
        <div class="setting-row">
          <div><b>外觀</b><div class="help">日間紙感／夜航模式</div></div>
          <button class="btn btn-soft" data-act="toggle-theme">${s.theme === "night" ? icon("sun") + " 日間" : icon("moon") + " 夜航"}</button>
        </div>
        <div class="setting-row">
          <div><b>本幣</b><div class="help">花費同匯率會換算做呢個貨幣</div></div>
          <select data-act="home-cur">${["HKD", "TWD", "CNY", "USD", "JPY", "EUR", "GBP", "SGD"]
            .map((c) => `<option ${s.homeCurrency === c ? "selected" : ""}>${c}</option>`)
            .join("")}</select>
        </div>
        <div class="setting-row">
          <div><b>AI 來源</b><div class="help">Netlify 用 SpaceXAI；自訂可接 LM Studio</div></div>
          <select data-act="ai-mode">
            <option value="netlify" ${s.aiMode === "netlify" ? "selected" : ""}>SpaceXAI（Netlify）</option>
            <option value="custom" ${s.aiMode === "custom" ? "selected" : ""}>自訂端點</option>
          </select>
        </div>
      </div>
      ${
        s.aiMode === "custom"
          ? `<div class="card card-pad" style="margin-top:12px">
              <form class="form" data-submit="save-ai">
                <div class="field"><label>端點 URL</label><input name="customEndpoint" value="${esc(s.customEndpoint)}"></div>
                <div class="field"><label>模型名稱</label><input name="customModel" value="${esc(s.customModel)}" placeholder="例如 gemma-4…"></div>
                <div class="field"><label>API Key（選填）</label><input name="customKey" value="${esc(s.customKey)}" placeholder="本地通通常唔使"></div>
                <button class="btn btn-primary">儲存端點</button>
              </form>
            </div>`
          : `<p class="help" style="margin-top:12px">部署到 Netlify 後，喺 Site settings → Environment variables 設定 <code>XAI_API_KEY</code>。可選 <code>XAI_MODEL</code>（預設 grok-4.7）。</p>`
      }
      <div class="toolbar" style="margin-top:18px">
        <button class="btn btn-soft" data-act="export-all">${icon("down")} 匯出全部旅程</button>
        <button class="btn btn-danger" data-act="wipe">清除本機資料</button>
      </div>`;
  }

  function render() {
    const root = $("#app");
    if (state.view === "settings") root.innerHTML = viewSettings();
    else if (state.view === "trip" && trip()) root.innerHTML = viewTrip(trip());
    else {
      state.view = "home";
      root.innerHTML = viewHome();
    }
    hydratePhotos();
  }

  function calcFx() {
    const amt = parseFloat($("#exAmt")?.value) || 0;
    const from = $("#exFrom")?.value;
    const to = $("#exTo")?.value;
    const el = $("#exRes");
    if (!el || !from || !to) return;
    const v = convert(amt, from, to);
    el.textContent = v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + to;
  }

  /* ---------- actions ---------- */
  const on = {
    "close-modal": () => closeModal(),
    "confirm-no": () => {
      pendingForm?.resolve?.(false);
      pendingForm = null;
      closeModal();
    },
    "confirm-yes": () => {
      pendingForm?.resolve?.(true);
      pendingForm = null;
      closeModal();
    },
    home: () => {
      state.view = "home";
      state.tripId = null;
      render();
    },
    settings: () => {
      state.view = "settings";
      render();
    },
    filter: (ds) => {
      state.filter = ds.id;
      render();
    },
    tab: (ds) => {
      state.tab = ds.id;
      render();
    },
    sub: (ds) => {
      state.sub[ds.tab] = ds.id;
      render();
    },
    "open-trip": (ds) => {
      state.tripId = ds.id;
      state.view = "trip";
      state.tab = "overview";
      render();
    },
    "toggle-theme": () => {
      state.settings.theme = state.settings.theme === "night" ? "day" : "night";
      document.documentElement.dataset.theme = state.settings.theme === "night" ? "night" : "day";
      persist();
      render();
    },
    "add-trip": () => {
      pendingForm = { kind: "add-trip" };
      const today = ymd(new Date());
      formModal({
        title: "新旅程",
        submit: "建立",
        fields: [
          { name: "destination", label: "目的地", placeholder: "例如：京都、釜山、清邁", required: true },
          { name: "startDate", label: "抵達日期", type: "date", value: today, required: true, half: true },
          { name: "startTime", label: "抵達時間", type: "time", value: "14:00", required: true, half: true },
          { name: "endDate", label: "離開日期", type: "date", value: today, required: true, half: true },
          { name: "endTime", label: "離開時間", type: "time", value: "18:00", required: true, half: true },
          { name: "budget", label: "預算金額（選填）", type: "number", placeholder: "例如 8000" },
        ],
        extra: `<label class="help" style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="ai" checked> 建立後用 AI 一鍵規劃</label>`,
      });
    },
    "delete-trip": async (ds) => {
      const ok = await confirmModal("刪除旅程", "刪除後無法還原（除非你有匯出備份）。", "刪除");
      if (!ok) return;
      const gone = state.trips.find((t) => t.id === ds.id);
      if (gone) {
        for (const id of tripPhotoIds(gone)) {
          try {
            await removePhoto(id);
          } catch {}
        }
      }
      state.trips = state.trips.filter((t) => t.id !== ds.id);
      if (state.tripId === ds.id) {
        state.tripId = null;
        state.view = "home";
      }
      persist();
      render();
    },
    "export-trip": (ds) => {
      const t = state.trips.find((x) => x.id === ds.id);
      if (!t) return;
      download(`${t.destination}_lutu.json`, JSON.stringify(t, null, 2));
    },
    "export-all": () => download("lutu-all-trips.json", JSON.stringify({ trips: state.trips, settings: state.settings }, null, 2)),
    import: () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,.txt,application/json";
      input.onchange = () => {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const data = JSON.parse(reader.result);
            if (Array.isArray(data)) throw new Error("請匯入單一行程或 Lutu 備份");
            if (data.trips) {
              data.trips.forEach((t) => {
                t.id = uid();
                state.trips.unshift(t);
              });
            } else if (data.destination) {
              data.id = uid();
              state.trips.unshift(data);
            } else throw new Error("格式唔啱");
            persist();
            render();
            toast("匯入成功");
          } catch (e) {
            toast(e.message || "匯入失敗");
          }
        };
        reader.readAsText(file);
      };
      input.click();
    },
    wipe: async () => {
      const ok = await confirmModal("清除資料", "會刪除所有本機旅程同相片。", "清除");
      if (!ok) return;
      for (const t of state.trips) {
        for (const id of tripPhotoIds(t)) {
          try {
            await removePhoto(id);
          } catch {}
        }
      }
      state.trips = [];
      persist();
      state.view = "home";
      render();
    },
    weather: () => fetchWeather(trip()),
    "ai-all": () => autoPlan(trip()),
    "ai-iti": () =>
      genItinerary(trip(), true)
        .catch((e) => toast(e.message))
        .finally(clearBusy),
    "ai-pack": () =>
      genPacking(trip())
        .catch((e) => toast(e.message))
        .finally(clearBusy),
    "ai-souv": () =>
      genSouvenirs(trip())
        .catch((e) => toast(e.message))
        .finally(clearBusy),
    "ai-notes": () =>
      genNotes(trip())
        .catch((e) => toast(e.message))
        .finally(clearBusy),
    "ai-phrases": () =>
      genPhrases(trip())
        .catch((e) => toast(e.message))
        .finally(clearBusy),
    "add-iti": () => {
      const t = trip();
      const days = Array.from({ length: tripDays(t) }, (_, i) => ({ v: String(i + 1), l: `第 ${i + 1} 日` }));
      pendingForm = { kind: "add-iti" };
      formModal({
        title: "新增行程",
        fields: [
          { name: "day", label: "日", type: "select", options: days, value: "1", half: true },
          { name: "time", label: "時間", type: "time", value: "10:00", required: true, half: true },
          { name: "type", label: "類型", type: "select", options: ["景點", "餐廳", "交通", "購物", "其他"] },
          { name: "content", label: "項目", required: true, placeholder: "清水寺" },
          { name: "location", label: "Google Maps 地點", placeholder: "可搜尋嘅地名或地址" },
          { name: "url", label: "介紹網址（選填）", type: "url" },
        ],
      });
    },
    "edit-iti": (ds) => {
      const t = trip();
      const it = t.itinerary[Number(ds.idx)];
      if (!it) return;
      const days = Array.from({ length: Math.max(tripDays(t), Number(it.day) || 1) }, (_, i) => ({ v: String(i + 1), l: `第 ${i + 1} 日` }));
      pendingForm = { kind: "edit-iti", idx: Number(ds.idx) };
      formModal({
        title: "修改行程",
        fields: [
          { name: "day", label: "日", type: "select", options: days, value: String(it.day), half: true },
          { name: "time", label: "時間", type: "time", value: it.time, required: true, half: true },
          { name: "type", label: "類型", type: "select", options: ["景點", "餐廳", "交通", "購物", "其他"], value: it.type || "景點" },
          { name: "content", label: "項目", required: true, value: it.content },
          { name: "location", label: "地點", value: it.location || "" },
          { name: "url", label: "網址", value: it.url || "" },
        ],
      });
    },
    "del-iti": async (ds) => {
      const t = trip();
      const it = t.itinerary[Number(ds.idx)];
      if (it) {
        for (const id of it.photoIds || []) {
          try {
            await removePhoto(id);
          } catch {}
        }
      }
      t.itinerary.splice(Number(ds.idx), 1);
      saveTrip(t);
    },
    "clear-iti": async () => {
      if (!(await confirmModal("清空行程", "確定清空所有行程項目？"))) return;
      const t = trip();
      for (const it of t.itinerary || []) {
        for (const id of it.photoIds || []) {
          try {
            await removePhoto(id);
          } catch {}
        }
      }
      t.itinerary = [];
      saveTrip(t);
    },
    "add-pack": () => {
      pendingForm = { kind: "add-pack" };
      formModal({
        title: "新增行李",
        fields: [
          { name: "cat", label: "分類", type: "select", options: ["衣物", "電子", "盥洗", "文件", "其他"] },
          { name: "text", label: "物品", required: true },
        ],
      });
    },
    "toggle-pack": (ds) => {
      const t = trip();
      t.packing[Number(ds.idx)].done = !t.packing[Number(ds.idx)].done;
      saveTrip(t);
    },
    "edit-pack": (ds) => {
      const t = trip();
      const p = t.packing[Number(ds.idx)];
      pendingForm = { kind: "edit-pack", idx: Number(ds.idx) };
      formModal({
        title: "修改行李",
        fields: [
          { name: "cat", label: "分類", type: "select", options: ["衣物", "電子", "盥洗", "文件", "其他"], value: p.cat },
          { name: "text", label: "物品", value: p.text, required: true },
        ],
      });
    },
    "del-pack": (ds) => {
      const t = trip();
      t.packing.splice(Number(ds.idx), 1);
      saveTrip(t);
    },
    "clear-pack": async () => {
      if (!(await confirmModal("清空行李", "確定清空行李清單？"))) return;
      const t = trip();
      t.packing = [];
      saveTrip(t);
    },
    "add-souv": () => {
      pendingForm = { kind: "add-souv" };
      formModal({
        title: "新增手信",
        fields: [
          { name: "text", label: "手信", required: true },
          { name: "location", label: "購買地點（同行程地點對得上就會提示）" },
        ],
      });
    },
    "toggle-souv": (ds) => {
      const t = trip();
      t.souvenirs[Number(ds.idx)].done = !t.souvenirs[Number(ds.idx)].done;
      saveTrip(t);
    },
    "edit-souv": (ds) => {
      const t = trip();
      const s = t.souvenirs[Number(ds.idx)];
      pendingForm = { kind: "edit-souv", idx: Number(ds.idx) };
      formModal({
        title: "修改手信",
        fields: [
          { name: "text", label: "手信", value: s.text, required: true },
          { name: "location", label: "購買地點", value: s.location || "" },
        ],
      });
    },
    "del-souv": (ds) => {
      const t = trip();
      t.souvenirs.splice(Number(ds.idx), 1);
      saveTrip(t);
    },
    "clear-souv": async () => {
      if (!(await confirmModal("清空手信", "確定清空手信清單？"))) return;
      const t = trip();
      t.souvenirs = [];
      saveTrip(t);
    },
    "add-doc": () => {
      pendingForm = { kind: "add-doc" };
      formModal({ title: "新增文件", fields: [{ name: "text", label: "項目", required: true }] });
    },
    "toggle-doc": (ds) => {
      const t = trip();
      t.docs[Number(ds.idx)].done = !t.docs[Number(ds.idx)].done;
      saveTrip(t);
    },
    "del-doc": (ds) => {
      const t = trip();
      t.docs.splice(Number(ds.idx), 1);
      saveTrip(t);
    },
    "set-budget": () => {
      const t = trip();
      pendingForm = { kind: "set-budget" };
      formModal({
        title: "旅程預算",
        fields: [
          { name: "amount", label: "金額", type: "number", value: t.budget?.amount || "", required: true },
          {
            name: "currency",
            label: "貨幣",
            type: "select",
            options: (state.currencies.length ? state.currencies.slice(0, 40) : ["HKD", "JPY", "USD", "EUR", "TWD", "KRW", "THB", "CNY"]),
            value: t.budget?.currency || state.settings.homeCurrency,
          },
        ],
      });
    },
    "add-exp": () => {
      const t = trip();
      pendingForm = { kind: "add-exp" };
      formModal({
        title: "記一筆花費",
        fields: [
          { name: "date", label: "日期", type: "date", value: ymd(new Date()), required: true, half: true },
          { name: "cat", label: "分類", type: "select", options: ["交通", "住宿", "飲食", "景點", "購物", "其他"], half: true },
          { name: "amount", label: "金額", type: "number", step: "0.01", required: true, half: true },
          {
            name: "currency",
            label: "貨幣",
            type: "select",
            options: (state.currencies.length ? state.currencies : ["HKD", "JPY", "USD", "EUR", "KRW", "TWD", "THB"]).slice(0, 60),
            value: destCurrency(t.destination),
            half: true,
          },
          { name: "note", label: "備註", placeholder: "拉麵／地鐵卡" },
        ],
      });
    },
    "del-exp": (ds) => {
      const t = trip();
      t.expenses.splice(Number(ds.idx), 1);
      saveTrip(t);
    },
    "add-stay": () => stayForm(),
    "edit-stay": (ds) => stayForm(Number(ds.idx)),
    "del-stay": (ds) => {
      const t = trip();
      t.stays.splice(Number(ds.idx), 1);
      saveTrip(t);
    },
    "add-trans": () => transForm(),
    "edit-trans": (ds) => transForm(Number(ds.idx)),
    "del-trans": (ds) => {
      const t = trip();
      t.transport.splice(Number(ds.idx), 1);
      saveTrip(t);
    },
    "edit-notes": () => {
      const t = trip();
      pendingForm = { kind: "edit-notes" };
      formModal({ title: "注意事項", fields: [{ name: "notes", label: "內容", type: "textarea", value: t.notes || "" }] });
    },
    "edit-em": () => {
      const t = trip();
      pendingForm = { kind: "edit-em" };
      formModal({
        title: "緊急電話",
        fields: [{ name: "emergency", label: "內容", type: "textarea", value: t.emergency || getEmergency(t.destination) }],
      });
    },
    "show-gifts": (ds) => {
      openModal(`<h3>呢度可以買嘅手信</h3><p>${esc(ds.msg)}</p><div class="modal-actions"><button class="btn btn-primary" data-act="close-modal">知道了</button></div>`);
    },
    "calc-fx": () => calcFx(),
    "swap-fx": () => {
      const a = $("#exFrom"),
        b = $("#exTo");
      if (!a || !b) return;
      const v = a.value;
      a.value = b.value;
      b.value = v;
      calcFx();
    },
    print: () => window.print(),
    "share-today": async () => {
      const t = trip();
      if (!t) return;
      closeModal();
      const text = todayShareText(t);
      if (navigator.share) {
        try {
          await navigator.share({ title: `${t.destination} 今日行程`, text });
          return;
        } catch (err) {
          if (err && err.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(text);
        toast("已複製今日行程，可貼到 WhatsApp");
      } catch {
        toast("無法分享，請改用匯出");
      }
    },
    "share-qr": () => {
      const t = trip();
      if (!t) return;
      const text = todayShareText(t).slice(0, 1200);
      const src = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&ecc=M&data=${encodeURIComponent(text)}`;
      openModal(`
        <h3>今日行程 QR</h3>
        <p class="help">畀同行用相機掃，會見到今日時間表同地圖連結。</p>
        <img src="${src}" alt="QR" style="width:min(280px,100%);margin:12px auto;display:block;border-radius:16px;background:#fff;padding:10px">
        <div class="modal-actions">
          <button type="button" class="btn btn-soft" data-act="share-today">${icon("share", 14)} 分享文字</button>
          <button type="button" class="btn btn-primary" data-act="close-modal">關閉</button>
        </div>`);
    },
    "journal-day": (ds) => {
      state.sub.journalDay = ds.id;
      render();
    },
    "open-memory": (ds) => {
      if (ds.trip && ds.trip !== state.tripId) {
        state.tripId = ds.trip;
        state.view = "trip";
        state.tab = "journal";
        state.sub.journalView = "spots";
        render();
      }
      openMemory(Number(ds.idx));
    },
    "del-memory": async (ds) => {
      if (ds.trip) state.tripId = ds.trip;
      const t = trip();
      const it = t?.itinerary?.[Number(ds.idx)];
      if (!it || !hasMem(it)) return;
      if (!(await confirmModal("刪除評論", "確定刪除呢個景點嘅評分、文字同相片？行程項目會留低。", "刪除"))) return;
      await clearItemMemory(it);
      closeModal();
      saveTrip(t);
      toast("已刪除評論");
    },
    "rate-item": (ds) => {
      const t = trip();
      const it = t?.itinerary?.[Number(ds.idx)];
      if (!it) return;
      it.rating = Number(ds.n);
      saveTrip(t, false);
      persist();
      const stars = document.querySelector("#modal-root .stars");
      if (stars) {
        stars.querySelectorAll("button").forEach((b) => {
          b.classList.toggle("on", Number(b.dataset.n) <= it.rating);
        });
      }
    },
    "rate-journal": (ds) => {
      const t = trip();
      const j = journalOf(t, ds.day, true);
      j.rating = Number(ds.n);
      saveTrip(t);
    },
    "pick-photo": (ds) => {
      photoCtx = { kind: ds.kind, parent: ds.parent, day: ds.day };
      const input = $("#lutu-photo");
      if (input) {
        input.value = "";
        input.click();
      }
    },
    "view-photo": async (ds) => {
      const src = await photoSrc(ds.id);
      if (!src) return;
      openModal(`<img src="${src}" alt="" style="width:100%;border-radius:16px">
        <div class="modal-actions"><button type="button" class="btn btn-primary" data-act="close-modal">關閉</button></div>`);
    },
    "del-photo": async (ds) => {
      const t = trip();
      if (!t) return;
      if (ds.kind === "ticket") {
        const tk = (t.tickets || []).find((x) => x.id === ds.parent);
        if (tk) tk.photoIds = (tk.photoIds || []).filter((id) => id !== ds.id);
      } else if (ds.kind === "journal") {
        const j = journalOf(t, ds.parent || ds.day, false);
        if (j) j.photoIds = (j.photoIds || []).filter((id) => id !== ds.id);
      } else if (ds.kind === "item") {
        const it = (t.itinerary || []).find((x) => x.id === ds.parent);
        if (it) it.photoIds = (it.photoIds || []).filter((id) => id !== ds.id);
      }
      try {
        await removePhoto(ds.id);
      } catch {}
      saveTrip(t);
      if (ds.kind === "item") {
        const idx = (t.itinerary || []).findIndex((x) => x.id === ds.parent);
        if (idx >= 0) openMemory(idx);
      }
    },
    "add-ticket": () => {
      pendingForm = { kind: "add-ticket" };
      formModal({
        title: "新增票據",
        fields: [
          { name: "kind", label: "類型", type: "select", options: ["機票", "酒店", "車票", "簽證", "保險", "其他"] },
          { name: "title", label: "名稱", required: true, placeholder: "例如 QR812 電子登機證" },
          { name: "note", label: "備註", type: "textarea", placeholder: "確認號、座位…" },
        ],
      });
    },
    "edit-ticket": (ds) => {
      const t = trip();
      const tk = (t.tickets || []).find((x) => x.id === ds.id);
      if (!tk) return;
      pendingForm = { kind: "edit-ticket", id: ds.id };
      formModal({
        title: "修改票據",
        fields: [
          { name: "kind", label: "類型", type: "select", options: ["機票", "酒店", "車票", "簽證", "保險", "其他"], value: tk.kind },
          { name: "title", label: "名稱", required: true, value: tk.title },
          { name: "note", label: "備註", type: "textarea", value: tk.note || "" },
        ],
      });
    },
    "del-ticket": async (ds) => {
      const t = trip();
      const tk = (t.tickets || []).find((x) => x.id === ds.id);
      if (!tk) return;
      for (const id of tk.photoIds || []) {
        try {
          await removePhoto(id);
        } catch {}
      }
      t.tickets = t.tickets.filter((x) => x.id !== ds.id);
      saveTrip(t);
    },
    "trip-menu": () => {
      const t = trip();
      openModal(`
        <h3>旅程選項</h3>
        <div class="form">
          <button class="btn btn-soft btn-block" data-act="share-today">${icon("share")} 分享今日行程</button>
          <button class="btn btn-soft btn-block" data-act="share-qr">${icon("link")} 今日 QR</button>
          <button class="btn btn-soft btn-block" data-act="export-trip" data-id="${t.id}">${icon("down")} 匯出呢個旅程</button>
          <button class="btn btn-soft btn-block" data-act="dup-trip">${icon("copy")} 複製旅程</button>
          <button class="btn btn-soft btn-block" data-act="print">${icon("print")} 列印</button>
          <button class="btn btn-danger btn-block" data-act="delete-trip" data-id="${t.id}">${icon("trash")} 刪除</button>
          <button class="btn btn-ghost btn-block" data-act="close-modal">關閉</button>
        </div>`);
    },
    "dup-trip": () => {
      const t = trip();
      const copy = JSON.parse(JSON.stringify(t));
      copy.id = uid();
      copy.destination = t.destination + "（副本）";
      copy.createdAt = Date.now();
      state.trips.unshift(copy);
      persist();
      closeModal();
      toast("已複製");
      state.tripId = copy.id;
      render();
    },
  };

  function stayForm(idx) {
    const t = trip();
    const s = idx == null ? {} : t.stays[idx];
    pendingForm = { kind: "stay", idx };
    formModal({
      title: idx == null ? "新增住宿" : "修改住宿",
      fields: [
        { name: "name", label: "酒店／民宿", value: s.name || "", required: true },
        { name: "address", label: "地址", value: s.address || "" },
        { name: "checkIn", label: "入住", type: "date", value: s.checkIn || t.startDate, half: true },
        { name: "checkOut", label: "退房", type: "date", value: s.checkOut || t.endDate, half: true },
        { name: "confirmation", label: "確認號", value: s.confirmation || "" },
        { name: "url", label: "預訂網址", value: s.url || "" },
      ],
    });
  }
  function transForm(idx) {
    const t = trip();
    const s = idx == null ? {} : t.transport[idx];
    pendingForm = { kind: "trans", idx };
    formModal({
      title: idx == null ? "新增交通" : "修改交通",
      fields: [
        { name: "mode", label: "類型", type: "select", options: ["飛機", "火車", "新幹線", "巴士", "船", "地鐵", "其他"], value: s.mode || "飛機" },
        { name: "title", label: "名稱", value: s.title || "", placeholder: "去程／JR Pass" },
        { name: "number", label: "航班／車次", value: s.number || "", half: true },
        { name: "datetime", label: "日期時間", type: "datetime-local", value: s.datetime || "", half: true },
        { name: "from", label: "出發", value: s.from || "", half: true },
        { name: "to", label: "抵達", value: s.to || "", half: true },
        { name: "confirmation", label: "確認號／訂位代號", value: s.confirmation || "" },
      ],
    });
  }

  async function download(name, text) {
    const blob = new Blob([text], { type: "application/json;charset=utf-8" });
    const file = new File([blob], name, { type: "application/json" });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: name });
        toast("已匯出");
        return;
      } catch (err) {
        if (err && err.name === "AbortError") return;
      }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 1500);
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      try {
        await navigator.clipboard.writeText(text);
        toast("iPhone 已複製行程內容，可貼到備忘錄或檔案 App");
        return;
      } catch {}
    }
    toast("已匯出 " + name);
  }

  function handleSubmit(form) {
    const kind = form.dataset.submit;
    const data = readForm(form);
    if (kind === "save-ai") {
      Object.assign(state.settings, data);
      persist();
      closeModal();
      toast("已儲存 AI 端點");
      render();
      return;
    }
    if (kind === "save-journal") {
      const t = trip();
      if (!t) return;
      const j = journalOf(t, data.day, true);
      j.text = data.text || "";
      saveTrip(t);
      toast("已記低呢日");
      return;
    }
    if (kind === "save-memory") {
      const t = trip();
      if (!t) return;
      const it = t.itinerary[Number(data.idx)];
      if (it) {
        it.memory = data.memory || "";
        it.photoIds = it.photoIds || [];
        it.rating = Number(it.rating) || 0;
      }
      closeModal();
      saveTrip(t);
      toast("已記低呢個景點");
      return;
    }
    if (kind === "chat") {
      sendChat(data.q);
      form.reset();
      return;
    }
    if (kind === "form-ok") submitPending(data, form);
  }

  function submitPending(data, form) {
    const t = trip();
    const p = pendingForm;
    if (!p) return;
    if (p.kind === "add-trip") {
      const ai = form.querySelector('[name="ai"]')?.checked;
      const nt = {
        id: uid(),
        createdAt: Date.now(),
        destination: data.destination.trim(),
        startDate: data.startDate,
        startTime: data.startTime,
        endDate: data.endDate,
        endTime: data.endTime,
        budget: { amount: Number(data.budget) || 0, currency: state.settings.homeCurrency },
        itinerary: [],
        packing: [],
        souvenirs: [],
        docs: [],
        tickets: [],
        journal: [],
        expenses: [],
        stays: [],
        transport: [],
        phrases: [],
        chat: [],
        notes: "",
        emergency: getEmergency(data.destination),
        weather: null,
      };
      closeModal();
      pendingForm = null;
      saveTrip(nt, false);
      state.tripId = nt.id;
      state.view = "trip";
      state.tab = "overview";
      render();
      enrichTrip(nt);
      if (ai) autoPlan(nt);
      return;
    }
    if (!t) return;
    if (p.kind === "add-iti") {
      t.itinerary.push({ id: uid(), ...data, memory: "", rating: 0, photoIds: [] });
    } else if (p.kind === "edit-iti") {
      Object.assign(t.itinerary[p.idx], data);
    } else if (p.kind === "add-pack") {
      t.packing.push({ id: uid(), cat: data.cat, text: data.text, qty: 1, done: false });
    } else if (p.kind === "edit-pack") {
      Object.assign(t.packing[p.idx], { cat: data.cat, text: data.text });
    } else if (p.kind === "add-souv") {
      t.souvenirs.push({ id: uid(), text: data.text, location: data.location, done: false });
    } else if (p.kind === "edit-souv") {
      Object.assign(t.souvenirs[p.idx], data);
    } else if (p.kind === "add-doc") {
      t.docs.push({ id: uid(), text: data.text, done: false });
    } else if (p.kind === "set-budget") {
      t.budget = { amount: Number(data.amount) || 0, currency: data.currency };
    } else if (p.kind === "add-exp") {
      t.expenses = t.expenses || [];
      t.expenses.push({ id: uid(), ...data, amount: Number(data.amount) });
    } else if (p.kind === "stay") {
      t.stays = t.stays || [];
      if (p.idx == null) t.stays.push({ id: uid(), ...data });
      else Object.assign(t.stays[p.idx], data);
    } else if (p.kind === "trans") {
      t.transport = t.transport || [];
      if (p.idx == null) t.transport.push({ id: uid(), ...data });
      else Object.assign(t.transport[p.idx], data);
    } else if (p.kind === "edit-notes") {
      t.notes = data.notes;
    } else if (p.kind === "edit-em") {
      t.emergency = data.emergency;
    } else if (p.kind === "add-ticket") {
      t.tickets = t.tickets || [];
      t.tickets.push({ id: uid(), kind: data.kind, title: data.title, note: data.note || "", photoIds: [] });
    } else if (p.kind === "edit-ticket") {
      const tk = (t.tickets || []).find((x) => x.id === p.id);
      if (tk) Object.assign(tk, { kind: data.kind, title: data.title, note: data.note || "" });
    }
    pendingForm = null;
    closeModal();
    saveTrip(t);
  }

  async function sendChat(q) {
    const t = trip();
    t.chat = t.chat || [];
    t.chat.push({ role: "user", content: q });
    saveTrip(t, true);
    setBusy("旅途助手", "諗緊…");
    try {
      const ctx = `目的地 ${t.destination}，${t.startDate} 至 ${t.endDate}。
行程：${(t.itinerary || []).slice(0, 40).map((i) => `D${i.day} ${i.time} ${i.content} ${i.location || ""}`).join("；")}`;
      const messages = [
        { role: "system", content: SYS + " 用短答幫旅客解決即場問題。" },
        { role: "system", content: ctx },
        ...t.chat.slice(-8).map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.content })),
      ];
      const res = await callAI(messages, 0.5);
      t.chat.push({ role: "assistant", content: res });
      saveTrip(t, true);
    } catch (e) {
      toast(e.message);
    } finally {
      clearBusy();
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-back")) {
      closeModal();
      return;
    }
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    if (btn.classList.contains("modal-back")) return;
    if (btn.tagName === "INPUT" && btn.type === "checkbox") return;
    const act = btn.dataset.act;
    if (["calc-fx", "home-cur", "ai-mode"].includes(act)) return;
    e.preventDefault();
    e.stopPropagation();
    on[act]?.(btn.dataset, btn, e);
  });
  document.addEventListener("change", (e) => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    if (act === "toggle-pack" || act === "toggle-souv" || act === "toggle-doc") on[act](el.dataset);
    if (act === "home-cur") {
      state.settings.homeCurrency = el.value;
      persist();
      fetchRates();
      toast("本幣已改為 " + el.value);
    }
    if (act === "ai-mode") {
      state.settings.aiMode = el.value;
      persist();
      render();
    }
    if (act === "calc-fx") calcFx();
  });
  document.addEventListener("keydown", (e) => {
    if (!isSearchBox(e.target)) return;
    if (e.isComposing || e.keyCode === 229 || e.key === "Process") {
      e.target.dataset.composing = "1";
      clearTimeout(searchTimer);
    }
  });
  document.addEventListener("compositionstart", (e) => {
    if (!isSearchBox(e.target)) return;
    e.target.dataset.composing = "1";
    clearTimeout(searchTimer);
  });
  document.addEventListener("compositionend", (e) => {
    if (!isSearchBox(e.target)) return;
    e.target.dataset.composing = "0";
    clearTimeout(searchTimer);
    applySearchBox(e.target);
  });
  document.addEventListener("input", (e) => {
    if (e.target.id === "exAmt") calcFx();
    if (!isSearchBox(e.target)) return;
    if (e.isComposing || e.target.dataset.composing === "1") return;
    if (e.inputType === "insertCompositionText" || e.inputType === "deleteCompositionText") return;
    const el = e.target;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => applySearchBox(el), 280);
  });
  document.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-submit]");
    if (!form) return;
    e.preventDefault();
    handleSubmit(form);
  });

  const photoInput = $("#lutu-photo");
  if (photoInput) {
    photoInput.addEventListener("change", async () => {
      const file = photoInput.files && photoInput.files[0];
      photoInput.value = "";
      if (!file || !photoCtx) return;
      const t = trip();
      if (!t) return;
      try {
        setBusy("儲存相片", "壓縮緊…");
        const blob = await compressImage(file);
        const id = uid();
        await putPhoto(id, blob);
        if (photoCtx.kind === "ticket") {
          t.tickets = t.tickets || [];
          const tk = t.tickets.find((x) => x.id === photoCtx.parent);
          if (!tk) throw new Error("搵唔到呢張票據");
          tk.photoIds = tk.photoIds || [];
          if (tk.photoIds.length >= 8) throw new Error("每張票據最多 8 張相");
          tk.photoIds.push(id);
        } else if (photoCtx.kind === "journal") {
          const j = journalOf(t, photoCtx.parent || photoCtx.day, true);
          j.photoIds = j.photoIds || [];
          if (j.photoIds.length >= 8) throw new Error("每日最多 8 張相");
          j.photoIds.push(id);
        } else if (photoCtx.kind === "item") {
          const it = (t.itinerary || []).find((x) => x.id === photoCtx.parent);
          if (!it) throw new Error("搵唔到呢個行程");
          it.photoIds = it.photoIds || [];
          if (it.photoIds.length >= 8) throw new Error("每個景點最多 8 張相");
          it.photoIds.push(id);
        }
        const reopenItem = photoCtx.kind === "item" ? photoCtx.parent : null;
        photoCtx = null;
        clearBusy();
        saveTrip(t);
        toast("已加入相片");
        if (reopenItem) {
          const idx = (t.itinerary || []).findIndex((x) => x.id === reopenItem);
          if (idx >= 0) openMemory(idx);
        }
      } catch (err) {
        clearBusy();
        toast(err.message || "儲存相片失敗");
      }
    });
  }

  load();
  render();
  fetchRates();
})();
