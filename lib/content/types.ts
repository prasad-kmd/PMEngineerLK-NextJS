export interface Author {
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  bodyContent?: string;
}

export interface ContentItem {
  id?: string;
  slug: string;
  title: string;
  date?: string;
  description?: string;
  content: string;
  rawContent: string;
  final?: boolean;
  firstImage?: string;
  thumbnail?: string;
  readingTime?: number;
  rTime?: number;
  technical?: string;
  category?: string;
  tags?: string[];
  aiAssisted?: boolean;
  author?: string;
  type?: "blog" | "articles" | "projects" | "tutorials" | "wiki";
}

export type ContentType = "blog" | "articles" | "projects" | "tutorials" | "wiki";
