import {html, render} from '/node_modules/lit-html/lit-html.js';
const template = html`
  <style>
  * {
    box-sizing: border-box;
  }
  :host(gv-preview) {
    width: 100%;
    height: 100%;
  }
  .container {
    width: 100%;
    height: 100%;
  }
  .top {
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.4rem;
    align-items: center;
    height: 30px;
    width: 100%;
    background: #212121;
    color: white;
    font-size: 0.8rem;
  }

  .close {
    display: block;
    padding: 0.2rem 0.4rem;
    margin-right: 0.4rem;
    background: #2196f3;
    color: white;
    border: 1px solid #2196f3;
    font-size: 0.8rem;
    white-space: nowrap;
    cursor: pointer;
    width: 50px;
    text-align: center;
    user-select: none;
    outline: 0;
  }

  iframe {
    height: 100%;
    width: 100%;
    border: 0px;
    background: white;
  }
  </style>
  <div class="container">
    <div class="top">
      <div>Preview</div>
      <button class="close">Close</button>
    </div>
    <div class="preview">
      <iframe></iframe>
    </div>
  </div>
`
class Preview extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
  }
  static get observedAttributes() {
    return ['repo', 'gist'];
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const repo = this.getAttribute('repo');
    const page = this.getAttribute('page');
    const branch = this.getAttribute('branch');
    const gist = this.getAttribute('gist');
     if(!repo && !gist) {
      console.error('The owner and repo attribute must be specified.');
      return;
    }

    render(template, this.root);

    this.root.querySelector('.close').addEventListener('click', (ev) => {
      this.dispatchEvent(new CustomEvent('close-preview'));
    }, true);

    // Load the repo
    if(repo) {
      fetch(`https://api.github.com/repos/${repo}/contents/${page}?ref=${branch}`)
      .then((response) => {
          return response.json();
      }).then((data) => {
          let frame = this.root.querySelector('iframe');
          let page = atob(data['content']);
          const startOfHead = page.indexOf('<head>') + 6;
          page = page.slice(0, startOfHead) + `<base href="https://${repo.split('/')[0]}.github.io/${repo.split('/')[1]}">` + page.slice(startOfHead);
          frame.src = 'data:text/html;base64,' + encodeURIComponent(btoa(page));
      })
      .catch((err) => {
        console.error('Github page could not be found');
      });
    // Load the gist
    } else {
      let frame = this.root.querySelector('iframe');
      let page = this.cache.get(this.getAttribute('gist'));
      const htmlDom = new DOMParser().parseFromString(page, 'text/html');
      const head = htmlDom.documentElement.querySelector('head');
      const base = document.createElement('base');
      base.setAttribute('href', this.getAttribute('gist-url'));
      head.appendChild(base);

      // Extract script tags and inline them.
      htmlDom.documentElement.querySelectorAll('script').forEach((element) => {
        const src = element.getAttribute('src');
        if(src) {
          const contents = this.cache.get(src.split('/').pop());
          if(contents) {
            element.innerHTML = contents;
            element.removeAttribute('src');
          }
        }
      });
      // Extract CSS tags and inline them.
      htmlDom.documentElement.querySelectorAll('link').forEach((element) => {
        const href = element.getAttribute('href');
        if(href) {
            const contents = this.cache.get(href.split('/').pop());
            if(contents) {
              const styleElement = document.createElement('style');
              styleElement.innerHTML = contents;
              // Delete the current link element.
              element.parentElement.removeChild(element);
              head.appendChild(styleElement);
            }
        }
      });
      frame.src =  'data:text/html;base64,' + encodeURIComponent(btoa(new XMLSerializer().serializeToString(htmlDom.documentElement)));
  
    }

  }
}


export default Preview;