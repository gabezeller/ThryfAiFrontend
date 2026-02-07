"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaHeart, FaEnvelope, FaUser } from "react-icons/fa";
import Link from "next/link";

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

interface Outfit {
    id: number;
    name: string;
    items: Product[];
    createdAt: string;
}

export default function ProfilePage() {
    const [outfits, setOutfits] = useState<Outfit[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const mockUser = {
        name: "Rafael Mejia",
        email: "rmeji3@uic.edu",
        avatar: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
    };

    useEffect(() => {
        async function fetchOutfits() {
            try {
                const response = await fetch("http://50.217.45.185/api/Outfits", {
                    headers: {
                        "accept": "text/plain"
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setOutfits(data);
                }
            } catch (error) {
                console.error("Error fetching outfits:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchOutfits();
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa] pb-20">
            {/* Profile Header Block */}
            <div className="flex items-center justify-center bg-gradient-to-tr from-amber-300 to-amber-400 pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto flex flex-row items-center gap-10">
                    <div>
                        <Avatar className="w-40 h-40 border-8 border-white shadow-2xl">
                            <AvatarImage src={mockUser.avatar} />
                            <AvatarFallback>GZ</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex flex-col gap-4 text-center">
                        <h1 className="text-5xl font-black text-black tracking-tight">
                            {mockUser.name}
                        </h1>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="flex items-center gap-2 text-black/70 font-medium">
                                <FaEnvelope className="text-black/50" />
                                {mockUser.email}
                            </div>
                            <div className="flex items-center gap-2 text-black/70 font-medium">
                                <FaUser className="text-black/50" />
                                Fashion Enthusiast
                            </div>
                        </div>
                        <div className="flex gap-4 mt-2 justify-center">
                            <Button className="cursor-pointer bg-white text-black hover:bg-gray-100 rounded-full px-8 border-none shadow-lg font-bold">
                                Edit Profile
                            </Button>
                            <Button variant="outline" className="cursor-pointer border-black/20 text-black hover:bg-black/5 rounded-full px-8 font-bold">
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Saved Outfits Section */}
            <div className="max-w-6xl mx-auto mt-[-40px] px-4">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-3">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Saved Outfits</h2>
                                <p className="text-sm text-gray-500 font-medium">{outfits.length} complete looks saved</p>
                            </div>
                        </div>
                        <Link href="/outfitbuilder">
                            <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-6 h-12 font-bold cursor-pointer">
                                Create New Outfit
                            </Button>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-500 font-bold">Loading your fits...</p>
                        </div>
                    ) : outfits.length > 0 ? (
                        <div className="grid  grid-cols-3 gap-8">
                            {outfits.map((outfit) => (
                                <div
                                    key={outfit.id}
                                    className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                                >
                                    <div className="relative p-4 flex gap-2 h-48 bg-gray-50">
                                        {outfit.items.slice(0, 3).map((item, idx) => (
                                            <div
                                                key={item.id}
                                                className={`flex-1 rounded-2xl overflow-hidden shadow-md border-2 border-white transition-transform duration-300 group-hover:scale-105 ${idx === 1 ? "rotate-2" : idx === 2 ? "-rotate-2" : ""}`}
                                            >
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-amber-600 transition-colors">
                                            {outfit.name || "Weekend Aesthetic"}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-2 mt-1">
                                                {outfit.items.map((item, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm bg-gray-200">
                                                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                                {outfit.items.length > 4 && (
                                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-50 flex items-center justify-center text-[10px] font-bold text-amber-600 shadow-sm">
                                                        +{outfit.items.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-lg font-black text-amber-600">
                                                ${outfit.items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                                            </span>
                                        </div>
                                        <Button variant="ghost" className="cursor-pointer w-full mt-6 rounded-xl text-gray-400 hover:text-amber-600 hover:bg-amber-50 font-bold group-hover:bg-amber-50 group-hover:text-amber-600">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 flex flex-col items-center gap-6">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                                <FaHeart className="text-4xl" />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-xl font-bold text-gray-900">No saved outfits yet</h3>
                                <p className="text-gray-500 mt-2">Start using the Outfit Builder to create and save your favorite looks!</p>
                            </div>
                            <Link href="/outfitbuilder">
                                <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-10 h-12 font-bold shadow-lg shadow-amber-200">
                                    Go to Outfit Builder
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
