import React from 'react';
import axios from 'axios';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import ThirdScreen from './ThirdScreen';

jest.mock('axios');

describe('ThirdScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display API data after fetch', async () => {
    axios.get.mockResolvedValueOnce({
      data: { title: 'Test API Title' },
    });

    let getByA11yLabel;

    await act(async () => {
      ({ getByA11yLabel } = render(
        <ThirdScreen navigation={{ goBack: jest.fn() }} />
      ));
    });

    const titleNode = await waitFor(() =>
      getByA11yLabel('api-title')
    );

    expect(titleNode).toBeTruthy();
    expect(titleNode.props.children).toBe('Test API Title');
  });

  it('should call navigation.goBack when "Go Back" is pressed', () => {
    const mockGoBack = jest.fn();

    const { getByA11yLabel } = render(
      <ThirdScreen navigation={{ goBack: mockGoBack }} />
    );

    const goBackButton = getByA11yLabel('go-back');
    fireEvent.press(goBackButton);

    expect(mockGoBack).toHaveBeenCalled();
  });
});
