export namespace CursorService {
  function iterateOverTextNodes(
    root: Node,
    breakingCondition: (textNode: Text) => boolean,
  ): boolean {
    for (const childNode of Array.from(root.childNodes)) {
      if (childNode.nodeType === Node.TEXT_NODE) {
        if (breakingCondition(childNode as Text)) {
          return true;
        }
      } else {
        if (iterateOverTextNodes(childNode, breakingCondition)) {
          return true;
        }
      }
    }
    return false;
  }

  export function getAbsoluteCursor(root: HTMLElement): number {
    const selection = getSelection();
    if (!selection) {
      return 0;
    }
    const { startOffset, startContainer } = selection.getRangeAt(0);
    let absoluteOffset = startOffset;
    iterateOverTextNodes(root, (textNode: Text) => {
      if (textNode === startContainer) {
        return true;
      }
      absoluteOffset += textNode.length;
      return false;
    });
    return absoluteOffset;
  }

  export function applyCursor(root: HTMLElement, absoluteOffset: number) {
    let offset = absoluteOffset;
    let container: Node | undefined;
    const selection = getSelection();
    if (!selection) {
      return;
    }
    const range = document.createRange();
    iterateOverTextNodes(root, (textNode: Text) => {
      const isCursorInsideNode = offset <= textNode.length;
      if (!isCursorInsideNode) {
        offset -= textNode.length;
      }
      container = textNode;
      return isCursorInsideNode;
    });
    range.setStart(container || root, offset);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
