import {html} from '/node_modules/lit-html/lit-html.js';
import SVGIcons from '../../assets/icons.js';
export default html`
<style>
  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  :host {
    --background: #424242;
    --border-color: #212121;
    display: flex;
    flex-direction: column;
    background-color: var(--background);
    border-right: 1px solid var(--border-color);
    height: 100%;
    width: 100%;
   }
  .gv-footer {
    display: flex;
    align-items: center;
    height: 30px;
    width: 100%;
    background: var(--border-color);
    color: white;
    font-size: 0.8rem;
    padding: 0px;
    justify-content: space-between;
  }
 
  .gv-footer a {
    display: flex;
    align-items: center;
    height: 100%;
    color: white;
    text-decoration: none;
    padding: 5px;
  }
  .gv-footer a:hover {
    text-decoration: underline;
  }
  .gv-footer a img {
    height: 90%;
    margin-right: 0.5rem;
    fill: white;
  }
  .gv-footer__brand {
    margin-right: 0.4rem;
  }

  .content {
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  gv-directory {
    min-width: 200px;
    width: 200px;
  }
  gv-code-viewer {
    width: 100%;
  }
  gv-preview.hidden {
    display: none;
  }
  .footer-icon {
    height: 15px;
    width: 15px;
    margin: 0 5px;
  }
  .footer-icon svg {
    height: 100%;
    width: 100%;
    fill: white;
  }

  .content__right {
    display: flex;
    position: relative;
    flex: 1;
  }

  .resizer {
    position: absolute;
    left: -5px;
    width: 10px;
    background: none;
    height: 100%;
    cursor: col-resize;
  }
  .collapsed-pane {
    display: none;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #212121;
    cursor: pointer;
    user-select: none;
  }
  .collapsed-page--hidden {
    display: none;
  }
  .collapsed-pane__contents {
    display: flex;
    transform: rotate(-90deg);
    align-items: center;
    width: 40px;
    color: white;
  }

  .folder-icon svg {
    width: 15px;
    height: 15px;
    fill: #2196f3;
    margin-right: 1rem;
  }
  .resizer-helper {
    display: none;
    position: absolute;
    top: 0;
    left: right;
    width: 100%;
    height: 100%;
    z-index: 1;
    user-select: none;
  }

</style>
<section class="content">
  <section class="collapsed-pane">
    <div class="collapsed-pane__contents">
      <div class="folder-icon">${SVGIcons.files}</div>
      Files
    </div>
  </section>
  <gv-directory></gv-directory>
  <section class="content__right">
    <div class="resizer"></div>
    <gv-code-viewer></gv-code-viewer>
    <gv-preview></gv-preview>
    <div class="resizer-helper"></div>
  </section>
</section>
<section class="gv-footer">
  <div class="gv-footer__title">
  </div>
  <div class="gv-footer__brand">
  </div>
</section>
`;