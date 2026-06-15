import HouseReserveDetails from "@/components/HouseDetails/HouseReserveDetails";
import type { Metadata } from "next";


type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/houses/${params.id}`);
    const json = await res.json();
    const data = json.data || json;

    return {
      title: data.title,
      description: data.caption?.slice(0, 150) || "جزئیات و رزرو اقامتگاه در رهن کده",
      openGraph: {
        title: data.title,
        description: data.caption?.slice(0, 150),
        images: data.photo ? [data.photo] : [],
        type: "website",
      },
    };
  } catch {
    return {
      title: "جزئیات اقامتگاه",
      description: "جزئیات و رزرو اقامتگاه در رهن کده",
    };
  }
}

export default function Page() {
  return <HouseReserveDetails />;
}