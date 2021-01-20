import {html, render} from '/node_modules/lit-html/lit-html.js';
import {unsafeHTML} from '/node_modules/lit-html/directives/unsafe-html.js';
import SVGIcons from '../../assets/icons.js';
class Tabs extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
    this.current;
    this.tabs = new Set();
  }
  static get observedAttributes() {
    return ['current'];
  }
  attributeChangedCallback() {
    this.render();
  }
  connectedCallback() {
    const template = html`
    <style>
    * {
      box-sizing: border-box;
    }
    :host(gv-tabs) {
      height: 100%;
      display: flex;
      align-items: center;
      height: 30px;
      width: 100%;
      background: #212121;
      color: white;
      font-size: 0.8rem;
      overflow: scroll;
    }
    :host(gv-tabs)::-webkit-scrollbar {
      display: none;
    }
    .gv-top__tabs {
      display: flex;
      height: 100%;
    }
    .tab {
      height: 100%;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 8px;
      border-right: 1px solid #424242;
      border-left: 1px solid #424242;
    }
    .tab--active {
      background: #2196f3;
      color: white;
    }
    .close {
      height: 12px;
      margin-left: 5px;
      width: 12px;
      user-select: none;
    }
    .close svg {
      height: 100%;
      width: 100%;
      fill: white;
    }
    </style>
    <div class="gv-top__tabs">
    </div>
  `;
    render(template, this.root);
    this.tabsElement = this.root.querySelector('.gv-top__tabs');
    this.tabsElement.addEventListener('click', (ev) => {
      const close = ev.path.find(el => el.className && el.className === 'close')
      if(close) {
        const url = close.getAttribute('data-url')
        this.closeTab(url);
        this.dispatchEvent(new CustomEvent('close',{ detail: {tab: url, next: this.current}}));
        this.render();
      } else if(ev.target.className.includes('tab')) {
        this.setActiveTab(ev.target);
        this.dispatchEvent(new CustomEvent('active',{ detail: {tab: ev.target.getAttribute('data-url')}}))
      }
    });
  }

  updateActive(url) {

    this.tabs.add(url);
    this.current = url;
    this.render(url);
  }
  setActiveTab(element) {
    
    if(this.current) {
      const el = this.root.querySelector(`[data-url="${this.current}"]`)
      el.classList.remove('tab--active');
    }
    this.current = element.getAttribute('data-url');
    element.classList.add('tab--active');
  }
  closeTab(tab) {
    // Switch out the tab to the first one in the iterator (the first tab on the left)
    if(tab === this.current) {
      if(this.tabs.size > 1) {
        this.current = null;
        this.tabs.delete(tab);
        const arr = [...this.tabs];
       this.setActiveTab(this.root.querySelector(`[data-url="${arr.shift()}"]`));
      } else {
        this.current = null;
        this.tabs.delete(tab);
      }
    }
    // Otherwise just remove it.
    else {
      this.tabs.delete(tab);
      this.render();
    }
  }
  render() {
    const tabs = [];
    this.tabs.forEach((tab) => {
      tabs.push(html`<div class="tab ${(this.current === tab)? 'tab--active' : ''}" data-url="${tab}">
        ${tab} <div class="close" data-url="${tab}">${SVGIcons.close}</div>
      </div>`);
    });
    render(html`${tabs}`, this.root.querySelector('.gv-top__tabs'));
  }

}

export default Tabs;