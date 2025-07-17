import CounterPage from '../pageObjects/counter.page.js';

describe('Counter Component Test', () => {
  it('should interact with counter', async () => {
    // const counterText = await $('~counter-text');
    // const incrementButton = await $('~increment-button');

    const counterText = await CounterPage.counterText;

    // Get initial value
    const initialText = await counterText.getText();
    console.log('Initial:', initialText); // "Count: 0"

    // Tap increment button
    for (let i = 0; i < 20; i++) {
      await CounterPage.increment();
    }

    await CounterPage.decrement();

    // Small wait to allow React state to update
    await driver.pause(1000);

    const updatedText = await counterText.getText();
    console.log('Updated:', updatedText); // Should be "Count: 1"

    expect(updatedText).toContain('Count: 19');
  });
});
