import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavbarAlt } from '@/components/layout/navbar-alt';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

// Mock the next-themes hook
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

// Mock the next/navigation hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, className, 'data-testid': testId }: { children: React.ReactNode; href: string; className?: string; 'data-testid'?: string }) {
    return (
      <a href={href} className={className} data-testid={testId}>
        {children}
      </a>
    );
  };
});

describe('NavbarAlt Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
    });
    
    (usePathname as jest.Mock).mockReturnValue('/beranda');
  });

  // Core functionality tests
  describe('Core Functionality', () => {
    it('renders the navigation bar with correct brand and links', () => {
      render(<NavbarAlt />);
      
      // Check brand name
      expect(screen.getByText('Infortix')).toBeInTheDocument();
      expect(screen.getByText('Portal Kompetisi')).toBeInTheDocument();
      
      // Check navigation links
      expect(screen.getByText('Beranda')).toBeInTheDocument();
      expect(screen.getByText('Kompetisi')).toBeInTheDocument();
    });

    it('applies active styling to the current route', () => {
      // Set active route to Beranda
      (usePathname as jest.Mock).mockReturnValue('/beranda');
      
      const { unmount } = render(<NavbarAlt />);
      
      // Get all links
      const berandaLink = screen.getByText('Beranda');
      const kompetisiLink = screen.getByText('Kompetisi');
      
      // Check styling
      expect(berandaLink.className).toContain('text-primary');
      expect(kompetisiLink.className).toContain('text-muted-foreground');
      
      // Clean up
      unmount();
      
      // Change active route to Kompetisi
      (usePathname as jest.Mock).mockReturnValue('/kompetisi');
      
      render(<NavbarAlt />);
      
      // Get links again
      const newBerandaLink = screen.getByText('Beranda');
      const newKompetisiLink = screen.getByText('Kompetisi');
      
      // Check styling
      expect(newBerandaLink.className).toContain('text-muted-foreground');
      expect(newKompetisiLink.className).toContain('text-primary');
    });

    it('toggles theme when theme button is clicked', () => {
      const mockSetTheme = jest.fn();
      (useTheme as jest.Mock).mockReturnValue({
        theme: 'light',
        setTheme: mockSetTheme,
      });
      
      render(<NavbarAlt />);
      
      // Find and click the theme toggle button
      const themeButton = screen.getByRole('button', { name: /ganti tema/i });
      fireEvent.click(themeButton);
      
      // Check if setTheme was called with 'dark'
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
  });

  // UI and styling tests
  describe('UI and Styling', () => {
    it('has the correct brand styling', () => {
      render(<NavbarAlt />);
      const brandName = screen.getByText('Infortix');
      expect(brandName).toHaveClass('bg-gradient-to-r');
      expect(brandName).toHaveClass('text-transparent');
    });

    it('has sticky header with backdrop blur', () => {
      render(<NavbarAlt />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky');
      expect(header).toHaveClass('backdrop-blur');
    });
  });
});
