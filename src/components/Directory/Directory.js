import {html, render} from '/node_modules/lit-html/lit-html.js';
import SVGIcons from '../../assets/icons.js';
import template from './Directory.template.js';

class Directory extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
    this.root.addEventListener('click', (ev) => {
      const path = ev.target.getAttribute('data-path');
      if(path) {
        this.dispatchEvent(new CustomEvent('file-click', {detail: path }));
      }
    }, true);
  }

  set tree(val) {
    this._tree = val;
    this.render();
  }
  get tree() {
    return this._tree;
  }

  render() {
    render(template, this.root);
    const folderMap = new Map();
     // Create a Map from the tree path.
    this.tree.forEach(item => {
      let parent = this.root.querySelector('.gv-directory');
      if(item.path.includes('/')) {
        // Create a folder element if it does not exist already.
        let currentParentPath = '';
        // Generate folders in each part of the path if they do not exist yet.
        item.path.split('/').slice(0,-1).forEach(parentFolderName => {
          if(folderMap.has(currentParentPath + '/' + parentFolderName)) {
            currentParentPath = currentParentPath + '/' + parentFolderName;
            parent = folderMap.get(currentParentPath);
          } else {
            // const folder = document.createElement('gv-directory-folder');
            // folder.setAttribute('name', parentFolderName); 
            const folder = document.createElement('div');
            folder.className = 'gv-directory-folder';
            const folderContents = html`<div class="folder"><div class="folder-icon">${SVGIcons.folder}</div><div class="folder-name">${parentFolderName}</div></div>`
            render(folderContents, folder)

            parent.appendChild(folder);
            parent = folder;
            currentParentPath += '/' + parentFolderName;
            folderMap.set(currentParentPath, folder);
          }
        })
      }
      if(item.type === 'blob') {
        const fileElement = document.createElement('div');
        fileElement.className = 'gv-directory-item';
        fileElement.setAttribute('data-path', item.path);
        fileElement.innerHTML = item.path.split('/').pop();
        parent.appendChild(fileElement);
      }
    });


    
  }
}

export default Directory;