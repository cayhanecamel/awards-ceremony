export interface Winner {
  rank: 1 | 2 | 3;
  name: string;
  description?: string;
}

export interface Award {
  id: string;
  slug: string;
  title: string;
  description?: string;
  winners: Winner[];
  created_at?: string;
  expires_at?: string;
  view_count?: number;
  is_public?: boolean;
}
