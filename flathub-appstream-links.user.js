// ==UserScript==
// @name        flathub appstream links
// @namespace   https://easrng.net
// @match       https://flathub.org/*
// @grant       none
// @version     1.0
// @author      easrng
// @description makes flathub install buttons point to the appstream:// url instead of the .flatpakref
// @downloadURL https://easrng.github.io/flathub-appstream-links/flathub-appstream-links.user.js
// @homepageURL https://github.com/easrng/flathub-appstream-links#readme
// @supportURL  https://github.com/easrng/flathub-appstream-links/issues
// ==/UserScript==

const prefix = "https://dl.flathub.org/repo/appstream/"
const suffix = ".flatpakref"

function toAppstream(str) {
  return (
    "appstream://" +
    str.slice(
      prefix.length,
      0 - suffix.length,
    )
  );
}

new MutationObserver(() => {
  const appstreamLinks = document.querySelectorAll(
    `a[href^="${prefix}"]`,
  );
  for (const appstreamLink of appstreamLinks) {
    appstreamLink.href = toAppstream(appstreamLink.getAttribute("href"));
    appstreamLink.replaceWith(appstreamLink.cloneNode(true)); // get rid of event listeners
  }
}).observe(document.documentElement, {
  attributes: true,
  childList: true,
  subtree: true,
});
