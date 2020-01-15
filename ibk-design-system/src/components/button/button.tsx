import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'ibk-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class IbkButton {

  @Prop({ reflectToAttr: true }) disabled = false;

  render() {
    const { disabled } = this;

    return (
      <Host
        class={{
          'button-disabled': disabled,
        }}
      >
        <button
          class="button-native"
          disabled={disabled}
        >
          <slot></slot>
        </button>
      </Host>
    );
  }
}
