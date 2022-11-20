export interface ProductList {
  _id: string;
  body: string;
  headers: {
    'Content-Type': string;
  };
  method: string;
}

export interface ProductDetails {
  categoryId: number | null;
  categoryName: string | null;
  sku: string | null;
  name: string | null;
  description: string | null;
  weight: number | null;
  width: number | null;
  length: number | null;
  height: number | null;
  image: string | null;
  price: number | null;
}
