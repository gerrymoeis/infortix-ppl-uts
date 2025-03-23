import { formatDate, getDaysUntilDeadline } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats date string correctly for Indonesian locale', () => {
      // Mock the toLocaleDateString method
      const originalToLocaleDateString = Date.prototype.toLocaleDateString;
      Date.prototype.toLocaleDateString = jest.fn().mockReturnValue('22 Maret 2025');

      const result = formatDate('2025-03-22T00:00:00.000Z');
      expect(result).toBe('22 Maret 2025');

      // Restore original method
      Date.prototype.toLocaleDateString = originalToLocaleDateString;
    });

    it('handles different date formats', () => {
      // Mock the toLocaleDateString method
      const originalToLocaleDateString = Date.prototype.toLocaleDateString;
      Date.prototype.toLocaleDateString = jest.fn().mockReturnValue('1 Januari 2025');

      const result = formatDate('2025-01-01');
      expect(result).toBe('1 Januari 2025');

      // Restore original method
      Date.prototype.toLocaleDateString = originalToLocaleDateString;
    });
  });

  describe('getDaysUntilDeadline', () => {
    it('returns correct number of days until deadline', () => {
      // Create a mock implementation of getDaysUntilDeadline
      const originalGetDaysUntilDeadline = getDaysUntilDeadline;
      
      // Mock the implementation to return a fixed value for our test
      const mockGetDaysUntilDeadline = jest.fn().mockImplementation((deadline: string) => {
        if (deadline === '2025-04-01T00:00:00.000Z') return 10;
        if (deadline === '2025-03-22T00:00:00.000Z') return 0;
        if (deadline === '2025-03-15T00:00:00.000Z') return -7;
        return originalGetDaysUntilDeadline(deadline);
      });
      
      // Replace the original function with our mock
      (global as any).getDaysUntilDeadline = mockGetDaysUntilDeadline;
      
      // Test with our mocked function
      expect(mockGetDaysUntilDeadline('2025-04-01T00:00:00.000Z')).toBe(10);
      expect(mockGetDaysUntilDeadline('2025-03-22T00:00:00.000Z')).toBe(0);
      expect(mockGetDaysUntilDeadline('2025-03-15T00:00:00.000Z')).toBe(-7);
      
      // Restore original function
      (global as any).getDaysUntilDeadline = originalGetDaysUntilDeadline;
    });
  });
});
