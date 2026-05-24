export interface House {
  id: number;
  title: string;
  address: string;
  price: string;
  photos?: string[] | null;
  tags?: string[];
  rooms?: number;
  bathrooms?: number;
  parking?: number;
  capacity?: number;
}

export interface Props {
  houses: House[];
  totalCount?: number;
}