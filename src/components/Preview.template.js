import {html} from '/node_modules/lit-html/lit-html.js';
export default html`
  <style>
  * {
    box-sizing: border-box;
  }
  :host(gv-preview) {
    width: 100%;
    height: 100%;
    position: absolute;
    flex: 1;
    z-index: 1;
  }
  .container {
    width: 100%;
    height: 100%;
  }
  .preview {
    height: 100%;
  }
  .top {
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.4rem;
    align-items: center;
    height: 30px;
    width: 100%;
    background: #212121;
    color: white;
    font-size: 0.8rem;
  }

  .close {
    display: block;
    padding: 0.2rem 0.4rem;
    margin-right: 0.4rem;
    background: #2196f3;
    color: white;
    border: 1px solid #2196f3;
    font-size: 0.8rem;
    white-space: nowrap;
    cursor: pointer;
    width: 50px;
    text-align: center;
    user-select: none;
    outline: 0;
  }

  iframe {
    height: 100%;
    width: 100%;
    border: 0px;
    background: white;
  }
  </style>
  <div class="container">
    <div class="top">
      <div>Preview</div>
      <button class="close">Close</button>
    </div>
    <div class="preview">
      <iframe></iframe>
    </div>
  </div>
`