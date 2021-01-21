import Prism from '/node_modules/prism-es6/prism.js';
import {render} from '/node_modules/lit-html/lit-html.js';
import Tabs from './Tabs.js';
import template from './Code.template.js'

class Code extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
    render(template, this.root);
    this.preElement = this.root.querySelector('pre');
    this.tabsElement = this.root.querySelector('gv-tabs');
    this.imgContainer = this.root.querySelector('#image-container');
    this.cache = null;

    this.tabsElement.addEventListener('active', (ev) => {
      this.loadViewer(this.cache.get(ev.detail.tab), ev.detail.tab);
    })
    this.tabsElement.addEventListener('close', (ev) =>  {
      this.loadViewer(this.cache.get(ev.detail.next), ev.detail.next);
    })
    this.root.querySelector('.preview').addEventListener('click', (ev) => {
      this.dispatchEvent(new CustomEvent('show-preview'));
    }, true);
  }
  static get observedAttributes() {
    return ['data-path'];
  }
  attributeChangedCallback() {
    this.render();
    this.tabsElement.updateActive(this.getAttribute('data-path'));
  }
  render() {
    render(template, this);
    const path = this.getAttribute('data-path');
    this.loadViewer(this.cache.get(path), path);
  }

  loadViewer(content, path) {
    this.preElement.innerHTML = '';
    this.imgContainer.innerHTML = '';
    this.imgContainer.className = 'hidden';
    if(!path) {
      this.root.querySelector('#placeholder').classList = "";
      return;
    }
    if(isImage(path)) {
      const iframe = document.createElement('iframe');
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <style>
            html,body {
              margin:0;
              padding:0;
              height:100%;
              width:100%;
            }
            body {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          </style>
        <base href="${this.getAttribute('gist-url')}"/></head>
          <body>
            <img style="width: 50%;" src="${path}"/>
          </body>
        </html>`;
      iframe.src = 'data:text/html;base64,' + encodeURIComponent(btoa(html));
      this.imgContainer.className = '';
      this.imgContainer.appendChild(iframe);

    } else if(path) {
      const code = document.createElement('code');
      const {fn, ext} = getLanguage(path);

      const highlighted = Prism.highlight(content, fn, ext);
      code.innerHTML = highlighted
      .split('\n')
      .map((line, num) => `<span class="line-num">${(num + 1).toString().padStart(2, ' ')}.</span> ${line}`)
      .join('\n');
      this.preElement.appendChild(code);
      this.root.querySelector('#placeholder').classList = "hidden";
    } else {
      this.root.querySelector('#placeholder').classList = "";
    }
  }
}
function getLanguage(filename) {
  const ext = filename.split('.').pop();
  if(Prism.languages[ext]) {
    return {
      fn: Prism.languages[ext],
      ext: ext
    }
  } else {
    return {
      fn: Prism.languages.markup,
      ext: 'markup',
    }
  }
}

function isImage(str) {
  return ['png', 'gif', 'jpg', 'jpeg','svg','webp'].some(ext => str.indexOf(ext) > -1);
}

customElements.define('gv-tabs', Tabs);

export default Code;