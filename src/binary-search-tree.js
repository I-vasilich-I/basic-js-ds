const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    
    const treeNode = this.find(data);
    
    if (treeNode) {
      return;
    }
    
    const node = new Node(data);

    if (!this._root) {
      this._root = node;
      return;
    }

    let subNode = this._root;

    while(true) {
      if (subNode.data > data) {
        if (subNode.left !== null) {
          subNode = subNode.left;
        } else {
          subNode.left = node;
          break;
        }
      } else {
        if (subNode.right !== null) {
          subNode = subNode.right;
        } else {
          subNode.right = node;
          break;
        }
      }
    }
  }

  has(data) {
    const node = this.find(data);
    return !!node;
  }

  find(data) {
    if (!this._root) {
      return null;
    }

    let node = this._root;

    while (node) {
      if (data === node.data) {
        return node;
      }

      if (data < node.data) {
        node = node.left;
        continue;
      }

      if (data > node.data) {
        node = node.right;
        continue;
      }
    }

    return null;
  }

  findMin(node) {
    let left = node;
    while (left.left) {
      left = left.left;
    }

    return left;
  }

  remove(data) {
    const node = this.has(data);

    if (!node) {
      return;
    }

    let parent = this._root;

    if (parent.data === data) {
      const rightMin = this.findMin(parent.right);
      rightMin.left = parent.left;
      this._root = parent.right;
      return;
    }

    let sub;
    let direction;

    if (data > parent.data) {
      sub = parent.right;
      direction = 'right';
    } else {
      sub = parent.left;
      direction = 'left';
    }
    
    while (true) {
      if (data > sub.data) {
        parent = sub;
        sub = sub.right;
        direction = 'right';
        continue;
      }

      if (data < sub.data) {
        parent = sub;
        sub = sub.left;
        direction = 'left';
        continue;
      }

      const { left, right } = sub;

      if (left === null && right === null) {
        parent[direction] = null;
        return;
      }

      if (left === null) {
        parent[direction] = sub.right;
        return;
      }

      if (right === null) {
        parent[direction] = sub.left;
        return;
      }

      const rightMin = this.findMin(sub.right);
      rightMin.left = sub.left;
      parent[direction] = sub.right;

      return;
    }
  }

  min() {
    return this.findMin(this._root)?.data;
  }

  max() {
    let node = this._root;

    while (node.right) {
      node = node.right;
    }

    return node?.data;
  }
}

module.exports = {
  BinarySearchTree
};