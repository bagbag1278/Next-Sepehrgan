import { z } from "zod";

export const tools = {
  search_houses: {
    description: "Search houses by filters",
    parameters: z.object({
      city: z.string().optional(),
      maxPrice: z.number().optional(),
      minPrice: z.number().optional(),
      rooms: z.number().optional(),
    }),
  },

  get_house_details: {
    description: "Get house details",
    parameters: z.object({
      id: z.number(),
    }),
  },
};