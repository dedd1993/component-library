---
title: Button React component
components: Button, IconButton, ButtonBase
---

# Form Field

`<ibk-form-field>` is a component used to wrap several Interbank components and apply common
[Text field](https://material.io/guidelines/components/text-fields.html) styles such as the
underline, floating label, and hint messages.

In this document, "form field" refers to the wrapper component `<ibk-form-field>` and
"form field control" refers to the component that the `<ibk-form-field>` is wrapping
(e.g. the input, textarea, select, etc.)

The following Interbank components are designed to work inside a `<ibk-form-field>`:

- [`<input ibkNativeControl>` &amp; `<textarea ibkNativeControl>`](https://material.angular.io/components/input/overview)
- [`<mat-select>`](https://material.angular.io/components/select/overview)

{{"demo": "src/components/form-field/docs/form-field-overview.html"}}

### Hint labels

Hint labels are additional descriptive text that appears below the form field's underline. A
`<ibk-form-field>` can have up to two hint labels; one start-aligned (left in an LTR language, right
in RTL), and one end-aligned.

Hint labels are specified in one of two ways: either by using the `hintLabel` property of
`<ibk-form-field>`, or by adding a `<mat-hint>` element inside the form field. When adding a hint
via the `hintLabel` property, it will be treated as the start hint. Hints added via the
`<mat-hint>` hint element can be added to either side by setting the `align` property on
`<mat-hint>` to either `start` or `end`. Attempting to add multiple hints to the same side will
raise an error.

{{"demo": "src/components/form-field/docs/form-field-hint.html"}}

### Prefix & suffix

Custom content can be included before and after the input tag, as a prefix or suffix. It will be
included within the visual container that wraps the form control as per the Material specification.

Adding the `matPrefix` directive to an element inside the `<ibk-form-field>` will designate it as
the prefix. Similarly, adding `matSuffix` will designate it as the suffix.

{{"demo": "src/components/form-field/docs/form-field-prefix-suffix.html"}}

### State

The state property define the color of the form control border, suffix, preffix and hints

{{"demo": "src/components/form-field/docs/form-field-state.html"}}