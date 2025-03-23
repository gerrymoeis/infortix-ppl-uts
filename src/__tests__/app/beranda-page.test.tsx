import React from 'react';
import { render, screen } from '@testing-library/react';
import BerandaPage from '@/app/beranda/page';

// Mock the NavbarAlt component
jest.mock('@/components/layout/navbar-alt', () => ({
  NavbarAlt: () => <div data-testid="navbar-alt">Navbar Alt Mock</div>,
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return (
      <a href={href} data-testid={`link-to-${href}`}>
        {children}
      </a>
    );
  };
});

describe('BerandaPage', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Core content tests
  describe('Core Content', () => {
    it('renders the main components and content', () => {
      render(<BerandaPage />);
      
      // Check for navbar
      expect(screen.getByTestId('navbar-alt')).toBeInTheDocument();
      
      // Check for main heading
      expect(screen.getByText('Wujudkan')).toBeInTheDocument();
      expect(screen.getByText('Potensi Kompetitifmu')).toBeInTheDocument();
      
      // Check for statistics
      expect(screen.getByText('500+')).toBeInTheDocument();
      expect(screen.getByText('50+')).toBeInTheDocument();
      expect(screen.getByText('10K+')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  // Navigation and links
  describe('Navigation and Links', () => {
    it('has working links to the kompetisi page', () => {
      render(<BerandaPage />);
      
      // Get the first CTA button by text
      const firstCta = screen.getByText('Jelajahi Kompetisi').closest('a');
      expect(firstCta).toHaveAttribute('href', '/kompetisi');
      
      // Get the second CTA button by text
      const secondCta = screen.getByText('Mulai Sekarang').closest('a');
      expect(secondCta).toHaveAttribute('href', '/kompetisi');
    });
  });

  // Visual elements
  describe('Visual Elements', () => {
    it('has the expected visual elements', () => {
      render(<BerandaPage />);
      
      // Check for gradient text in heading
      const gradientText = screen.getByText('Potensi Kompetitifmu');
      expect(gradientText).toHaveClass('bg-gradient-to-r');
      expect(gradientText).toHaveClass('text-transparent');
      
      // Check for feature cards
      const featureCards = document.querySelectorAll('.bg-muted\\/50.rounded-xl');
      expect(featureCards.length).toBeGreaterThan(0);
    });
  });
});
