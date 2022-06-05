// Object to use as mixin for type mappings
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