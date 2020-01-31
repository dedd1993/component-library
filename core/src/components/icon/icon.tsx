import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ibk-icon',
  styleUrl: 'icon.scss',
  shadow: false
})
export class IbkIcon {

  @Prop({ mutable: false, reflect: true }) name: string;

  render() {
    return (
      <Host
        class={{
          'ibk-icons': true,
          'icon': true
        }}
      >
      </Host>
    );
  }

}
