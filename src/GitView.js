import Directory from './components/Directory/Directory.js';
import Preview from './components/Preview.js';
import Code from './components/Code/Code.js';
import {html, render} from '/node_modules/lit-html/lit-html.js';
import template from './GitView.template.js';
import SVGIcons from './assets/icons.js';

class GitView extends HTMLElement {

  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
    this.cache = new Map();
    this.elements = {
      code: null,
      preview: null,
      directory: null,
    };

    // Attributes
    this.repo;
    this.branch;
    this.page;
    this.gist;

    // Interal properties
    this._gistKey;
    // The rawgist url
    this._gistUrl;
    // An array of files for the directory tree.
    this._tree;
    
  }
  static get observedAttributes() {
    return ['repo', 'preview-branch', 'preview-page', 'gist'];
  }
  attributesChangedCallback(){
    this.fetchFromGit();
  }
  connectedCallback() {
    // Obtain user attributes.
    this.repo = this.getAttribute('repo');
    this.branch = this.getAttribute('preview-branch') || 'gh-pages';
    this.page = this.getAttribute('preview-page') || 'index.html';
    this.gist = this.getAttribute('gist');

    // Render out the initial template.
    this.render();

    // Fetch the git info
    this.fetchFromGit();
  }
  
  fetchFromGit() {
    // Fetch from a GitHub Repo
    if(this.repo && this.branch && this.page) {
      fetch(`https://api.github.com/repos/${this.repo}/git/trees/master?recursive=1`)
      .then((response) => response.json())
      .then(({tree}) => {
        this._tree = tree;
        this.setFooter(`https://github.com/${this.repo}`, this.repo);
        this.postFetch();
      })
      .catch((err) => console.error(err));

    // Fetch from a Gist
    } else if(this.gist && this.page) {
      fetch(`https://api.github.com/gists/${this.gist}`)
      .then((response) => response.json())
      .then(({files}) => {
        // Store all the file information in the cache.
        Object.keys(files).forEach((filename) => { this.cache.set(filename, files[filename].content)});

        // Create a an array of files to render the directory
        this._tree = Object.keys(files).map((filename) => ({path: filename, type: 'blob'}));
        // Obtain the gist URL from a file's raw url
        this._gistUrl = files[Object.keys(files)[0]].raw_url.split('/').slice(0, -1).join('/');

        // Set the footer
        this.setFooter(`https://gist.github.com/${this._gistUrl.split('/')[3]}/${this.gist}`, `gist: ${this.gist}`)
        this.postFetch();
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  postFetch() {
    // Trigger renders for the directory, preview, and code.
    this.renderDirectory();

    // Share the cache with the sub components.
    this.elements.code.cache = this.cache;
    this.elements.preview.cache = this.cache;

    // Set the gist url for the code viewer's image capability
    if(this._gistUrl) {
      this.elements.code.setAttribute('gist-url', this._gistUrl);
    }
    this.renderPreview();
    this.setEventListeners();
  }

  renderDirectory() {
    this.elements.directory.tree = this._tree;
  } 
  renderPreview() {
    const preview = this.elements.preview;
    if(this.repo) {
      preview.setAttribute('page', this.page);
      preview.setAttribute('branch', this.branch);
      preview.setAttribute('repo', this.repo);
    } else if(this.gist)  {
      preview.setAttribute('gist-url', this._gistUrl);
      preview.setAttribute('gist', this.page);
    }
  }
  // Triggered on a file item click
  renderCode(path) {
    this.elements.code.setAttribute('data-path', path);
    // Close the preview if its active
    this.elements.preview.className = 'hidden';
  }


   // Caches all files from the gist response
   setGistCache(files) {
    const tree = [];
    let key;
    let username;
    Object.keys(files).forEach((filename) => {
      this.cache.set(filename, files[filename].content);
      tree.push({path: filename, type: 'blob'});
      if(filename === this.page) {
        key = filename;
        const rawUrl = files[filename].raw_url.split('/').slice(0, -1).join('/');
        this.root.querySelector('gv-preview').setAttribute('raw-url', rawUrl);
        this.root.querySelector('gv-code-viewer').rawUrl = rawUrl;
        username = rawUrl.split('/')[3];
      }
    });
    if(key) {
      this.root.querySelector('gv-preview').setAttribute('gist', key);
    }
    this.root.querySelector('gv-directory').tree = tree;
    this.setFooter(`https://gist.github.com/${username}/${this.gist}`, `gist: ${this.gist}`)
  }

  render() {
    // Render the component from the template.
    render(template, this.root);
    // Store element references in the template
    this.elements.directory = this.root.querySelector('gv-directory');
    this.elements.code = this.root.querySelector('gv-code-viewer');
    this.elements.preview = this.root.querySelector('gv-preview');
    this.elements.footerLink = this.root.querySelector('.gv-footer__title');
  }
  
 

  setEventListeners() {
    this.elements.directory.addEventListener('file-click', (ev) => {
        const path = ev.detail;
        const url = `https://raw.githubusercontent.com/${this.repo}/master/${path}`;
        if(this.cache.has(path)){
            this.renderCode(path);
          } else {
            fetch(url)
            .then(response => response.text())
            .then((content) => {
              content = serializeTextNode(content);
              this.cache.set(path, content);
              this.renderCode(path);
            })
            .catch((err) => {
              console.error(err);
            });
          }
        
    })
    this.elements.code.addEventListener('show-preview', (ev) => {
      this.elements.preview.className = '';
    });
    this.elements.preview.addEventListener('close-preview', (ev) => {
      this.elements.preview.className = 'hidden';
    });
  }
 
  // Renders the footer link
  setFooter(url, name) {
    render(
      html`<a href="url">
        <div class="footer-icon">${SVGIcons.github}</div>
        ${name}
      </a>`,
      this.elements.footerLink
    );
  }


}

// Register internal components as web components
customElements.define('gv-directory', Directory);
customElements.define('gv-preview', Preview);
customElements.define('gv-code-viewer', Code);

function serializeTextNode(text) {
  let str =  new XMLSerializer().serializeToString(document.createTextNode(text));
  str = str.replace(/&lt;/g,'<');
  str = str.replace(/&gt;/g,'>');
  return str;
}

export default GitView;