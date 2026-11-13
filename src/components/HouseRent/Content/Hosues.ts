  // hosues types ============
export interface House {
  id?: number | string; 
  title?: string;    
  address?: string;
  rooms?: number;
  bathrooms?: number;
  parking?: number;
  capacity?: number;
  price?: number | string; 
  imageUrl?: string;
  image?: string | null;
  photos?: string[] | null;
 
}

export interface Props {
  houses: (House & { isInvalid?: boolean })[];
}
