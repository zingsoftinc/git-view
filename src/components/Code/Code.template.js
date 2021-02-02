import {html} from '/node_modules/lit-html/lit-html.js';
import CodeTheme from './CodeTheme.js';

export default html`<style>
  ${CodeTheme}
  :host(gv-code-viewer) {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background: white;
    height: 100%;
    overflow: scroll;
  }
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }
  pre {
    height: calc(100%);
    z-index: 1;
    overflow: scroll;
    margin: 0;
  }
  .line-num {
    display: inline-block;
    margin-right: 0.2rem;
    padding-left: 1rem;
    padding-right: 0.2rem;
    border-right: 1px solid black;
    color: gray;
  }
  .code-top {
    display: flex;
    background: #212121;
    align-items: center;
    justify-content: space-between;
    height: 30px;
  }
  .code-top > * {
    height:30px;
  }
  button {
    display: block;
    padding: 0.2rem 0.4rem;
    margin-right: 0.4rem;
    background: #2196f3;
    color: white;
    border: 1px solid #2196f3;
    font-size: 0.8rem;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    user-select: none;
    outline: 0;
    height: 24px !important;
  }
  #placeholder {
    height: calc(100%);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #585858;
    color: #9a9a9a;
    z-index: 0;
  }
  #placeholder.hidden {
    display: none;
  }
  #image-container {
    position: absolute;
    top: 30px;
    height: calc(100% - 30px);
    width: 100%;
  }
  #image-container iframe {
    height: 100%;
    width: 100%;
    background: #585858;
  }
  #image-container.hidden {
    display: none;
  }
  #read-only {
    background: #dadada;
    border: 1px solid #9e9e9e;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
    padding: 0.3rem;
    color: #7b7b7b;
    font-size: 0.8rem;
  }
</style>
<div class="container">
  <section class="code-top">
    <gv-tabs></gv-tabs>
    <button class="preview">Preview</button>
  </section>
    <div id="placeholder">Select a file from the directory</div>
  <pre></pre>
  <div id="read-only">Read-only</div>
  <div id="image-container">
  </div>
</div>
`;