/*

  Generates a visualization of the Collatz Conjecture
  https://en.wikipedia.org/wiki/Collatz_conjecture

  Translating and Rotating inspired by Daniel Shiffman (The Coding Train)
  https://thecodingtrain.com/CodingInTheCabana/002-collatz-conjecture.html

  Author: Michael J. Neumann
  https://www.michael-neumann.net

*/

// ***** SETUP AREA : start *****

/* fullMode = true  : consider all (even and odd) values when getting the next number
   fullMode = false : take a shortcut and additionally divide by 2 when getting the next number */

let fullMode = false;

// ***** SETUP AREA : end *****

/* ***************************************

   DO NOT CHANGE ANY CODE BELOW THIS LINE!

   *************************************** */

// returns the next number for the Collatz Conjecture
function getNextNumber(number) {

  if (number %2 == 0) { return number * 0.5; }
  else                { if (fullMode == true) { return (number * 3 + 1) } else { return (number * 3 + 1) * 0.5; } }

}

// returns true if the array is a subset of the candidate array
function isSubsetOf(array, candidate) {

  if (array.length > candidate.length) { return false; }

  for (var i=0; i<array.length; i++) { if (array[i] != candidate[i]) { return false; } }

  return true;

}

// creates the Collatz tree containing all branches up to a certain depth
function createTree(depth) {

  var tree = [];

  for (var number=1; number<=depth; number++) {

    var n = number;
    var branch = [n];
    var hasPositionInTree = -1;

    while (n > 1) {
      n = getNextNumber(n);
      branch.push(n);
    }
    branch.reverse();

    // optimize tree structure by extending existing trees
    for (var i=0; i<tree.length; i++) {
      // if any tree branch is a subset of the current branch, remember the tree's branch
      if (isSubsetOf(tree[i], branch)) { hasPositionInTree = i; break; }
      // if current branch is a subset of the any tree branch, then there is nothing to do
      else if (isSubsetOf(branch, tree[i])) { hasPositionInTree = -2; break; }
    }

    // if the branch already exists, update it with the newer (longer) version
    if (hasPositionInTree > -1) { tree[i] = branch; }
    // if the branch does not yet exist, create a new branch in the tree
    else if (hasPositionInTree == -1) { tree.push(branch); }

  }

  return tree;

}

// setup and draw the final images on the canvas
// code release on 14.3.2020 (Pi Day) - see below for more Pis
function setup() {

  let tree  = createTree(120587);
  let angle = 0.09081979;
  let len   = PI;

  let dimension = Math.pow(PI, PI) * Math.pow(PI, PI);

  createCanvas(dimension, dimension - (dimension / PI));
  background(255);

  for (var i=0; i<tree.length; i++) {

    resetMatrix();

    // change origin depening on fullMode
    if (fullMode == true) { translate(width / PI + Math.pow(PI, PI) + Math.pow(PI, PI), height / 2); }
    else                  { translate(width / 2 + (Math.pow(PI, PI) * PI), height - Math.pow(PI, PI) - Math.pow(PI, PI)); }

    for (var j=0; j<tree[i].length; j++) {

      if (tree[i][j] %2 == 0) { rotate(angle); }
      else                    { rotate(-angle); }

      strokeWeight(PI/2);
      stroke(0, 10);
      line(0,0,0,-len);
      translate(0,-len-(PI/2));

    }

  }

}
