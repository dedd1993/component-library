import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'ibk-form-field',
  styleUrl: 'form-field.scss',
  shadow: false
})
export class IbkFormField {

  render() {

    return (
      <Host
        class={{
          'form-field': true
        }}
      >
        <div class="label-container">
          <slot name="label" />
        </div>

        <div class="input-container">
          <slot name="input" />
        </div>
      </Host>
    );
  }
}
