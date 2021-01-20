import DirectoryItem from './DirectoryItem.js';
import DirectoryFolder from './DirectoryFolder.js';
import {html, render} from '/node_modules/lit-html/lit-html.js';

import SVGIcons from '../../assets/icons.js';
const template = html`
  <style>
    *{
      box-sizing: border-box;
    }
    :host(gv-directory) {
      display: block;
      height: 100%;
      font-size: 0.8rem;
      color: white;
      border-right: 1px solid #424242;
    }
    .folder {
      display: flex;
    }
    .folder:before {
      content: 
    }

    .folder-icon {
      height: 15px;
      padding-right: 5px;
      height: 100%;
      width: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .folder-icon svg {
      height: 100%;
      fill: white;
    }

    .folder, gv-directory-item {
      cursor: pointer;
      padding: 0.3rem;
    }
     .folder:hover, gv-directory-item:hover {
      background: gray;
    }
    gv-directory-folder {
      display: block;
    }
    
    gv-directory-folder > * {
      padding-left: 1rem;
    }
    gv-directory-item {
      display: block;
      padding: 0.4rem 1rem;
    }
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .gv-top {
      display: flex;
      align-items: center;
      padding-left: 8px;
      min-height: 30px;
      width: 100%;
      background: #212121;
      color: white;
      font-size: 0.8rem;
    }

    .gv-directory {
      height: 100%;
      overflow: scroll;
      margin: 0 0.5rem;

    }
  </style>
  <div class="container">
    <section class="gv-top"><div class="folder-icon">${SVGIcons.folder}</div>Files</section>
    <section class="gv-directory"></section>
  </div>
`;

class Directory extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
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

    // // Create a folder map.
    //       let parent = this.shadowRoot.querySelector('.gv-directory');
    // this.tree.forEach(item => {
    //   if(item.path.includes('/')) {
    //    let currentParentPath = '';
    //     item.path.split('/').slice(0,-1).forEach(parentFolderName => {
    //       if(folderMap.has(currentParentPath + '/' + parentFolderName)) {
    //         currentParentPath = currentParentPath + '/' + parentFolderName;
    //         parent = folderMap.get(currentParentPath);
    //       } else {
    //         const folder = document.createElement('gv-directory-folder');
    //         folder.setAttribute('name', parentFolderName); 
    //         parent.appendChild(folder);
    //         parent = folder;
    //         currentParentPath += '/' + parentFolderName;
    //         folderMap.set(currentParentPath, folder);
    //       }
    //     })
    //   }
    // })

     // Create a Map from the tree path.
    this.tree.forEach(item => {
      let parent = this.shadowRoot.querySelector('.gv-directory');
      if(item.path.includes('/')) {
        // Create a folder element if it does not exist already.
        let currentParentPath = '';
        // Generate folders in each part of the path if they do not exist yet.
        item.path.split('/').slice(0,-1).forEach(parentFolderName => {
          if(folderMap.has(currentParentPath + '/' + parentFolderName)) {
            currentParentPath = currentParentPath + '/' + parentFolderName;
            parent = folderMap.get(currentParentPath);
          } else {
            const folder = document.createElement('gv-directory-folder');
            folder.setAttribute('name', parentFolderName); 
            parent.appendChild(folder);
            parent = folder;
            currentParentPath += '/' + parentFolderName;
            folderMap.set(currentParentPath, folder);
          }
        })
      }
      if(item.type === 'blob') {
        const fileElement = document.createElement('gv-directory-item');
        fileElement.setAttribute('data-path', item.path);
        fileElement.innerHTML = item.path.split('/').pop();
        parent.appendChild(fileElement);
      }
    });
    // debugger;
  }
}

// Register child components 
customElements.define('gv-directory-folder', DirectoryFolder);
customElements.define('gv-directory-item', DirectoryItem);

export default Directory;