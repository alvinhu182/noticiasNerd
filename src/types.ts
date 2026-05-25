export interface NewsItem {
  id: string;
  category: 'GAMES' | 'CINEMA & SÉRIES' | 'TECNOLOGIA';
  title: string;
  summary: string;
  content: string; // Extensive read simulated content when clicking
  date: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  likes: number;
  comments: number;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  iconName: string; // Will match Lucide icons dynamically
}
