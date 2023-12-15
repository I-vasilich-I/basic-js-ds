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
    
    const hasData = this.has(data);
    
    if (hasData) {
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

    // in case data is the root, connect left branch into minimum on the right branch
    if (parent.data === data) {
      const rightMin = this.findMin(parent.right);
      rightMin.left = parent.left;
      this._root = parent.right;
      return;
    }

    let direction = data > parent.data ? 'right' : 'left';
    let sub = parent[direction];

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

      // data === sub.data

      const { left, right } = sub;

      // no sub branches
      if (left === null && right === null) {
        parent[direction] = null;
        return;
      }

      // no left branch
      if (left === null) {
        parent[direction] = right;
        return;
      }

      // no right branch
      if (right === null) {
        parent[direction] = left;
        return;
      }

      // both branches there
      // find the minimum on the right branch, and connect sub.left into it
      // connect sub.right branch into parent's left|right branch

      const rightMin = this.findMin(right);
      rightMin.left = left;
      parent[direction] = right;

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