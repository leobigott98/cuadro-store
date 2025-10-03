// data/categories.ts

export type Category = {
  id: string;
  name: string;
  products: string[]; // array of product ids
};

// Example categories grouping by product ids
export const categories: Category[] = [
  {
    id: "clasica-original",
    name: "Clásica Original",
    products: ["1"], // replace with actual product ids
  },
  {
    id: "mafe-original",
    name: "Mafe Original",
    products: ["2", "3"],
  },
  {
    id: "mika-sport-lite",
    name: "Mika Sport Lite",
    products: ["4"],
  },
  {
    id: "basic-line-crop-tee",
    name: "Basic Line Crop Tee",
    products: ["5", "6", "7"],
  },
  {
    id: "clasico-algodon-stretch",
    name: "Clásico Algodón Stretch",
    products: ["8", "9", "10"],
  },
  {
    id: "clasico-algodon",
    name: "Clásico Algodón",
    products: ["14"],
  },
  {
    id: "toallas",
    name: "Toallas",
    products: ["11", "12", "13"],
  },
];
