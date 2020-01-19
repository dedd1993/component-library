import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'ibk-select',
  styleUrl: 'select.scss',
  shadow: false
})
export class IbkSelect {

  render() {

    return (
      <Host
        class={{
          'select': true
        }}
      >
        <h1>jajaj</h1>
      </Host>
    );
  }
}
