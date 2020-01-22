/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface IbkButton {
    'disabled': boolean;
    'type': 'submit' | 'reset' | 'button';
  }
  interface IbkFormField {}
  interface IbkSelect {
    'disabled': boolean;
    'value': any;
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
}

declare global {


  interface HTMLIbkButtonElement extends Components.IbkButton, HTMLStencilElement {}
  var HTMLIbkButtonElement: {
    prototype: HTMLIbkButtonElement;
    new (): HTMLIbkButtonElement;
  };

  interface HTMLIbkFormFieldElement extends Components.IbkFormField, HTMLStencilElement {}
  var HTMLIbkFormFieldElement: {
    prototype: HTMLIbkFormFieldElement;
    new (): HTMLIbkFormFieldElement;
  };

  interface HTMLIbkSelectElement extends Components.IbkSelect, HTMLStencilElement {}
  var HTMLIbkSelectElement: {
    prototype: HTMLIbkSelectElement;
    new (): HTMLIbkSelectElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };
  interface HTMLElementTagNameMap {
    'ibk-button': HTMLIbkButtonElement;
    'ibk-form-field': HTMLIbkFormFieldElement;
    'ibk-select': HTMLIbkSelectElement;
    'my-component': HTMLMyComponentElement;
  }
}

declare namespace LocalJSX {
  interface IbkButton {
    'disabled'?: boolean;
    'type'?: 'submit' | 'reset' | 'button';
  }
  interface IbkFormField {}
  interface IbkSelect {
    'disabled'?: boolean;
    'onSelectionChange'?: (event: CustomEvent<any>) => void;
    'value'?: any;
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }

  interface IntrinsicElements {
    'ibk-button': IbkButton;
    'ibk-form-field': IbkFormField;
    'ibk-select': IbkSelect;
    'my-component': MyComponent;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'ibk-button': LocalJSX.IbkButton & JSXBase.HTMLAttributes<HTMLIbkButtonElement>;
      'ibk-form-field': LocalJSX.IbkFormField & JSXBase.HTMLAttributes<HTMLIbkFormFieldElement>;
      'ibk-select': LocalJSX.IbkSelect & JSXBase.HTMLAttributes<HTMLIbkSelectElement>;
      'my-component': LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
    }
  }
}


