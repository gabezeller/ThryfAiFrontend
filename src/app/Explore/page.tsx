"use client";
import { useEffect } from "react";
import ItemCard from "../Components/item";
import { log } from "console";

interface ExploreItem {
    id: number;
    imgUrl: string;
    productName: string;
    price: number;
}

async function fetchExploreItems(): Promise<ExploreItem[]> {
    const response = await fetch("http://localhost:5207/api/Discovery/random");
    if (!response.ok) {
        throw new Error("Failed to fetch explore items");
    }
    const data = await response.json();
    return data.items as ExploreItem[];
}

interface ExplorePageProps {
    imgUrls: string[];
    name: string[];
    price: number[];
}
export default function ExplorePage(props: ExplorePageProps) {
    useEffect(() => {
        fetchExploreItems()
            .then(items => {
                console.log("Fetched items:", items);
            })
            .catch(error => {
                console.error("Error fetching items:", error);
            }
        );
    }, []);
    return(
        <div className="flex flex-wrap gap-4">
            {props.imgUrls?.map((url:any, index:any) => (
                <ItemCard key={index} imgUrl={url} name={props.name[index]} price={props.price[index]} />
            ))}
        </div>
    );
}