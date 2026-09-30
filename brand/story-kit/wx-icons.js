/* Thin line weather icons (44x44 viewBox, stroke and fill set by the .wxi CSS class), keyed by tools/cover_facts.py wxIcon:
   sun, partly, cloud, rain, storm, snow, fog, wind. Shared by cover-editorial.html and brief.html. */
window.WX_ICONS = {
  sun: '<circle cx="22" cy="22" r="7.5"/><path d="M22 6v4M22 34v4M6 22h4M34 22h4M10.7 10.7l2.8 2.8M30.5 30.5l2.8 2.8M10.7 33.3l2.8-2.8M30.5 13.5l2.8-2.8"/>',
  partly: '<circle cx="16" cy="15" r="5.5"/><path d="M16 4.5v2.6M5.5 15h2.6M8.6 7.6l1.8 1.8M23.4 7.6l-1.8 1.8M8.6 22.4l1.8-1.8"/><path d="M16 35h17a6 6 0 0 0 .5-12A8.4 8.4 0 0 0 17.6 21.6 6.8 6.8 0 0 0 16 35z" fill="#F8F8F6"/>',
  cloud: '<path d="M12 32h20a7 7 0 0 0 .6-14A9.6 9.6 0 0 0 14.4 16.4 7.8 7.8 0 0 0 12 32z"/>',
  rain: '<path d="M13 27h19a6.5 6.5 0 0 0 .6-13A9 9 0 0 0 15.3 12.4 7.4 7.4 0 0 0 13 27z"/><path d="M16 32l-2 5M23 32l-2 5M30 32l-2 5"/>',
  storm: '<path d="M13 27h19a6.5 6.5 0 0 0 .6-13A9 9 0 0 0 15.3 12.4 7.4 7.4 0 0 0 13 27z"/><path d="M23 29l-4 6h5l-3 6"/>',
  snow: '<path d="M13 27h19a6.5 6.5 0 0 0 .6-13A9 9 0 0 0 15.3 12.4 7.4 7.4 0 0 0 13 27z"/><path d="M16 33v5M13.8 34.2l4.4 2.6M18.2 34.2l-4.4 2.6M28 33v5M25.8 34.2l4.4 2.6M30.2 34.2l-4.4 2.6"/>',
  fog: '<path d="M13 22h19a6.5 6.5 0 0 0 .6-13A9 9 0 0 0 15.3 7.4 7.4 7.4 0 0 0 13 22z"/><path d="M8 28h28M11 33h22M14 38h16"/>',
  wind: '<path d="M6 17h20a4.5 4.5 0 1 0-4.5-4.5M6 24h28a4.5 4.5 0 1 1-4.5 4.5M6 31h14"/>'
};
