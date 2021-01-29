import {html, render} from '/node_modules/lit-html/lit-html.js';
import template from './Preview.template.js';
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
      let frame = this.root.querySelector('iframe');
      frame.src = `https://${repo.split('/')[0]}.github.io/${repo.split('/')[1]}`
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