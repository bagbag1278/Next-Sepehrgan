import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/housereserve`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/houserent`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/houses`);
    const json = await res.json();
    console.log("json:", JSON.stringify(json).slice(0, 200));
    const houses = json.houses || json.data || [];
console.log("houses:", houses);
    const reservePages: MetadataRoute.Sitemap = houses.map((house: any) => ({
      url: `${baseUrl}/housereserve/${house.id}`,
      lastModified: new Date(house.last_updated || Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const rentPages: MetadataRoute.Sitemap = houses.map((house: any) => ({
      url: `${baseUrl}/houserent/MortgageRentDetails/${house.id}`,
      lastModified: new Date(house.last_updated || Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
    return [...staticPages, ...reservePages, ...rentPages];
  } catch (error){
    console.error("sitemap error:", error);
    return staticPages;
  }
}
