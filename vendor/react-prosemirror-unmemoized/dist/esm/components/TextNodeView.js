import { DecorationSet } from "prosemirror-view";
import { Component } from "react";
import { CompositionViewDesc, TextViewDesc } from "../viewdesc.js";
import { wrapInDeco } from "./ChildNodeViews.js";
export class TextNodeView extends Component {
  updateEffect() {
    const { decorations, siblingDescriptors, node } = this.props;
    // There simply is no other way to ref a text node
    // eslint-disable-next-line react/no-find-dom-node
    const dom = findDOMNode(this);
    // We only need to explicitly create a CompositionViewDesc
    // when a composition was started that produces a new text node.
    // Otherwise we just rely on re-rendering the renderRef
    if (!dom) {
      return;
    }
    let textNode = dom;
    while (textNode.firstChild) {
      textNode = textNode.firstChild;
    }
    if (!this.viewDescRef || this.viewDescRef instanceof CompositionViewDesc) {
      this.viewDescRef = new TextViewDesc(
        undefined,
        [],
        node,
        decorations,
        DecorationSet.empty,
        dom,
        textNode,
      );
    } else {
      this.viewDescRef.parent = undefined;
      this.viewDescRef.children = [];
      this.viewDescRef.node = node;
      this.viewDescRef.outerDeco = decorations;
      this.viewDescRef.innerDeco = DecorationSet.empty;
      this.viewDescRef.dom = dom;
      // @ts-expect-error We have our own ViewDesc implementations
      this.viewDescRef.dom.pmViewDesc = this.viewDescRef;
      this.viewDescRef.nodeDOM = textNode;
    }
    siblingDescriptors.push(this.viewDescRef);
  }
  componentDidMount() {
    this.updateEffect();
  }
  componentDidUpdate() {
    this.updateEffect();
  }
  render() {
    const { node, decorations } = this.props;
    return decorations.reduce(wrapInDeco, node.text);
  }
  constructor(...args) {
    super(...args);
    this.viewDescRef = null;
  }
}

//@ts-expect-error This module isn't typed
import { findCurrentHostFiber } from "react-reconciler/reflection.js";
// https://github.com/facebook/react/blob/main/packages/shared/ReactInstanceMap.js#L18
export function getInstance(key) {
  return key._reactInternals;
}
// https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/client/ReactFiberConfigDOM.js#L322
function getPublicInstance(instance) {
  return instance;
}
// https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberReconciler.js#L153
function findHostInstance(component) {
  const fiber = getInstance(component);
  if (fiber === undefined) {
    if (typeof component.render === "function") {
      throw new Error("Unable to find node on an unmounted component.");
    } else {
      const keys = Object.keys(component).join(",");
      throw new Error(
        `Argument appears to not be a ReactComponent. Keys: ${keys}`,
      );
    }
  }
  const hostFiber = findCurrentHostFiber(fiber);
  if (hostFiber === null) {
    return null;
  }
  return getPublicInstance(hostFiber.stateNode);
}
// https://github.com/facebook/react/blob/main/packages/react-dom/src/client/ReactDOMClient.js#L43
export function findDOMNode(componentOrElement) {
  return findHostInstance(componentOrElement);
}
