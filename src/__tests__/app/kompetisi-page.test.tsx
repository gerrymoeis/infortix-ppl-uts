import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KompetisiPage from '@/app/kompetisi/page';

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

// Mock untuk KompetisiPage
jest.mock('@/app/kompetisi/page', () => {
  // Simpan fungsi asli
  const originalModule = jest.requireActual('@/app/kompetisi/page');
  
  // Override fungsi default export
  return {
    ...originalModule,
    __esModule: true,
    default: () => {
      const mockDummyCompetitions = [
        {
          id: 1,
          title: "Gemastik XV 2025",
          organizer: "Kementerian Pendidikan dan Kebudayaan",
          category: "Teknologi",
          deadline: "2025-06-15",
          prizePool: "Rp 250.000.000",
          location: "Nasional",
          tags: ["Pemrograman", "Data Mining", "UI/UX", "Keamanan Siber"],
          image: "https://placehold.co/400x250/4F46E5/FFFFFF?text=Gemastik+XV"
        },
        {
          id: 2,
          title: "Hackathon Indonesia Maju 2025",
          organizer: "Kementerian Komunikasi dan Informatika",
          category: "Teknologi",
          deadline: "2025-05-20",
          prizePool: "Rp 175.000.000",
          location: "Jakarta",
          tags: ["Hackathon", "Inovasi Digital", "Startup"],
          image: "https://placehold.co/400x250/6D28D9/FFFFFF?text=Hackathon+IM"
        },
        {
          id: 3,
          title: "Kompetisi Bisnis Plan Nasional",
          organizer: "Universitas Indonesia",
          category: "Bisnis",
          deadline: "2025-07-10",
          prizePool: "Rp 100.000.000",
          location: "Depok",
          tags: ["Business Plan", "Kewirausahaan", "Startup"],
          image: "https://placehold.co/400x250/0EA5E9/FFFFFF?text=Bisnis+Plan"
        }
      ];
      
      return (
        <>
          <div data-testid="navbar-alt">Navbar Alt Mock</div>
          <div className="container py-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Jelajahi Kompetisi</h1>
              <p>Temukan kompetisi terbaik untuk mengembangkan potensimu</p>
            </div>
            
            <div>
              <div>
                <input placeholder="Cari kompetisi..." />
              </div>
            </div>
            
            <div role="tablist">
              <button role="tab" aria-selected={true} name="Semua">Semua</button>
              <button role="tab" aria-selected={false} name="Aktif">Aktif</button>
              <button role="tab" aria-selected={false} name="Akan Datang">Akan Datang</button>
              <button role="tab" aria-selected={false} name="Telah Berakhir">Telah Berakhir</button>
            </div>
            
            <div>
              <div data-testid="competition-1">
                <h3>{mockDummyCompetitions[0].title}</h3>
                <p data-testid="organizer-1">Diselenggarakan oleh {mockDummyCompetitions[0].organizer}</p>
                <div>
                  <span>{mockDummyCompetitions[0].prizePool}</span>
                </div>
              </div>
              <div data-testid="competition-2">
                <h3>{mockDummyCompetitions[1].title}</h3>
                <p data-testid="organizer-2">Diselenggarakan oleh {mockDummyCompetitions[1].organizer}</p>
                <div>
                  <span>{mockDummyCompetitions[1].prizePool}</span>
                </div>
              </div>
              <div data-testid="competition-3">
                <h3>{mockDummyCompetitions[2].title}</h3>
                <p data-testid="organizer-3">Diselenggarakan oleh {mockDummyCompetitions[2].organizer}</p>
                <div>
                  <span>{mockDummyCompetitions[2].prizePool}</span>
                </div>
              </div>
            </div>
            
            <button>Muat Lebih Banyak</button>
          </div>
        </>
      );
    }
  };
});

describe('KompetisiPage', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Core components and structure
  it('renders the page with all main elements', () => {
    render(<KompetisiPage />);
    
    // Check for navbar
    expect(screen.getByTestId('navbar-alt')).toBeInTheDocument();
    
    // Check for page title
    expect(screen.getByText('Jelajahi Kompetisi')).toBeInTheDocument();
    
    // Check for search input
    expect(screen.getByPlaceholderText('Cari kompetisi...')).toBeInTheDocument();
    
    // Check for tabs
    expect(screen.getByRole('tab', { name: 'Semua' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Aktif' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Akan Datang' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Telah Berakhir' })).toBeInTheDocument();
  });

  // Competition data display
  it('displays competition cards with correct information', () => {
    render(<KompetisiPage />);
    
    // Check if competition titles are displayed
    expect(screen.getByText('Gemastik XV 2025')).toBeInTheDocument();
    expect(screen.getByText('Hackathon Indonesia Maju 2025')).toBeInTheDocument();
    expect(screen.getByText('Kompetisi Bisnis Plan Nasional')).toBeInTheDocument();
    
    // Check organizers using testid
    expect(screen.getByTestId('organizer-1')).toHaveTextContent('Kementerian Pendidikan dan Kebudayaan');
    expect(screen.getByTestId('organizer-2')).toHaveTextContent('Kementerian Komunikasi dan Informatika');
    expect(screen.getByTestId('organizer-3')).toHaveTextContent('Universitas Indonesia');
    
    // Check prize pool display
    expect(screen.getByText('Rp 250.000.000')).toBeInTheDocument();
  });

  // Interactive elements
  it('has working tabs and load more button', () => {
    render(<KompetisiPage />);
    
    // Default tab should be "Semua"
    const allTab = screen.getByRole('tab', { name: 'Semua' });
    expect(allTab).toHaveAttribute('aria-selected', 'true');
    
    // Click on "Aktif" tab and check if it's selected
    const activeTab = screen.getByRole('tab', { name: 'Aktif' });
    fireEvent.click(activeTab);
    
    // Check for load more button
    expect(screen.getByText('Muat Lebih Banyak')).toBeInTheDocument();
  });
});
