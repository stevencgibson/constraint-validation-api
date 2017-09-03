# constraint-validation-api

Uses JavaScript's Constraint Validation API to extend the behaviour of native browser form validation.

Native validation will tell you when a field's input:

- is missing
- is not the expected length
- is not the expected format
- does not match the expected pattern
- is too high or too low

Problems with HTML5 validation:

- native error messages are inconsistent across browsers e.g. "Please fill out this field" in Chrome vs "This is a required field" in IE
- native error messages can be verbose e.g. "Please lengthen this text to 5 characters or more (you are currently using 1 character)."
- native error messages can't be styled

Here, we display an error that is:
- shown when the user blurs a field or submits the form
- a consistent message across browsers
- styled consistently across browsers

![screenshot of form errors](https://raw.githubusercontent.com/stevencgibson/constraint-validation-api/master/screen.jpg)

## Geting started

```
npm install
npm start
```


## Resources

- https://css-tricks.com/form-validation-part-1-constraint-validation-html/
- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
