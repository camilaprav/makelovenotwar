import postcss from 'https://esm.sh/postcss';
import selectorParser from 'https://esm.sh/postcss-selector-parser';
import prefixer from './prefixer.js';

let cue = '--tw-border-spacing';

async function patch(style) {
  if (style.textContent.includes('--wf-patched')) return;
  style.textContent = `:root { --wf-patched: 1 }\n\n` + await postcss([prefixer('tw')]).process(style.textContent);
}

let style = [...document.head.querySelectorAll('style')].find(x => x.textContent.includes(cue));
style && await patch(style);
document.body.hidden = false;

const observer = new MutationObserver(async muts => {
  for (let x of muts) {
    if (x.type !== 'characterData' || !x.target.textContent.includes(cue)) continue;
    patch(x.target);
  }
});

observer.observe(document.head, { childList: true, subtree: true, characterData: true });
