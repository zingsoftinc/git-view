
class DirectoryFolder extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const folder = document.createElement('div');
    folder.className = 'folder';
    folder.innerHTML =`<img class="folder-icon" src="../assets/folder.svg"/>
    <div class="folder-name">${this.getAttribute('name')}</div>`

    this.prepend(folder);
  }

}

export default DirectoryFolder;