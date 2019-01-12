export abstract class BinaryTreeNode<T = any> {
  value: T;
  left: BinaryTreeNode<T>;
  right: BinaryTreeNode<T>;
  parent: BinaryTreeNode<T>;

  abstract get leftHeight(): number;
  abstract get rightHeight(): number;
  abstract get height(): number;
  abstract get balanceFactor(): number;
  abstract get uncle(): BinaryTreeNode<T>;
  abstract setValue(value: T): BinaryTreeNode<T>;
  abstract setLeft(node: BinaryTreeNode<T>): BinaryTreeNode<T>;
  abstract setRight(node: BinaryTreeNode<T>): BinaryTreeNode<T>;
  abstract removeChild(node: BinaryTreeNode<T>): boolean;
  abstract replaceChild(
    nodeToReplace: BinaryTreeNode<T>,
    replacementNode: BinaryTreeNode<T>,
  ): boolean;
  abstract traverseInOrder(): any[];
  abstract toString(): string;
}

export interface BinaryTreeNodeFactoryCallbacks<T> {
  allowTraversal: (
    node: BinaryTreeNode<T>,
    child: BinaryTreeNode<T>,
  ) => boolean;
  enterNode: (node: BinaryTreeNode<T>) => any;
  leaveNode: (node: BinaryTreeNode<T>) => any;
}

export abstract class BinaryTreeNodeFactory {
  abstract copyNode<T>(
    sourceNode: BinaryTreeNode<T>,
    targetNode: BinaryTreeNode<T>,
  ): void;
  abstract create<T>(): BinaryTreeNode<T>;
  /**
   * 广度优先
   * @param rootNode
   * @param callbacks
   */
  abstract breadthFirstSearch<T>(
    rootNode: BinaryTreeNode<T>,
    callbacks: BinaryTreeNodeFactoryCallbacks<T>,
  ): void;
  /**
   * 深度优先
   * @param rootNode
   * @param callbacks
   */
  abstract depthFirstSearch<T>(
    rootNode: BinaryTreeNode<T>,
    callbacks: BinaryTreeNodeFactoryCallbacks<T>,
  ): void;
}
