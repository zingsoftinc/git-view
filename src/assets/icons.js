import {html} from '/node_modules/lit-html/lit-html.js';
export default {
  action: html`<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="96" height="96" rx="23" stroke="#FFF" stroke-width="4"/>
  <path d="M67 18L31 50L67 82" stroke="#FFF" stroke-width="5" stroke-linecap="round"/>
  </svg>
  `,
  close: html`<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="69.799" y1="30.201" x2="30.201" y2="69.799" stroke="white" stroke-width="10" stroke-linecap="round"/>
  <line x1="30.201" y1="30.201" x2="69.799" y2="69.799" stroke="white" stroke-width="10" stroke-linecap="round"/>
  </svg>
  `,
  folder: html`<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 32L49 68L81 32" stroke="white" stroke-width="10" stroke-linecap="round"/>
  </svg>
  `,
  files: html`<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M76.2418 10H38C34.6863 10 32 12.6863 32 16V68C32 71.3137 34.6863 74 38 74H78C81.3137 74 84 71.3137 84 68V18C80 14 80.5 14.5 76.2418 10ZM38 6C32.4772 6 28 10.4772 28 16V68C28 73.5229 32.4772 78 38 78H78C83.5228 78 88 73.5229 88 68V16C84 11.5 82.5 10 78 6H38Z" fill="white"/>
  <path d="M74 9V22H85" stroke="white" stroke-width="4"/>
  <path d="M26 23H29V19H26C20.4772 19 16 23.4772 16 29V81C16 86.5229 20.4772 91 26 91H66C71.5228 91 76 86.5229 76 81V78H72V81C72 84.3137 69.3137 87 66 87H26C22.6863 87 20 84.3137 20 81V29C20 25.6863 22.6863 23 26 23Z" fill="white"/>
  </svg>
  `,
  github: html`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"></path></svg>`
};