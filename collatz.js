/*

  Generates a visualization of the Collatz Conjecture
  https://en.wikipedia.org/wiki/Collatz_conjecture

  Author: Michael J. Neumann
  https://www.michael-neumann.net

*/

// ***** SETUP AREA : start *****

const fullMode = true;       // consider all (even and odd) numbers, or take a shortcut and divide by 2 when returning the next number in the sequence
const fastMode = false;      // render all possible branches (fast) or combine overlapping branches (slow)
const treeSize = 120587;     // create branches for numbers from 1 to <treeSize>
const angle    = 0.09081979; // angle to turn when drawing even / odd number

// ***** SETUP AREA : end *****

function getNextNumber(number) {

  if (number %2 === 0) { return number / 2; }
  else                 { if (fullMode === true) { return (number * 3 + 1) } else { return (number * 3 + 1) / 2; } }

}

function isSubsetOf(array, candidate) {

  if (array.length > candidate.length) { return false; }

  for (var i=0; i<array.length; i++) { if (array[i] != candidate[i]) { return false; } }

  return true;

}

function createTree(depth) {

  // initalize with a tree for number 1

  var tree = [[1]];

  for (var number=2; number<=depth; number++) {

    var n = number;
    var branch = [n];

    while (n > 1) { branch.push(n = getNextNumber(n)); }
    branch.reverse();

    if (fastMode === false) {

      // optimize tree structure by extending existing trees
      // if the branch already exists, update it with the newer (longer) branch
      // if the branch is a subset of any existing branch, then there is nothing to do
      // if the branch does not exist, add it to the tree

      var addNewBranch = true;

      for (var i=0; i<tree.length; i++) {

        if (isSubsetOf(tree[i], branch)) { tree[i] = branch; addNewBranch = false; break; }
        else if (isSubsetOf(branch, tree[i])) { addNewBranch = false; break; }

      }

      if (addNewBranch) { tree.push(branch); }

    } else {

      tree.push(branch);

    }


  }

  return tree;

}

// setup and draw the final images on the canvas
// initial code release on 14.3.2020 (Pi Day) - see below for more Pis

function setup() {

  const tree  = createTree(treeSize);
  const dimension = Math.pow(PI, PI) * Math.pow(PI, PI);

  createCanvas(dimension, dimension - (dimension / PI));
  strokeWeight(HALF_PI);
  stroke(0, TWO_PI);
  noFill();

  var start;

  if (fullMode === true) { start = createVector(width / PI + Math.pow(PI, PI) + Math.pow(PI, PI), height / 2); }
  else                   { start = createVector(width / 2 + Math.pow(PI, PI) * PI, height - Math.pow(PI, PI) * 1.61803398875); }

  for (var i=0; i<tree.length; i++) {

    var v = start.copy();
    var z = createVector(0, -PI - PI / 1.61803398875);

    beginShape();
    vertex(v.x, v.y);

    for (var j=0; j<tree[i].length; j++) {

      if (tree[i][j] %2 === 0) { z.rotate(angle); }
      else                     { z.rotate(-angle); }

      v.add(z);
      vertex(v.x, v.y);

    }

    endShape();

  }

}
