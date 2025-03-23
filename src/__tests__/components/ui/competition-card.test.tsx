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

describe('CompetitionCard', () => {
  const mockCompetition: Competition = {
    id: '1',
    title: 'Test Competition',
    organizer: 'Test Organizer',
    deadline: '2025-04-01T00:00:00.000Z',
    source_url: 'https://example.com',
    source_platform: 'Test Platform',
    prize_pool: 'Rp 10.000.000',
    description: 'This is a test competition description',
    registration_link: 'https://example.com/register',
  };

  it('renders competition details correctly', () => {
    // Mock getDaysUntilDeadline to return 10 days
    (getDaysUntilDeadline as jest.Mock).mockReturnValue(10);

    render(<CompetitionCard competition={mockCompetition} />);

    // Check if the title is rendered
    expect(screen.getByText('Test Competition')).toBeInTheDocument();

    // Check if the organizer is rendered
    expect(screen.getByText('Test Organizer')).toBeInTheDocument();

    // Check if the deadline is rendered
    expect(screen.getByText('Deadline: 22 Maret 2025')).toBeInTheDocument();

    // Check if the days remaining is rendered
    expect(screen.getByText('10 days remaining')).toBeInTheDocument();

    // Check if the prize pool is rendered
    expect(screen.getByText('Prize Pool: Rp 10.000.000')).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText('This is a test competition description')).toBeInTheDocument();

    // Check if the source platform badge is rendered
    expect(screen.getByText('Test Platform')).toBeInTheDocument();

    // Check if the days left badge is rendered
    expect(screen.getByText('10 days left')).toBeInTheDocument();
  });

  it('shows "Expired" when competition deadline has passed', () => {
    // Mock getDaysUntilDeadline to return -5 days (expired)
    (getDaysUntilDeadline as jest.Mock).mockReturnValue(-5);

    render(<CompetitionCard competition={mockCompetition} />);

    // Check if the expired badge is rendered
    expect(screen.getByText('Expired')).toBeInTheDocument();

    // Verify that "days remaining" text is not shown for expired competitions
    expect(screen.queryByText(/days remaining/)).not.toBeInTheDocument();
  });

  it('shows "Last day" when competition deadline is today', () => {
    // Mock getDaysUntilDeadline to return 0 days (today)
    (getDaysUntilDeadline as jest.Mock).mockReturnValue(0);

    render(<CompetitionCard competition={mockCompetition} />);

    // Check if the "Last day" badge is rendered
    expect(screen.getByText('Last day')).toBeInTheDocument();

    // Check if the "Last day to register!" text is shown
    expect(screen.getByText('Last day to register!')).toBeInTheDocument();
  });

  it('shows "1 day left" when competition deadline is tomorrow', () => {
    // Mock getDaysUntilDeadline to return 1 day
    (getDaysUntilDeadline as jest.Mock).mockReturnValue(1);

    render(<CompetitionCard competition={mockCompetition} />);

    // Check if the "1 day left" badge is rendered
    expect(screen.getByText('1 day left')).toBeInTheDocument();

    // Check if the "Only 1 day left!" text is shown
    expect(screen.getByText('Only 1 day left!')).toBeInTheDocument();
  });
});
