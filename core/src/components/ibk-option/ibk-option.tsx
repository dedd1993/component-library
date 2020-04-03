import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'ibk-option',
  styleUrl: 'ibk-option.scss',
  shadow: false,
  scoped: true,
})
export class IbkOption {
  @Prop({ mutable: true, reflect: true }) public value: any;
  @Prop({ mutable: false, reflect: true }) public disabled = false;
  @Prop({ mutable: false, reflect: true }) public selected = false;
  @Element() private element: HTMLElement;
  private ibkSelectElement: any;

  public componentWillLoad() {
    this.ibkSelectElement = this.element.parentNode;
  }

  public render() {
    return (
      <Host onClick={(e) => !this.disabled && this.onClickAtOption(e)}>
        <slot />
      </Host>
    );
  }

  private onClickAtOption(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled === false) {
      this.ibkSelectElement.optionSelected(this.value);
    }
  }

}
