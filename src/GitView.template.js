import {html} from '/node_modules/lit-html/lit-html.js';

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
  }
  gv-directory {
    width: 200px;
    min-width: 200px;
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
</style>
<section class="content">
  <gv-directory></gv-directory>
  <section class="content__right">
    <gv-code-viewer></gv-code-viewer>
    <gv-preview></gv-preview>
  </section>
</section>
<section class="gv-footer">
  <div class="gv-footer__title">
  </div>
  <div class="gv-footer__brand">
  </div>
</section>
`;