import {html, render} from '/node_modules/lit-html/lit-html.js';
import template from './Tabs.template.js';
import SVGIcons from '../../assets/icons.js';
class Tabs extends HTMLElement {
  constructor() {
    super();
    this.current;
    this.tabs = new Set();
    this.root = this.attachShadow({mode: 'open'});
  }
  static get observedAttributes() {
    return ['current'];
  }
  attributeChangedCallback() {
    this.render();
  }
  connectedCallback() {
 
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