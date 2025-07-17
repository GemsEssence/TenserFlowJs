class CounterPage {
  get counterText() {
    return $('~counter-text');
  }

  get incrementButton() {
    return $('~increment-button');
  }

  get decrementButton() {
    return $('~decrement-button');
  }

  async increment() {
    await this.incrementButton.click();
  }

  async decrement() {
    await this.decrementButton.click();
  }
}

export default new CounterPage();
