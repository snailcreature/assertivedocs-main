When creating code, you may wish to pass values other than the basic 
types to a function. For example, when creating an event listener, the 
handler function takes an `event` parameter containing the details of 
the event that has triggered it. These events cannot be represented 
in a simple format of their own, like strings, numbers, and arrays. As 
of assertivedocs v0.4.0, you can use a mixin to add object handling to 
your unit tests.

A [mixin](https://javascript.info/mixins) is a piece of code that will be 
added to an object. Think of it like mixing drinks: You take a little bit of 
orange concentrate, add it to water, and mix. The result is still a single drink, 
but it contains water and orange.

When assertivedocs initialises, it attempts to mix in a `typeMappingsMixin` object 
from a file that you have specified in `opts.assertivedocs.customObjects` in your 
JSDoc config file. Using the `<arg>:object` type operator in an assertion will attempt 
to provide an object for the unit test, where the arg is a reference for the object in 
the mixin. By default, if there is no mixin provided, `:object` will default to an empty 
object `{}`. This will also happen if an undefined or blank `arg` is provided.

## Object Example

Let's say we have the below code that we want to test.

```javascript
/**
 * Returns the name property of an object.
 * @param {Object} object - Object to read name from
 * @returns {String}
 */
function objectTest(object) {
  return object.name;
}
```

1. Create a file for your custom mixin. In this example, we will be using a file called 
`customobjects.js`.

2. Paste the below template into `customobjects.js`. You must have a `typeMappingsMixin` object 
with an `object` member function in order for assertivedocs to use your custom objects.

```javascript
const typeMappingsMixin = {
  object: function(arg) {
    try {
      switch (arg) {
        default:
          return {};
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = {
  typeMappingsMixin,
}
```

3. Define an object with a `name` property to return when the `arg` is `test`. The `arg` 
parameter specified the name of the object to pass. For example, `@assert - test:object=>:undefined` 
will pass `test` to the `typeMappingsMixin.object` function and return the associated object.

```javascript
const typeMappingsMixin = {
  object: function(arg) {
    try {
      switch (arg) {

        // Object to return when the arg is 'test'
        case 'test':
          return {
            name: "John",
          }

        default:
          return {};
      }
    } catch (error) {
      return error;
    }
  }
}
```

4. Point assertivedocs to your mixin. In your JSDoc config file, set `opts.assertivedocs.customObjects` to the 
path to your mixin file. In the `jsdocconf.json` file for these docs, this option is set to `"./demo/customobjects"`.

```json
{
  "opts": {
    "assertivedocs": {
      "customObjects": "./demo/customobjects"
    }
  }
}
```

5. Add the assertion to your function. In our example, our function will now look like this.

```javascript
/**
 * Returns the name property of an object.
 * @param {Object} object - Object to read name from
 * @returns {String}
 * 
 * @assert ObjectTest - test:object=>John:string
 */
function objectTest(object) {
  return object.name;
}
```

Now when you run JSDoc, it will mix your `typeMappingsMixin` into `typeMappings` and generate 
a unit test for `objectTest` using your custom object.

## Class Example

Classes can be implemented for unit testing in a similar way to objects. Let's say we have a class 
`TestClass` in `index.js` that is defined as follows:

```javascript
class TestClass {
  constructor(name) {
    this.name = name;
  }
  
  update(newName) {
    this.name = newName;
  }
}

module.exports = {
  TestClass,
}
```

It has a name property, so we can use it to test the `objectTest` function from the last example.

1. Import your class into your mixin file. In our `customobjects.js`, we add the following to the 
top of the file:

```javascript
const { TestClass } = require('./index');
```

2. Define a case for this object. In our `typeMappingsMixin.object` function, we need to provide a 
case for when to provide this class. We will use `'class'`, so our `typeMappingsMixin` now looks 
as follows:

```javascript
const typeMappingsMixin = {
  object: function(arg) {
    try {
      switch (arg) {
        case "test":
          return {
            name: "John",
          }

        // Return new TestClass when the arg is "class"
        case "class":
          return new TestClass("John");


        default:
          return {};
      }
    } catch (error) {
      return error;
    }
  }
}
```

3. Add the assertion to your function. Using the argument `class:object` will mean that 
`new TestClass("John")` will be passed to `objectTest` during unit testing.

```javascript
/**
 * Returns the name property of an object.
 * @param {Object} object - Object to read name from
 * @returns {String}
 * 
 * @assert ObjectTest - test:object=>John:string
 * @assert ClassTest - class:object=>John:string
 */
function objectTest(object) {
  return object.name;
}
```

## Summary

Objects and classes are complex data structures that can contain properties and member functions. 
In order to test these in assertivedocs, the `:object` type operator is used. A mixin called `typeMappingsMixin` 
must be defined with an `object` member function. This will tell assertivedocs how to handle the object in any 
given situation. The file containing the mixin must be pointed to in `opts.assertivedocs.customObjects` to 
be included.