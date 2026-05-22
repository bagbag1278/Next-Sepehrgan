export interface IReserveHouse {
  id: number;
  title: string;
  price: number;
  discounted_price: number;
  location: string;
  capacity: number;
  rooms: number;
  bathrooms: number;
  toilets: number;
  parking: number;
  area: number;
  image: string;
  rate: string;
  last_updated_at: string;
}