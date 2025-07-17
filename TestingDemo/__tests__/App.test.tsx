/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});


/**
 * @format
 */
// import React from 'react';
// import ReactTestRenderer from 'react-test-renderer';
// import App from '../App';

// // Import the math utils
// import * as math from '../src/utils/math';

// jest.mock('../src/components/Counter', () => {
//   return () => <></>; // mock the Counter component to isolate App
// });

// describe('App Component', () => {
//   beforeEach(() => {
//     jest.spyOn(console, 'log').mockImplementation(() => {}); // suppress logs
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   it('renders correctly and triggers useEffect math calculations', async () => {
//     // Spies on math utility functions
//     const addSpy = jest.spyOn(math, 'add');
//     const subSpy = jest.spyOn(math, 'subtract');
//     const mulSpy = jest.spyOn(math, 'multiply');
//     const logSpy = jest.spyOn(console, 'log');

//     await ReactTestRenderer.act(() => {
//       ReactTestRenderer.create(<App />);
//     });

//     expect(addSpy).toHaveBeenCalledWith(10, 20);
//     expect(subSpy).toHaveBeenCalledWith(10, 20);
//     expect(mulSpy).toHaveBeenCalledWith(10, 20);

//     expect(logSpy).toHaveBeenCalledWith('useEffect-->>>', 30, -10, 200);
//   });
// });

