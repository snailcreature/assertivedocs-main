/**
 * @file customasserts
 * @fileoverview Custom type mappings for objects and classes
 */

/**
 * Mixin for creating custom objects.
 * @namespace typeMappingsMixin
 * 
 * @example
const typeMappingsMixin = {
  object: function(arg) {
    try {
      switch (arg) {
        case "test":
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

module.exports = {
  typeMappingsMixin,
}
 */
const typeMappingsMixin = {
  /**
   * Takes the argument and attempts to find a matching object to return.
   * @memberof typeMappingsMixin
   * @param {String} arg - The argument passed to typeMappings
   * @returns {any}
   */
  object: function(arg) {
    try {
      switch (arg) {
        case "test":
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

module.exports = {
  typeMappingsMixin,
}