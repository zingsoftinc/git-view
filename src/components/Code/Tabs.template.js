import {html} from '/node_modules/lit-html/lit-html.js';
export default html`
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