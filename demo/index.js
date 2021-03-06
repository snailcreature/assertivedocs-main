/**
 * @file
 * @fileoverview A set of example functions with attached assertions.
 */

/**
 * Greets a person by name.
 * @param {String} name - Name of the person to greet
 * @returns {String}
 * 
 * @assert {Assertion} Test1 - John:string=>Hello, John!
 * @assert {Assertion} Test2 - Ben:string=>Hello, John!
 * @assert Test3 - John:string,Ben=>Hello, John and Ben!
 * @assert Test4 - 1:bool=>Hello, true!:string
 * @assert - John=>Hello, John!
 */
function greet(name) {
  return `Hello, ${name}!`
}

/**
 * Adds two numbers together.
 * @param {Number} a
 * @param {Number} b 
 * @returns {Number}
 * 
 * @assert - 1:number,2:number=>3:number
 * @assert - 1:number,2:number=>5:number
 */
function add(a, b) {
  return a + b;
}

/**
 * Returns the name property of an object.
 * @param {Object} object - Object to read name from
 * @returns {String}
 * 
 * @assert ObjectTestJohn - test:object=>John:string
 * @assert ObjectTestBlank - :object=>John:string
 * @assert ClassTestJohn - class:object=>John:string
 */
function objectTest(object) {
  return object.name;
}

/**
 * A test class containing a name.
 */
class TestClass {
  /**
   * A test class that has a name property.
   * @param {String} name - The name to be stored
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Changes the stored name.
   * @param {String} newName - The new name to be stored
   */
  update(newName) {
    this.name = newName;
  }
}

console.log(greet("John"));
console.log(objectTest({name: "John"}));

module.exports = {
  greet,
  add,
  objectTest,
  TestClass,
}