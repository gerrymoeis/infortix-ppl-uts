import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LombaPage from '@/app/lomba/page';

// Mock the API module
jest.mock('@/lib/api', () => ({
  getCompetitions: jest.fn(),
}));

// Import the mocked API
import { getCompetitions } from '@/lib/api';

describe('LombaPage Component - Failing Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.clear(); // Clear console before each test
  });

  /**
   * FAILING TEST #1: API Returns Error
   * 
   * Expected Behavior: Component should handle API errors gracefully
   * Actual Behavior: Component fails when API returns an error
   * Error Type: Unhandled Promise Rejection
   */
  test('FAILING TEST #1: API Returns Error', async () => {
    console.log('\n==== FAILING TEST #1: API Returns Error ====');
    console.log('Expected: Component handles API error gracefully');
    console.log('Actual: Component fails when API returns an error');
    console.log('Error Type: Unhandled Promise Rejection');
    
    // Mock the API to return an error
    (getCompetitions as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    // Suppress console errors for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    render(<LombaPage />);
    
    // This will fail because the component doesn't handle API errors properly
    await waitFor(() => {
      expect(screen.getByText('Test Competition')).toBeInTheDocument();
    });
    
    // Restore console.error
    console.error = originalError;
  });

  /**
   * FAILING TEST #2: Incorrect Loading State Handling
   * 
   * Expected Behavior: Component should show a loading indicator while fetching data
   * Actual Behavior: Component doesn't have the expected loading indicator
   * Error Type: Missing DOM Element
   */
  test('FAILING TEST #2: Incorrect Loading State Handling', async () => {
    console.log('\n==== FAILING TEST #2: Incorrect Loading State Handling ====');
    console.log('Expected: Component shows loading indicator with test ID "loading-spinner"');
    console.log('Actual: Component does not have this specific loading indicator');
    console.log('Error Type: Missing DOM Element');
    
    // Mock the API to return a delayed response
    (getCompetitions as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve([]), 1000))
    );
    
    render(<LombaPage />);
    
    // This will fail if the component doesn't have this specific loading indicator
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  /**
   * FAILING TEST #3: Incorrect Data Structure Assumption
   * 
   * Expected Behavior: Component should handle data in the expected format
   * Actual Behavior: Component fails when data is in an unexpected format
   * Error Type: Type Error / Rendering Error
   */
  test('FAILING TEST #3: Incorrect Data Structure Assumption', async () => {
    console.log('\n==== FAILING TEST #3: Incorrect Data Structure Assumption ====');
    console.log('Expected: Component handles data with correct structure');
    console.log('Actual: Component fails with incorrectly structured data');
    console.log('Error Type: Type Error / Rendering Error');
    
    // Mock the API to return data in an incorrect format
    (getCompetitions as jest.Mock).mockResolvedValue([
      {
        // Missing required fields like 'id', 'deadline', etc.
        name: 'Test Competition', // Using 'name' instead of 'title'
        organization: 'Test Organizer', // Using 'organization' instead of 'organizer'
      }
    ]);
    
    // Suppress console errors for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    render(<LombaPage />);
    
    // This will fail because the data structure is incorrect
    await waitFor(() => {
      expect(screen.getByText('Test Competition')).toBeInTheDocument();
    });
    
    // Restore console.error
    console.error = originalError;
  });
});
