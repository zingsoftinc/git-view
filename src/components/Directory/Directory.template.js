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
    padding: 2px;
    margin-right: 4px;
  }
  .folder-icon svg {
    height: 70%;
    fill: #2196f3;
  }
  .folder, .gv-directory-item {
    cursor: pointer;
    padding: 0.3rem;
  }
   .folder:hover, .gv-directory-item:hover {
    background: gray;
  }
  .gv-directory-folder {
    display: block;
  }
  
  .gv-directory-folder > * {
    padding-left: 1rem;
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