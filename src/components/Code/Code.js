import Prism from '/node_modules/prism-es6/prism.js';
import {html, render} from '/node_modules/lit-html/lit-html.js';
import Tabs from './Tabs.js';
import CodeTheme from './CodeTheme.js';

const template = html`<style>
  ${CodeTheme}
  :host(gv-code-viewer) {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background: white;
    height: 100%;
    overflow: scroll;
  }
  .container {
    height: 100%;
    position: relative;
  }
  pre {
    height: calc(100% - 60px);
    z-index: 1;
    overflow: scroll;
    margin: 0;
    padding: 0rem 1rem 1rem 0;
  }
  .line-num {
    display: inline-block;
    margin-right: 0.2rem;
    padding-left: 1rem;
    background: #d4d4d4;
  }
  .code-top {
    display: flex;
    background: #212121;
    align-items: center;
    justify-content: space-between;
  }
  .preview {
    display: block;
    padding: 0.2rem 0.4rem;
    margin: 0 0.4rem;
    background: #2196f3;
    color: white;
    border: 1px solid #2196f3;
    font-size: 0.8rem;
    height: 100%;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    outline: 0;
  }
  #placeholder {
    height: calc(100% - 30px);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #585858;
    color: #9a9a9a;
    z-index: 0;
  }
  #placeholder.hidden {
    display: none;
  }
  #image-container {
    position: absolute;
    top: 30px;
    height: calc(100% - 30px);
    width: 100%;
  }
  #image-container iframe {
    height: 100%;
    width: 100%;
    background: #585858;
  }
  #image-container.hidden {
    display: none;
  }
  #read-only {
    background: #dadada;
    border: 1px solid #9e9e9e;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
    padding: 0.3rem;
    color: #7b7b7b;
    font-size: 0.8rem;
  }
</style>
<div class="container">
  <section class="code-top">
    <gv-tabs></gv-tabs>
    <div><button class="preview">Preview</button></div>
  </section>
    <div id="placeholder">Select a file from the directory</div>
  <pre></pre>
  <div id="read-only">Read-only</div>
  <div id="image-container">
  </div>
</div>
`;

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
    render(template, this.root);
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