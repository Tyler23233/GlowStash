export interface Product {
  id: string;
  brand: string;
  name: string;
  price?: number | string;
  image_url?: string;
  product_url_sephora?: string;
  product_url_ulta?: string;
  product_url_amazon?: string;
  category?: string;
  currency?: string;
  slug?: string;
  tags?: string | string[];
}
