// Safari uses browser API instead of chrome
const api = typeof browser !== 'undefined' ? browser : chrome;

if (api.webNavigation) {
  api.webNavigation.onBeforeNavigate.addListener(
    function(details) {
      if (details.url.includes('youtube.com/shorts/')) {
        api.tabs.update(details.tabId, {
          url: 'https://www.youtube.com'
        });
        console.log('Redirected Shorts URL to YouTube homepage');
      }
    },
    { url: [{ hostContains: 'youtube.com' }] }
  );
}

console.log('YouTube Shorts Blocker background script loaded');