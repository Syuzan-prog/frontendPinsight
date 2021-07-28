module.exports = {
  extends: [
    "stylelint-config-airbnb",
    "stylelint-config-rational-order",
  ],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    indentation: 4,
    'max-nesting-depth': 6,
    'selector-max-id': 1,
  },
};
