export interface GeneratedProduct {
  title: string;
  description: string;
  priceCents: number;
}

export interface GeneratedStore {
  slug: string;
  prompt: string;
  name: string;
  tagline: string;
  colorPrimary: string;
  colorSecondary: string;
  products: GeneratedProduct[];
  createdAt: string;
}
