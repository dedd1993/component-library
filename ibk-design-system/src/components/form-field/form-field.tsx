import { Component, Element, h, Host, State } from '@stencil/core';

@Component({
  tag: 'ibk-form-field',
  styleUrl: 'form-field.scss',
  shadow: false
})
export class IbkFormField {
  @State() isAnInputFormControl: boolean;

  @State() isFocused = false;

  @Element() private element: HTMLElement;

  componentDidLoad() {
    const formControl = this.element.querySelector('[slot="input"]');
    formControl.addEventListener('focusin', () => this.isFocused = true );
    formControl.addEventListener('focusout', () => this.isFocused = false );

    this.isAnInputFormControl = (formControl.tagName === 'INPUT') ;
  }

  render() {

    return (
      <Host
        class={{
          'form-field': true,
          'form-field-focused': this.isFocused
        }}
      >
        <slot name="label" />

        <div class={{ 'input-container': true, 'form-control-input': this.isAnInputFormControl }}>
          <slot name="prefix" />

          <slot name="input" />

          <slot name="suffix" />
        </div>
      </Host>
    );
  }
}
