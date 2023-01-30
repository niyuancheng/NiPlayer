import { Component } from "../../../class/Component";
import { Player } from "../../../page/player";
import { ComponentItem, DOMProps, Node } from "../../../types/Player";
import { $, addClass, checkIsMouseInRange } from "../../../utils/domUtils";

export class Options extends Component implements ComponentItem {
  id = "Options";
  props: DOMProps;
  player: Player;
  hideWidth: number;
  hideHeight: number;
  hideBox: HTMLElement;
  iconBox: HTMLElement;
  constructor(
    player: Player,
    container: HTMLElement,
    hideWidth?: number,
    hideHeight?: number,
    desc?: string,
    props?: DOMProps,
    children?: Node[]
  ) {
    super(container, desc, props, children);
    this.player = player;
    props ? (this.props = props) : (this.props = {});
    this.hideHeight = hideHeight;
    this.hideWidth = hideWidth;
    this.initBase();
  }

  initBase() {
    this.initBaseTemplate();
    this.initBaseEvent();
  }

  initBaseTemplate() {
    this.hideBox = $("div",{style:{display:"none"}});
    addClass(this.hideBox,["video-set"])
    if(this.hideHeight && this.hideHeight > 0) {
        this.hideBox.style.height = this.hideHeight + 'px';
    }
    if(this.hideWidth && this.hideWidth > 0) {
        this.hideBox.style.width = this.hideWidth + 'px'
    }

    this.el.appendChild(this.hideBox);

    this.iconBox = $("div");
    // hideBox距离底部的距离先写死，到时候再做微调
    this.hideBox.style.bottom = "50px"
    addClass(this.iconBox,["video-icon"])
    this.el.appendChild(this.iconBox);
  }

  initBaseEvent() {
    this.el.onmouseenter = (e) => {
        let ctx = this;
        ctx.hideBox.style.display = "";
        document.body.onmousemove = ctx.handleMouseMove.bind(this);
    }
  }

  handleMouseMove(e:MouseEvent) {
    let pX = e.pageX,pY = e.pageY;
    let ctx = this;
    if(!checkIsMouseInRange(ctx.el,ctx.hideBox,pX,pY)) {
        ctx.hideBox.style.display = "none"
        document.body.onmousemove = null;
    }
  }
}
