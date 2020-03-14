# Visualization of the Collatz Conjecture

See [Collatz Conjecture - Wikipedia](https://en.wikipedia.org/wiki/Collatz_conjecture) for more information.

This code has been uploaded on March 14th - Pi Day. Therefore you will find a significant number of unnecessary calculations involving PI when drawing the output.

This algorithm uses an optimization method to reduce the number of overlapping trees.
* If a new branch is extending an already existing branch, it will replace it in the tree instead of spawning a new branch.
* If a new branch is a subset of an already existing branch, it will not be addded as it's already part of the longer branch.
* If a new branch is indeed new, it will spawn a new branch in the tree.

When drawing the algorithm takes a number in the tree and renders a line to the previous number, where the length of the line is always the same size (PI). In case a number is even, the canvas rotates in a positive angle - if the number is odd, the canvas rotates in a negative angle when rendering the final output.

Depending on the rendering mode, a different starting point of the output needs to be determined.

The default values can cause browser performance issues, as the initial Collatz Tree is built with 120587 numbers.

## Setup

In **collatz.js** define **fullMode** in the Setup Area.

If set to **true**, all even and odd numbers in the sequence are considered for rendering.

If set to **false**, the algorithm takes a shortcut and adds a division by 2 to the odd numbers.

The result will look different as the tree is now rendered with a different set of numbers.

## Output

![Collatz Kiwi - fullMode = true](collatz.v1.png)

![Collatz Fern - fullMode = false](collatz.v2.png)
