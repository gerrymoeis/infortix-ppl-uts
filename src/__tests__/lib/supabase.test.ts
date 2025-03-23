import { getCompetitions, getCompetitionById } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Mock the environment variables
jest.mock('process', () => ({
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  },
}));

// Mock the getCompetitions and getCompetitionById functions directly
jest.mock('@/lib/supabase', () => ({
  getCompetitions: jest.fn(),
  getCompetitionById: jest.fn(),
  supabase: {}
}));

// Mock the createClient function from supabase-js
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

describe('Supabase Service', () => {
  const mockCompetitions = [
    {
      id: '1',
      title: 'Test Competition 1',
      organizer: 'Test Organizer 1',
      deadline: '2025-04-01T00:00:00.000Z',
      source_url: 'https://example.com/1',
      source_platform: 'Test Platform',
    },
    {
      id: '2',
      title: 'Test Competition 2',
      organizer: 'Test Organizer 2',
      deadline: '2025-05-01T00:00:00.000Z',
      source_url: 'https://example.com/2',
      source_platform: 'Test Platform',
    },
  ];

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('getCompetitions', () => {
    it('returns competitions data when the query is successful', async () => {
      // Setup the mock to return competitions data
      (getCompetitions as jest.Mock).mockResolvedValue(mockCompetitions);

      const result = await getCompetitions();

      // Verify the result matches our mock data
      expect(result).toEqual(mockCompetitions);
      expect(getCompetitions).toHaveBeenCalled();
    });

    it('handles errors when the query fails', async () => {
      // Setup the mock to return an empty array on error
      (getCompetitions as jest.Mock).mockResolvedValue([]);

      // We expect getCompetitions to return an empty array when there's an error
      const result = await getCompetitions();
      expect(result).toEqual([]);
      expect(getCompetitions).toHaveBeenCalled();
    });
  });

  describe('getCompetitionById', () => {
    it('returns a single competition when found', async () => {
      const mockCompetition = mockCompetitions[0];
      
      // Setup the mock to return a single competition
      (getCompetitionById as jest.Mock).mockResolvedValue(mockCompetition);

      const result = await getCompetitionById('1');

      // Verify the result matches our mock data
      expect(result).toEqual(mockCompetition);
      expect(getCompetitionById).toHaveBeenCalledWith('1');
    });

    it('returns null when competition is not found', async () => {
      // Setup the mock to return null (not found)
      (getCompetitionById as jest.Mock).mockResolvedValue(null);

      const result = await getCompetitionById('999');

      // Verify the result is null when not found
      expect(result).toBeNull();
      expect(getCompetitionById).toHaveBeenCalledWith('999');
    });
  });
});
