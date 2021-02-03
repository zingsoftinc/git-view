import {html} from '/node_modules/lit-html/lit-html.js';
import SVGIcons from '../../assets/icons.js';
export default html`
<style>
  :host(gv-directory) {
    display: flex;
    height: 100%;
    font-size:0.8rem;
    color: white;
    border-right: 1px solid #424242;
  }
  .folder {
    display: flex;
    align-items:center;
  }
  .folder-icon {
    display: flex;
    align-items: center;
    height: 15px;
    width: 15px;
    padding: 2px;
    margin-right: 4px;
  }
  .folder-icon svg {
    height: 70%;
    fill: #2196f3;
  }

  .files-icon, .files-icon svg {
    height: 15px;
    width: 15px;
  }
  .files-icon {
    margin-right: 0.3rem;
    margin-left: 0.5rem;
  }
  .folder, .gv-directory-item {
    cursor: pointer;
    user-select: none;
  }
   .folder:hover, .gv-directory-item:hover {
    background: gray;
  }
  .gv-directory-folder {
    display: block;
  }
  
  .gv-directory-item {
    display: block;
    padding-top: 0.4rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
  }
  .gv-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 30px;
    width: 100%;
    background: #212121;
    color: white;
    font-size: 0.8rem;
  }
  .gv-top > div {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .files-icon {
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
  }
  .action-icon {
    height: 15px;
    width: 15px;
    cursor: pointer;
    margin-right: 5px;
  }
  .action-icon svg{
    height: 100%;
    width: 100%;
  }

  .gv-directory {
    height: 100%;
    overflow: scroll;
    margin: 0 0.5rem;
  }

  /* Directory spacing */
  .gv-directory-folder > :not(.folder) {
    padding-left: 1rem;
  }
  .gv-directory-folder {
    margin-top: 0.2rem;
  }

</style>
<div class="container">
  <section class="gv-top">
    <div class="gv-top__left">
      <div class="files-icon">${SVGIcons.files}</div>
      <div>Files</div>
    </div>
    <div class="gv-top__right"> 
    <div class="action-icon">${SVGIcons.action}</div>
    </div>
  </section>
  <section class="gv-directory"></section>
</div>
 `;