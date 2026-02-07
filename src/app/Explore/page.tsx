"use client";
import { useEffect } from "react";
import ItemCard from "../Components/item";
import { log } from "console";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Spinner } from "@/components/ui/spinner"
import { motion } from "framer-motion";
import Masonry from '@mui/lab/Masonry';


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
    

    const [exploreItems, setExploreItems] = useState<Product[]>([]);
    const [featureItems, setFeatureItems] = useState<Product[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    
      // ADD GENDER DROP DOWN
    async function fetchExploreItems() {
        setLoading(true);
   


        const url = "http://localhost:5207/api/Discovery/random";
        console.log("Endpoint URL:", url);
        try {
        const response = await fetch(url, {
            method: "GET"
        });



        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);

        }

        const json: Product[] = await response.json();
        console.log("Explore items:", json);
        setExploreItems(json);


        } catch (error) {
        console.error("Error fetching items:", error);
        setExploreItems([]);

        } finally {
        setLoading(false);
        }

        return [];
  }

  async function fetchFeaturedItems() {
        setLoading(true);
   


        const url = "http://localhost:5207/api/Discovery/personalized?userId=global-user";
        console.log("Endpoint URL:", url);
        try {
        const response = await fetch(url, {
            method: "GET"
        });



        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);

        }

        const json: Product[] = await response.json();
        console.log("Featured items:", json);
        setFeatureItems(json);


        } catch (error) {
        console.error("Error fetching items:", error);
        setFeatureItems([]);

        } finally {
        setLoading(false);
        }

        return [];
  }

    useEffect(() => {
        fetchExploreItems();
        fetchFeaturedItems();
    }, []);

    
      interface Product {
        id: number;
        externalId: string;
        productName: string;
        gender: string;
        masterCategory: string;
        category: string;
        fashionCategory: string;
        color: string;
        season: string;
        year: number;
        usage: string;
        description: string;
        imageUrl: string;
        metadata: string;
        brand: string;
        price: number;
      }
    // useEffect(() => {
    //     fetchExploreItems()
    //         .then(items => {
    //             console.log("Fetched items:", items);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching items:", error);
    //         }
    //     );
    // }, []);
    return(
        <div className="flex flex-wrap gap-4 w-full ">
            <motion.div initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="w-full">
                <h2 className="flex w-9/10 text-5xl font-bold leading-10 tracking-tight mx-auto text-black dark:text-zinc-50 text-left  mb-8 ">Picked for you</h2>
                {!loading && featureItems.length > 0 ? (<Carousel className="w-9/10  mx-auto"   opts={{
    align: "start",
    loop: true,
  }} plugins={[
        Autoplay({
          delay: 2000,
        stopOnMouseEnter: true,
        stopOnInteraction: false
        }),
      ]}>           <CarouselPrevious />
                    <CarouselContent>
                        {featureItems.map((item) => (
                            <CarouselItem key={item.id} className="xl:basis-1/5 lg:basis-1/3 basis-1/2  p-2 ">
                                <ItemCard imgUrl={item.imageUrl} name={item.productName} price={item.price} heartable={false} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    <CarouselNext />
                </Carousel> ) : (
                    <Spinner className="size-8 mx-auto" />)}
            {/* </div> */}
            {/* {props.imgUrls?.map((url:any, index:any) => (
                <ItemCard key={index} imgUrl={url} name={props.name[index]} price={props.price[index]} />
            ))} */}

            <motion.div className="w-9/10 mt-10 mx-auto" initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} >
                <h2 className=" w-9/10 text-5xl font-bold leading-10 tracking-tight mx-auto text-black dark:text-zinc-50 text-right mb-8 mt-12">Explore more options</h2>
            {!loading && exploreItems.length > 0 ? (<Masonry columns={4} spacing={8}>
            {exploreItems.map((item, index) => (
                <ItemCard key={index} imgUrl={item.imageUrl} name={item.productName} price={item.price} />
                
            ))}
            </Masonry>) : (
                <Spinner className="size-8 mx-auto" />
            )}
            </motion.div>
            </motion.div>
        </div>
    );
}