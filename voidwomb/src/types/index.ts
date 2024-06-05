// src/types/index.ts

export enum Category {
    CD = 'CD',
    Vinyl = 'Vinyl',
    Tshirt = 'T_shirt',
    Longsleeves = 'Longsleeves',
  }
export interface Product {
  id: number;
  name: string;
  price: number;
}

  