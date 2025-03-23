import React from 'react';
import { render, screen } from '@testing-library/react';
import { CompetitionCard } from '@/components/ui/competition-card';
import { Competition } from '@/types/competition';

// Mock the formatDate and getDaysUntilDeadline functions
jest.mock('@/lib/utils', () => ({
  formatDate: jest.fn().mockReturnValue('22 Maret 2025'),
  getDaysUntilDeadline: jest.fn(),
  cn: jest.fn((...inputs) => inputs.join(' ')),
}));

// Import the mocked functions
import { getDaysUntilDeadline } from '@/lib/utils';

describe('CompetitionCard Component - Failing Tests', () => {
  // Test setup: Create a standard competition object for testing
  const standardCompetition: Competition = {
    id: '1',
    title: 'Test Competition',
    organizer: 'Test Organizer',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    source_url: 'https://example.com',
    source_platform: 'Test Platform',
    prize_pool: 'Rp 10.000.000',
    description: 'This is a test competition description',
    registration_link: 'https://example.com/register',
  };

  /**
   * FAILING TEST #1: Incorrect Text Expectation
   * 
   * Expected Behavior: The component should display "10 days remaining"
   * Actual Behavior: We're looking for "10 days left" which doesn't exist
   * Error Type: Text Content Mismatch
   */
  test('FAILING TEST #1: Incorrect Text Expectation', () => {
    console.log('\n==== FAILING TEST #1: Incorrect Text Expectation ====');
    console.log('Expected: Component displays "10 days left"');
    console.log('Actual: Component displays "10 days remaining"');
    
    // Mock getDaysUntilDeadline to return 10 days
    (getDaysUntilDeadline as jest.Mock).mockReturnValue(10);

    render(<CompetitionCard competition={standardCompetition} />);
    
    // This will fail because the component shows "10 days remaining" not "10 days left"
    expect(screen.getByText(/10 days left/i)).toBeInTheDocument();
  });

  /**
   * FAILING TEST #2: Missing Required Prop
   * 
   * Expected Behavior: The component requires a competition prop
   * Actual Behavior: We're not providing the required prop
   * Error Type: Missing Required Prop
   */
  test('FAILING TEST #2: Missing Required Prop', () => {
    console.log('\n==== FAILING TEST #2: Missing Required Prop ====');
    console.log('Expected: Component receives required "competition" prop');
    console.log('Actual: Component rendered without required prop');
    
    // @ts-ignore - Intentionally ignoring TypeScript error for test purposes
    // This will fail because the competition prop is required
    render(<CompetitionCard />);
    
    expect(screen.getByTestId('competition-card')).toBeInTheDocument();
  });

  /**
   * FAILING TEST #3: Incorrect DOM Structure Assumption
   * 
   * Expected Behavior: The component has elements with specific test IDs
   * Actual Behavior: These test IDs don't exist in the component
   * Error Type: DOM Structure Mismatch
   */
  test('FAILING TEST #3: Incorrect DOM Structure Assumption', () => {
    console.log('\n==== FAILING TEST #3: Incorrect DOM Structure Assumption ====');
    console.log('Expected: Component has elements with test IDs "competition-title", "competition-organizer", etc.');
    console.log('Actual: Component does not use these test IDs');
    
    // Mock getDaysUntilDeadline to return 10 days
    (getDaysUntilDeadline as jest.Mock).mockReturnValue(10);

    render(<CompetitionCard competition={standardCompetition} />);
    
    // This will fail because these test IDs don't exist in the component
    expect(screen.getByTestId('competition-title')).toBeInTheDocument();
    expect(screen.getByTestId('competition-organizer')).toBeInTheDocument();
    expect(screen.getByTestId('competition-deadline')).toBeInTheDocument();
  });
});
