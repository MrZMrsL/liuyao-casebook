/* 六爻案例库 Service Worker —— 离线可用 */
const VERSION = 'liuyao-v3';
const CORE_CACHE = VERSION + '-core';

/* 核心资源：安装时预缓存 */
const CORE_ASSETS = [
  './',
  './index.html',
  './assets/data.js',
  './manifest.webmanifest',
  './icon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CORE_CACHE)
      .then(c => c.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   /* 只管同源资源 */

  /* HTML 与数据：网络优先（保证更新及时），失败回退缓存 */
  const isHtml = req.mode === 'navigate' || url.pathname.endsWith('.html');
  const isData = url.pathname.endsWith('data.js');
  if (isHtml || isData) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CORE_CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(m => m || caches.match('./index.html')))
    );
    return;
  }

  /* 其余同源资源（附录 md、图标等）：缓存优先 + 后台更新 */
  e.respondWith(
    caches.match(req).then(hit => {
      const fetching = fetch(req).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CORE_CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || fetching;
    })
  );
});
