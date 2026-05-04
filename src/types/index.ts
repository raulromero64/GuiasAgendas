export interface Lesson {
  id: string;
  title: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  desc: string;
  lessons: string[];
  iconType: "BookOpen" | "Star" | "Map";
  iconColor: string;
  action: string;
}

export interface AgendaMission {
  mañana: string;
  tarde: string[];
  habito: string;
  recompensa: string;
}

export interface BlogPost {
  id: string;
  title: string;
  imageAlt: string;
  excerpt: string;
}
