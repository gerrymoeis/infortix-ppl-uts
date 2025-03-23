# App Blueprint Context File

## 1. Project Breakdown

### App Name
**IndoCompScraper - National Student Competition Aggregator**

### Platform
**Web**

### App Summary
IndoCompScraper is a web-based application designed to aggregate and organize student competitions in Indonesia, with a focus on national events and secondary attention on international competitions. The app utilizes advanced web scraping techniques to gather data from official university partners and government-recognized platforms. It features a robust filtering system to prioritize competitions relevant to Indonesian students, including auto-translation for international events and a deadline alert system. The app aims to streamline the process of finding and participating in competitions, making it easier for students to engage in academic, vocational, and creative challenges.

### Primary Use Case
The core function of IndoCompScraper is to serve as a **competition aggregator and notification system** for students, helping them discover and track relevant competitions efficiently.

### Authentication Requirements
- **User Accounts:** Yes, to save preferences and receive personalized notifications.
- **Guest Users:** Yes, for browsing competitions without saving preferences.
- **Social Login Options:** Google, Apple, and Facebook.
- **User Roles:** 
  - **Admin:** Manages data sources and app settings.
  - **General Users:** Browse and track competitions.

### Tech Stack Overview
| Category       | Web (Next.js)                                  |
|---------------|------------------------------------------------|
| **Frontend**  | React + Next.js                               |
| **UI Library** | Tailwind CSS + ShadCN                         |
| **Backend (BaaS)** | Supabase (data storage, real-time features) |
| **Deployment** | Vercel                                        |

### Scraping Tools Tech Stack
1. **Core:**
  - Playwright (Python) - Browser automation
  - Scrapy - Crawl management
  - DeepSeek-API - Free tier for text processing

2. **Instagram Specific:**
  - Playwright-stealth - Anti-detection
  - Tesseract OCR - Text extraction from images

3. **Infrastructure:**
  - Supabase - Data storage
  - GitHub Actions - Free scheduler

4. **Validation:**
  - Pydantic - Data modeling
  - Great Expectations - Data quality

## 2. Core Features
- **Web Crawler:** Scrapes competition data from specified sources.
- **ID Region Filter:** Prioritizes competitions relevant to Indonesian students.
- **Auto-translate:** Translates international competition details to Bahasa Indonesia.
- **Deadline Alert System:** Sends notifications 7 days before competition deadlines.
- **Data Validation:** Ensures the credibility and accuracy of competition data.
- **User Preferences:** Allows users to save and track competitions of interest.

## 3. User Flow
1. **Landing Page:** Users land on a homepage showcasing featured competitions.
2. **Browse Competitions:** Users can filter competitions by category, location, and deadline.
3. **Competition Details:** Clicking on a competition opens a detailed view with all relevant information.
4. **Save/Alert:** Users can save competitions and set up deadline alerts.
5. **User Dashboard:** Logged-in users can view saved competitions and manage alerts.

## 4. Design and UI/UX
- **Visual Design:** Clean and minimalistic with a focus on readability and ease of navigation.
- **Color Scheme:** Use of national colors (red and white) with neutral tones for background.
- **Typography:** Sans-serif fonts for modern readability.
- **User Experience:** Intuitive navigation with clear calls to action and responsive design for various devices.

## 5. Technical Implementation
- **Frontend:** Built with React and Next.js for server-side rendering and SEO optimization.
- **Backend:** Utilizes Supabase for real-time data storage and user authentication.
- **Web Scraping:** Implemented using Playwright and Scrapy for efficient data extraction.
- **Data Processing:** Uses DeepSeek-API for text processing and Tesseract OCR for image text extraction.
- **Data Validation:** Ensures data quality with Pydantic and Great Expectations.
- **Deployment:** Hosted on Vercel for seamless deployment and scalability.

## 6. Workflow Links and Setup Instructions
- **Tools and Resources:**
  - **Playwright:** [Playwright Documentation](https://playwright.dev/)
  - **Scrapy:** [Scrapy Documentation](https://docs.scrapy.org/)
  - **Supabase:** [Supabase Documentation](https://supabase.io/docs)
  - **Next.js:** [Next.js Documentation](https://nextjs.org/docs)
  - **Tailwind CSS:** [Tailwind CSS Documentation](https://tailwindcss.com/docs)
  - **Vercel:** [Vercel Documentation](https://vercel.com/docs)

- **Setup Instructions:**
  1. Clone the repository.
  2. Install dependencies using `npm install`.
  3. Set up environment variables for Supabase and other APIs.
  4. Run the development server using `npm run dev`.
  5. Deploy to Vercel using `vercel`.

This structured blueprint provides a comprehensive guide for developing the IndoCompScraper app, ensuring a clear understanding of the project's goals, features, and technical requirements.