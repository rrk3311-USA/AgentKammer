(function () {
  const header = document.querySelector("[data-ak-compact-header]");
  if (!header) return;
  const tog = header.querySelector(".ak-compact-header__toggle");
  if (!tog) return;
  const panel = document.getElementById(tog.getAttribute("aria-controls") || "ak-field-menu");
  if (!panel) return;

  const setMenu = (on) => {
    tog.setAttribute("aria-expanded", on ? "true" : "false");
    tog.setAttribute("aria-label", on ? "Close menu" : "Open menu");
    panel.hidden = !on;
    document.documentElement.classList.toggle("ak-compact-menu-on", on);
    document.body.classList.toggle("ak-compact-menu-on", on);
    document.body.classList.toggle("menu-on", on);
  };

  tog.addEventListener("click", () => setMenu(tog.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  panel.querySelectorAll("[data-fold]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-fold");
      const box = id ? document.getElementById(id) : null;
      if (!box) return;
      const open = box.hidden;
      box.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      const mark = btn.querySelector("[aria-hidden]");
      if (mark) mark.textContent = open ? "−" : "+";
    });
  });
})();
