/* Service Worker —— 让程序装成桌面应用后能离线运行。
   策略：
     * 程序外壳（html/图标/manifest）用 cache-first，装好后秒开、断网可用
     * 数据文件用 network-first，联网时拿最新的，断网退回缓存
   版本号变了就丢弃旧缓存。改动程序后记得改 CACHE_VER。*/
var CACHE_VER = "cims-pf-v8";
var SHELL = [
  "./", "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png",
  "./logo-mark.png", "./logo-lockup.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_VER)
      .then(function (c) { return c.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
      .catch(function () { /* 某个资源缺失不应导致安装失败 */ })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== CACHE_VER; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;   // 跨域（镜像更新）不拦截

  var isData = url.pathname.indexOf("/data/") >= 0;
  if (isData) {
    // 数据：优先网络，失败回缓存
    e.respondWith(
      fetch(req).then(function (r) {
        var copy = r.clone();
        caches.open(CACHE_VER).then(function (c) { c.put(req, copy); });
        return r;
      }).catch(function () { return caches.match(req); })
    );
  } else {
    // 外壳：优先缓存，后台顺带更新
    e.respondWith(
      caches.match(req).then(function (hit) {
        var net = fetch(req).then(function (r) {
          var copy = r.clone();
          caches.open(CACHE_VER).then(function (c) { c.put(req, copy); });
          return r;
        }).catch(function () { return hit; });
        return hit || net;
      })
    );
  }
});
