import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CompetitionPage from '@/app/lomba/page';
import { getCompetitions } from '@/lib/supabase';
import { Competition } from '@/types/competition';

// Mock the supabase module
jest.mock('@/lib/supabase', () => ({
  getCompetitions: jest.fn(),
}));

// Mock the competition card component
jest.mock('@/components/ui/competition-card', () => ({
  CompetitionCard: ({ competition }: { competition: Competition }) => (
    <div data-testid={`competition-card-${competition.id}`}>
      {competition.title}
    </div>
  ),
}));

// Mock the competition skeleton component
jest.mock('@/components/ui/competition-skeleton', () => ({
  CompetitionSkeleton: () => <div data-testid="competition-skeleton">Loading...</div>,
}));

// Mock the filter dialog component
jest.mock('@/components/ui/filter-dialog', () => ({
  FilterDialog: ({ filter, onFilterChange }: any) => (
    <button 
      data-testid="filter-button"
      onClick={() => onFilterChange({ source_platform: 'Test Platform' })}
    >
      Filter
    </button>
  ),
}));

// Mock the background elements component
jest.mock('@/components/ui/background-elements', () => ({
  BackgroundElements: () => <div data-testid="background-elements"></div>,
}));

describe('CompetitionPage', () => {
  const mockCompetitions: Competition[] = [
    {
      id: '1',
      title: 'Test Competition 1',
      organizer: 'Test Organizer 1',
      deadline: '2025-04-01T00:00:00.000Z',
      source_url: 'https://example.com/1',
      source_platform: 'Test Platform 1',
      description: 'Test description 1',
    },
    {
      id: '2',
      title: 'Test Competition 2',
      organizer: 'Test Organizer 2',
      deadline: '2025-05-01T00:00:00.000Z',
      source_url: 'https://example.com/2',
      source_platform: 'Test Platform 2',
      description: 'Test description 2',
    },
    {
      id: '3',
      title: 'Another Competition',
      organizer: 'Another Organizer',
      deadline: '2025-06-01T00:00:00.000Z',
      source_url: 'https://example.com/3',
      source_platform: 'Test Platform 1',
      description: 'Another description',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.log and console.error to prevent test output noise
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('shows loading skeletons while fetching competitions', () => {
    // Mock getCompetitions to return a promise that doesn't resolve immediately
    (getCompetitions as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<CompetitionPage />);

    // Check if loading skeletons are displayed
    expect(screen.getAllByTestId('competition-skeleton')).toHaveLength(9); // ITEMS_PER_PAGE = 9
  });

  it('displays competitions after loading', async () => {
    // Mock getCompetitions to return our mock data
    (getCompetitions as jest.Mock).mockResolvedValue(mockCompetitions);

    render(<CompetitionPage />);

    // Wait for the competitions to load
    await waitFor(() => {
      expect(screen.getByTestId('competition-card-1')).toBeInTheDocument();
    });

    // Check if all competitions are displayed
    expect(screen.getByTestId('competition-card-1')).toHaveTextContent('Test Competition 1');
    expect(screen.getByTestId('competition-card-2')).toHaveTextContent('Test Competition 2');
    expect(screen.getByTestId('competition-card-3')).toHaveTextContent('Another Competition');
  });

  it('filters competitions based on search query', async () => {
    // Mock getCompetitions to return our mock data
    (getCompetitions as jest.Mock).mockResolvedValue(mockCompetitions);

    render(<CompetitionPage />);

    // Wait for the competitions to load
    await waitFor(() => {
      expect(screen.getByTestId('competition-card-1')).toBeInTheDocument();
    });

    // Type in the search box
    const searchInput = screen.getByPlaceholderText(/Cari lomba/i);
    fireEvent.change(searchInput, { target: { value: 'Another' } });

    // Check if only the matching competition is displayed
    await waitFor(() => {
      expect(screen.queryByTestId('competition-card-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('competition-card-2')).not.toBeInTheDocument();
      expect(screen.getByTestId('competition-card-3')).toBeInTheDocument();
    });
  });

  it('applies filters when filter button is clicked', async () => {
    // Mock getCompetitions to return our mock data
    (getCompetitions as jest.Mock).mockResolvedValue(mockCompetitions);

    render(<CompetitionPage />);

    // Wait for the competitions to load
    await waitFor(() => {
      expect(screen.getByTestId('competition-card-1')).toBeInTheDocument();
    });

    // Click the filter button
    const filterButton = screen.getByTestId('filter-button');
    fireEvent.click(filterButton);

    // Check if only competitions from 'Test Platform' are displayed
    await waitFor(() => {
      // Our mock filter dialog sets source_platform to 'Test Platform'
      // Since none of our mock competitions have exactly 'Test Platform' as source_platform,
      // we should see the "no competitions found" message
      expect(screen.getByText('Tidak ada lomba yang ditemukan')).toBeInTheDocument();
    });
  });
});
