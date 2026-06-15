import MortgageRentDetails from "@/components/HouseRent/MortgageRentDetails";
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
      description: data.caption?.slice(0, 150) || "جزئیات رهن و اجاره در رهن کده",
      openGraph: {
        title: data.title,
        description: data.caption?.slice(0, 150),
        images: data.photo ? [data.photo] : [],
        type: "website",
      },
    };
  } catch {
    return {
      title: "جزئیات رهن و اجاره",
      description: "جزئیات رهن و اجاره ملک در رهن کده",
    };
  }
}

export default function Page() {
  return <MortgageRentDetails />;
}