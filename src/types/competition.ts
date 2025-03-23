export interface Competition {
  id: string;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  organizer: string;
  deadline: string;
  registration_start?: string;
  registration_end?: string;
  category_id?: string;
  prize_pool?: string;
  requirements?: string;
  requirements_en?: string;
  registration_link?: string;
  image_url?: string;
  source_url: string;
  source_platform: string;
  created_at?: string;
  updated_at?: string;
  last_scraped_at?: string;
  scraper_id?: string;
}

export type CompetitionFilter = {
  category?: string[];
  source_platform?: string;
  month?: number;
  year?: number;
  deadline?: {
    start?: Date;
    end?: Date;
  };
};
