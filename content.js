(function() {
  'use strict';

  const SELECTORS = {
    shelf: 'ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts]',
    sidebarButton: 'a[href="/shorts"], ytd-guide-entry-renderer a[title="Shorts"]',
    miniGuide: 'ytd-mini-guide-entry-renderer[aria-label="Shorts"]',
    chip: 'yt-chip-cloud-chip-renderer a[href*="/shorts"]',
    thumbnails: 'a[href*="/shorts/"]:not([data-blocked])',
    overlays: 'a.ytp-videowall-still[href*="/shorts/"]:not([data-blocked])',
    sections: '[aria-label*="Shorts"], [title*="Shorts"]'
  };

  const hiddenElements = new WeakSet();
  let removeTimer = null;

  function hideElement(element) {
    if (!element || hiddenElements.has(element)) return false;
    element.style.display = 'none';
    hiddenElements.add(element);
    return true;
  }

  function removeElement(element) {
    if (!element || hiddenElements.has(element)) return false;
    element.remove();
    hiddenElements.add(element);
    return true;
  }

  function removeShorts() {
    const shelf = document.querySelector(SELECTORS.shelf);
    if (removeElement(shelf)) {
      console.log('Removed Shorts shelf');
    }

    const sidebarButton = document.querySelector(SELECTORS.sidebarButton);
    if (sidebarButton) {
      const container = sidebarButton.closest('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer');
      if (hideElement(container)) {
        console.log('Hidden Shorts sidebar button');
      }
    }

    const miniGuide = document.querySelector(SELECTORS.miniGuide);
    if (hideElement(miniGuide)) {
      console.log('Hidden Shorts mini guide button');
    }

    const chip = document.querySelector(SELECTORS.chip);
    if (chip) {
      const container = chip.closest('yt-chip-cloud-chip-renderer');
      if (hideElement(container)) {
        console.log('Hidden Shorts tab/chip');
      }
    }

    const thumbnails = document.querySelectorAll(SELECTORS.thumbnails);
    thumbnails.forEach(thumbnail => {
      thumbnail.setAttribute('data-blocked', 'true');
      const container = thumbnail.closest('ytd-video-renderer, ytd-rich-item-renderer, ytd-grid-video-renderer');
      if (hideElement(container)) {
        console.log('Hidden Shorts video thumbnail');
      }
    });

    const overlays = document.querySelectorAll(SELECTORS.overlays);
    overlays.forEach(link => {
      link.setAttribute('data-blocked', 'true');
      if (hideElement(link.parentElement)) {
        console.log('Hidden Shorts overlay link');
      }
    });
  }

  function blockShortsNavigation() {
    if (window.location.href.includes('/shorts/')) {
      window.location.replace('https://www.youtube.com');
      console.log('Redirected from Shorts URL to YouTube homepage');
    }
  }

  function debouncedRemove() {
    if (removeTimer) return;
    removeTimer = setTimeout(() => {
      removeShorts();
      removeTimer = null;
    }, 100);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            const element = node;
            if (element.tagName &&
                (element.tagName.includes('YTD-REEL') ||
                 element.tagName.includes('YTD-RICH-SHELF') ||
                 element.querySelector?.('[href*="/shorts/"]'))) {
              debouncedRemove();
              return;
            }
          }
        }
      }
    }
  });

  const mainContent = document.querySelector('ytd-app, #content');
  if (mainContent) {
    observer.observe(mainContent, {
      childList: true,
      subtree: true
    });
  } else {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  window.addEventListener('yt-navigate-start', blockShortsNavigation);
  window.addEventListener('yt-navigate-finish', () => {
    removeShorts();
    blockShortsNavigation();
  });

  removeShorts();
  blockShortsNavigation();

  console.log('YouTube Shorts Blocker initialized (optimized)');
})();