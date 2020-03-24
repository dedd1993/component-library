import { Component, Element, h, Host, State, Prop } from '@stencil/core';

@Component({
  tag: 'ibk-form-field',
  styleUrl: 'form-field.scss',
  shadow: false
})
export class IbkFormField {

  @Prop() state: 'informative' | 'success' | 'warning' | 'error';

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
          'form-field-focused': this.isFocused,
          ...this.getFormFieldStatusClass()
        }}
      >
        <slot name="label" />

        <div
          class={{
            'form-control': true,
            'form-control-input': this.isAnInputFormControl,
          }}
        >
          <slot name="prefix" />

          <slot name="input" />

          <slot name="suffix" />
        </div>
      </Host>
    );
  }

  private getFormFieldStatusClass() {
    return this.state ? { [`form-field-${this.state}`]: true } : {};
  }
}
