import { Component, h, Host, Prop, Element } from '@stencil/core';
import { hasShadowDom } from '../../utils/helpers';

@Component({
  tag: 'ibk-button',
  styleUrl: 'button.scss',
  shadow: false
})
export class IbkButton {
  @Element() el!: HTMLElement;
  @Prop() type: 'submit' | 'reset' | 'button' = 'button';
  @Prop({ reflectToAttr: true }) disabled = false;

  private handleClick = (ev: Event) => {
    if (hasShadowDom(this.el)) {
      // this button wants to specifically submit a form
      // climb up the dom to see if we're in a <form>
      // and if so, then use JS to submit it
      const form = this.el.closest('form');
      if (form) {
        ev.preventDefault();

        const fakeButton = document.createElement('button');
        fakeButton.type = this.type;
        fakeButton.style.display = 'none';
        form.appendChild(fakeButton);
        fakeButton.click();
        fakeButton.remove();
      }
    }
  }

  render() {
    const { disabled } = this;

    return (
      <Host
        onClick={this.handleClick}
        class={{
          'button-disabled': disabled,
        }}
      >
        <button
          class="button-native"
          type={this.type}
          disabled={disabled}
        >
          <slot></slot>
        </button>
      </Host>
    );
  }
}
