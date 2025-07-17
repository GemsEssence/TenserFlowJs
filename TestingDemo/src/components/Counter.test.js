import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Counter from './Counter';

describe('Counter Component', () => {
  it('renders initial count', () => {
    const { getByText } = render(<Counter />);
    expect(getByText('Count: 0')).toBeTruthy();
  });

  it('increments count when button is pressed', () => {
    const { getByText, getByTestId } = render(<Counter />);
    fireEvent.press(getByTestId('increment-button'));
    expect(getByText('Count: 1')).toBeTruthy();
  });

  it('decrements count when button is pressed', () => {
    const { getByText, getByTestId } = render(<Counter />);
    fireEvent.press(getByTestId('decrement-button'));
    expect(getByText('Count: -1')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<Counter />);
    expect(toJSON()).toMatchSnapshot();
  });
});