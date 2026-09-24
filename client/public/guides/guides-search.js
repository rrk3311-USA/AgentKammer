/**
 * Field-guide search for static guide pages.
 * Lazy-loads guides-index.json, matches all query words against title,
 * description, category, and tags, and excludes the current page.
 */
(function () {
  var DEBOUNCE_MS = 120;
  var MAX_RESULTS = 6;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function normalizePath(value) {
    if (!value) return "";
    try {
      var url = new URL(value, window.location.href);
      return url.pathname.replace(/\/+$/, "") || "/";
    } catch (err) {
      return String(value).split("?")[0].split("#")[0].replace(/\/+$/, "");
    }
  }

  function isCurrentGuide(entryUrl, currentHint) {
    var entryPath = normalizePath(entryUrl);
    var here = normalizePath(window.location.pathname);
    var hint = normalizePath(currentHint || "");
    if (entryPath && (entryPath === here || entryPath === hint)) return true;
    var entryLeaf = entryPath.split("/").pop();
    var hereLeaf = here.split("/").pop();
    return Boolean(entryLeaf && hereLeaf && entryLeaf === hereLeaf);
  }

  function haystack(entry) {
    var tags = Array.isArray(entry.tags) ? entry.tags.join(" ") : "";
    return [entry.title, entry.description, entry.category, tags].join(" ").toLowerCase();
  }

  function matchEntries(entries, query, currentHint) {
    var words = String(query || "")
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!words.length) return [];
    return entries
      .filter(function (entry) {
        if (isCurrentGuide(entry.url, currentHint)) return false;
        var hay = haystack(entry);
        return words.every(function (word) {
          return hay.indexOf(word) !== -1;
        });
      })
      .slice(0, MAX_RESULTS);
  }

  function initBlock(root) {
    var input = root.querySelector("[data-guide-search-input]");
    var list = root.querySelector("[data-guide-search-list]");
    var status = root.querySelector("[data-guide-search-status]");
    var empty = root.querySelector("[data-guide-search-empty]");
    if (!input || !list || !status) return;

    var indexUrl = root.getAttribute("data-index") || "guides-index.json";
    var currentHint = root.getAttribute("data-current") || "";
    var cache = null;
    var inflight = null;
    var timer = null;
    var activeIndex = -1;
    var visible = [];

    function loadIndex() {
      if (cache) return Promise.resolve(cache);
      if (inflight) return inflight;
      inflight = fetch(indexUrl, { credentials: "same-origin" })
        .then(function (res) {
          if (!res.ok) throw new Error("Guide index failed");
          return res.json();
        })
        .then(function (data) {
          cache = Array.isArray(data) ? data : data && data.guides ? data.guides : [];
          return cache;
        })
        .catch(function () {
          inflight = null;
          cache = [];
          return cache;
        });
      return inflight;
    }

    function setExpanded(open) {
      input.setAttribute("aria-expanded", open ? "true" : "false");
      list.hidden = !open;
      if (empty) empty.hidden = true;
    }

    function setActive(next) {
      var options = list.querySelectorAll('[role="option"]');
      if (!options.length) {
        activeIndex = -1;
        input.removeAttribute("aria-activedescendant");
        return;
      }
      activeIndex = (next + options.length) % options.length;
      options.forEach(function (opt, i) {
        var on = i === activeIndex;
        opt.setAttribute("aria-selected", on ? "true" : "false");
        opt.classList.toggle("is-active", on);
        if (on) input.setAttribute("aria-activedescendant", opt.id);
      });
    }

    function render(entries, query) {
      visible = entries;
      activeIndex = -1;
      list.innerHTML = "";
      input.removeAttribute("aria-activedescendant");

      if (!query.trim()) {
        status.textContent = "";
        setExpanded(false);
        return;
      }

      if (!entries.length) {
        status.textContent = "0 matching guides";
        list.hidden = true;
        input.setAttribute("aria-expanded", "false");
        if (empty) empty.hidden = false;
        return;
      }

      if (empty) empty.hidden = true;
      status.textContent = entries.length === 1 ? "1 matching guide" : entries.length + " matching guides";
      entries.forEach(function (entry, i) {
        var li = document.createElement("li");
        li.id = root.id + "-opt-" + i;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", "false");
        var a = document.createElement("a");
        a.href = entry.url;
        a.className = "guide-search-hit";
        var title = document.createElement("span");
        title.className = "guide-search-hit-title";
        title.textContent = entry.title;
        var desc = document.createElement("span");
        desc.className = "guide-search-hit-desc";
        desc.textContent = entry.description;
        a.appendChild(title);
        a.appendChild(desc);
        li.appendChild(a);
        list.appendChild(li);
      });
      setExpanded(true);
      setActive(0);
    }

    function runSearch() {
      var query = input.value;
      loadIndex().then(function (entries) {
        if (input.value !== query) return;
        render(matchEntries(entries, query, currentHint), query);
      });
    }

    function scheduleSearch() {
      window.clearTimeout(timer);
      timer = window.setTimeout(runSearch, reduceMotion ? 0 : DEBOUNCE_MS);
    }

    function clearSearch() {
      input.value = "";
      visible = [];
      activeIndex = -1;
      list.innerHTML = "";
      status.textContent = "";
      setExpanded(false);
      input.removeAttribute("aria-activedescendant");
      input.focus();
    }

    function openActive() {
      if (activeIndex < 0 || !visible[activeIndex]) return;
      window.location.href = visible[activeIndex].url;
    }

    input.addEventListener("focus", function () {
      loadIndex();
    });
    input.addEventListener("input", scheduleSearch);
    input.addEventListener("keydown", function (event) {
      var key = event.key;
      if (key === "ArrowDown") {
        if (list.hidden) return;
        event.preventDefault();
        setActive(activeIndex + 1);
      } else if (key === "ArrowUp") {
        if (list.hidden) return;
        event.preventDefault();
        setActive(activeIndex - 1);
      } else if (key === "Enter") {
        if (!list.hidden && visible.length) {
          event.preventDefault();
          openActive();
        }
      } else if (key === "Escape") {
        event.preventDefault();
        clearSearch();
      }
    });

    list.addEventListener("mousemove", function (event) {
      var option = event.target.closest('[role="option"]');
      if (!option || !list.contains(option)) return;
      var options = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'));
      var idx = options.indexOf(option);
      if (idx >= 0 && idx !== activeIndex) setActive(idx);
    });

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              loadIndex();
              io.disconnect();
            }
          });
        },
        { rootMargin: "240px 0px" },
      );
      io.observe(root);
    }
  }

  ready(function () {
    document.querySelectorAll("[data-guide-search]").forEach(initBlock);
  });
})();
