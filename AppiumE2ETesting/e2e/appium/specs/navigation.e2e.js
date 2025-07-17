describe('Navigation Flow Test', () => {
  it('should go through all 3 screens and back', async () => {
    // Increment the counter
    const counterText = await $('~counter-text');
    const incrementButton = await $('~increment-button');

    await incrementButton.click();
    await incrementButton.click();
    await incrementButton.click();

    await driver.pause(500);

    // Navigate to second screen
    const goToSecondBtn = await $('~go-to-second');
    await goToSecondBtn.click();

    // Validate received count
    const receivedCount = await $('~second-count');
    expect(await receivedCount.getText()).toContain('3');

    // Scroll flatlist (if needed)
    const flatlist = await $('~flatlist');
    
    await driver.pause(500);

    // Navigate to third screen
    const goToThirdBtn = await $('~go-to-third');
    await goToThirdBtn.click();

    const thirdTitle = await $('~third-title');
    expect(await thirdTitle.getText()).toContain('Third Screen');


    // ✅ Wait for API response text to show
    const apiTitle = await $('~api-title');
    await apiTitle.waitForDisplayed({ timeout: 5000 });
    const apiText = await apiTitle.getText();
    console.log('API Response Title:', apiText);
    expect(apiText.length).toBeGreaterThan(0); // API response should not be empty

    // Go back to second screen
    const backBtn = await $('~go-back');
    await backBtn.click();

    // Back to first screen
    await driver.back(); // Android hardware back
    await driver.pause(500);

    const counterTextAfter = await $('~counter-text');
    expect(await counterTextAfter.getText()).toContain('Count: 3');
  });
});
