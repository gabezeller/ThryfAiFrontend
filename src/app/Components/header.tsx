"use client"

import { FaShoppingCart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, useRef, useEffect } from "react";

export function AvatarWithBadge() {
    return (
        <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#fc934d] transition-all duration-300">
            <AvatarImage src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
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

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const onCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    async function handlePopoverSearch() {
        if (selectedFile) {
            await handleReverseImageSearch(selectedFile);
            setIsPopoverOpen(false);
        }
    };

    async function handleReverseImageSearch(file: File) {
        const url = `http://localhost:5207/api/Discovery/visual-search`;
        setIsLoading(true);
        setShowResults(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "accept": "text/plain"
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log("Search API result:", json);
            setSearchResults(json);
            return json;
        } catch (error) {
            console.error("Error searching for outfit:", error);
        } finally {
            setIsLoading(false);
        }

        return [];
    }

    async function handleSearch(): Promise<Product[]> {
        const url = `http://localhost:5207/api/listing/search?search=${searchQuery}`;
        setIsLoading(true);
        setShowResults(true);
        try {
            const response = await fetch(url, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log("Search API result:", json);
            setSearchResults(json);
            return json;
        } catch (error) {
            console.error("Error searching for outfit:", error);
        } finally {
            setIsLoading(false);
        }

        return [];
    }
    return (
        <nav suppressHydrationWarning className="relative z-[100] flex pl-8 pr-8 items-center max-w-7xl mx-auto justify-between w-full text-black p-4 sm:rounded-2xl bg-gradient-to-tr from-amber-300 to-amber-400 mb-10  rounded-none mt-0 drop-shadow-sm">
            <Link href={"/"} className="hover:cursor-pointer scale-100 hover:scale-110 transition-transform duration-300 ease-in-out transform">
                <svg width="218" height="63" viewBox="0 0 218 63" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto">
                    <g filter="url(#filter0_d_0_1)">
                        <path d="M60.225 20.05H52.35V13.5H75.55V20.05H67.7V46.5H60.225V20.05ZM89.8883 25.375C91.3216 25.375 92.7216 25.6667 94.0883 26.25C95.4549 26.8333 96.5799 27.7583 97.4633 29.025C98.3466 30.275 98.7883 31.925 98.7883 33.975V46.5H91.1883V35.225C91.1883 33.7583 90.8549 32.6583 90.1883 31.925C89.5383 31.175 88.6466 30.8 87.5133 30.8C86.7633 30.8 86.0466 31 85.3633 31.4C84.6799 31.7833 84.1216 32.3333 83.6883 33.05C83.2716 33.75 83.0633 34.5583 83.0633 35.475V46.5H75.4383V12.1H83.0633V29C83.2466 28.45 83.6549 27.9 84.2883 27.35C84.9383 26.7833 85.7466 26.3167 86.7133 25.95C87.6966 25.5667 88.7549 25.375 89.8883 25.375ZM106.224 46.5H98.6238V25.975H106.224V29.15H106.099C106.232 28.7667 106.557 28.2833 107.074 27.7C107.59 27.1 108.315 26.5667 109.249 26.1C110.182 25.6167 111.324 25.375 112.674 25.375C113.624 25.375 114.499 25.525 115.299 25.825C116.099 26.1083 116.682 26.3833 117.049 26.65L114.099 32.825C113.865 32.5417 113.449 32.25 112.849 31.95C112.265 31.6333 111.532 31.475 110.649 31.475C109.632 31.475 108.79 31.7333 108.124 32.25C107.474 32.7667 106.99 33.3917 106.674 34.125C106.374 34.8583 106.224 35.55 106.224 36.2V46.5ZM125.448 39.925L130.998 25.975H138.448L124.348 56.9H116.748L121.498 46.5L112.923 25.975H120.498L125.448 39.925ZM135.255 25.975H138.655V20.55C138.655 18.55 139.08 16.8833 139.93 15.55C140.78 14.2167 141.88 13.2083 143.23 12.525C144.58 11.8417 145.98 11.5 147.43 11.5C149.23 11.5 150.597 11.7417 151.53 12.225C152.48 12.7083 153.08 13.0667 153.33 13.3L150.43 18.875C150.347 18.7417 150.139 18.55 149.805 18.3C149.472 18.05 149.03 17.925 148.48 17.925C148.13 17.925 147.78 18.0167 147.43 18.2C147.08 18.3833 146.789 18.7083 146.555 19.175C146.339 19.6417 146.23 20.325 146.23 21.225V25.975H151.305V32.225H146.23V46.5H138.655V32.225H135.255V25.975ZM148.707 25.975H152.207V17.55H159.732V25.975H164.332V32.225H159.732V37.95C159.732 38.8 159.857 39.4917 160.107 40.025C160.357 40.5417 160.816 40.8 161.482 40.8C161.932 40.8 162.316 40.7 162.632 40.5C162.949 40.3 163.141 40.1667 163.207 40.1L165.807 45.5C165.691 45.6 165.324 45.7833 164.707 46.05C164.107 46.3167 163.341 46.5583 162.407 46.775C161.474 46.9917 160.432 47.1 159.282 47.1C157.232 47.1 155.541 46.525 154.207 45.375C152.874 44.2083 152.207 42.4167 152.207 40V32.225H148.707V25.975Z" fill="black" />
                        <path d="M175.296 13.5H182.721L195.746 46.5H187.771L185.371 39.875H172.671L170.246 46.5H162.246L175.296 13.5ZM175.171 33.325H182.896L179.071 22.5H178.996L175.171 33.325ZM194.661 46.5V25.975H202.261V46.5H194.661ZM198.561 21.75C197.361 21.75 196.344 21.3333 195.511 20.5C194.677 19.65 194.261 18.6417 194.261 17.475C194.261 16.3083 194.677 15.3 195.511 14.45C196.361 13.5833 197.377 13.15 198.561 13.15C199.344 13.15 200.061 13.35 200.711 13.75C201.361 14.1333 201.886 14.65 202.286 15.3C202.686 15.95 202.886 16.675 202.886 17.475C202.886 18.6417 202.461 19.65 201.611 20.5C200.761 21.3333 199.744 21.75 198.561 21.75ZM208.596 47.1C207.363 47.1 206.296 46.6583 205.396 45.775C204.513 44.875 204.071 43.8083 204.071 42.575C204.071 41.3083 204.513 40.2333 205.396 39.35C206.296 38.45 207.363 38 208.596 38C209.863 38 210.938 38.45 211.821 39.35C212.705 40.2333 213.146 41.3083 213.146 42.575C213.146 43.8083 212.705 44.875 211.821 45.775C210.938 46.6583 209.863 47.1 208.596 47.1Z" fill="#FF914D" />
                    </g>
                    <g filter="url(#filter1_d_0_1)">
                        <rect x="4" y="7.5" width="42" height="42" fill="#FF914D" />
                    </g>
                    <g filter="url(#filter2_d_0_1)">
                        <path d="M12.5251 47.2383L10.0503 49.7132L15 54.663L17.4749 52.1881L15 49.7132L12.5251 47.2383ZM15 49.7132L17.4749 52.1881L38.6881 30.9749L36.2132 28.5L33.7383 26.0251L12.5251 47.2383L15 49.7132Z" fill="black" />
                        <path d="M12 49H8.5V56H12V52.5V49ZM12 52.5V56H29V52.5V49H12V52.5Z" fill="black" />
                        <path d="M8.5 50.5V54H15.5V50.5H12H8.5ZM12 50.5H15.5V35.5H12H8.5V50.5H12Z" fill="black" />
                        <path d="M37.8094 10.7617L40.2843 8.2868L35.3345 3.33705L32.8597 5.81192L35.3345 8.2868L37.8094 10.7617ZM35.3345 8.2868L32.8597 5.81192L11.6464 27.0251L14.1213 29.5L16.5962 31.9749L37.8094 10.7617L35.3345 8.2868Z" fill="black" />
                        <path d="M38.3345 9H41.8345V2H38.3345V5.5V9ZM38.3345 5.5V2L21.3345 2V5.5V9H38.3345V5.5Z" fill="black" />
                        <path d="M41.8345 7.5V4H34.8345V7.5H38.3345H41.8345ZM38.3345 7.5H34.8345V22.5H38.3345H41.8345V7.5H38.3345Z" fill="black" />
                    </g>
                    <rect x="10" y="50.5" width="4" height="3" fill="black" />
                    <defs>
                        <filter id="filter0_d_0_1" x="48.35" y="9.5" width="168.796" height="53.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                        </filter>
                        <filter id="filter1_d_0_1" x="0" y="5.5" width="50" height="50" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                        </filter>
                        <filter id="filter2_d_0_1" x="4.5" y="0" width="41.3345" height="62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                        </filter>
                    </defs>
                </svg>
            </Link>
            <div className="relative group">
                <div className="flex bg-[#fafafa] items-center rounded-xl px-3 py-1 gap-2 cursor-pointer ">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="bg-[#fafafa] flex items-center gap-2 border-none focus:outline-none rounded-xl p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                                Category
                                <FaChevronDown />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-50 drop-shadow" align="start" alignOffset={-10}>
                            <DropdownMenuItem className="cursor-pointer">Topwear</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Bottomwear</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Footwear</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Accessories</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="w-[1px] h-5 bg-gray-500 rounded-full" />
                    <input
                        type="text"
                        placeholder="Search any outfit..."
                        value={searchQuery}
                        onInput={e => {
                            setSearchQuery((e.target as HTMLInputElement).value);
                            if ((e.target as HTMLInputElement).value === "") {
                                setShowResults(false);
                            }
                        }}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        onFocus={() => searchResults.length > 0 && setShowResults(true)}
                        className="bg-[#fafafa] border-none focus:outline-none rounded-xl p-2 w-[350px]"
                    />
                    <IoSearchSharp onClick={handleSearch} className="text-xl text-gray-500 cursor-pointer hover:text-amber-500 transition-colors" />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger asChild>
                            <button className="flex items-center">
                                <FaCamera className="text-xl text-gray-500 cursor-pointer hover:text-amber-500 transition-colors" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4 bg-white/95 backdrop-blur-sm border-amber-100 shadow-xl rounded-2xl z-1000">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-bold leading-none text-gray-900">Visual Search</h4>
                                    <p className="text-sm text-gray-500">
                                        Upload an image to search for similar styles.
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    {previewUrl ? (
                                        <div className="relative group rounded-xl overflow-hidden border-2 border-amber-100 aspect-square bg-gray-50">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={onCameraClick}
                                                    className="cursor-pointer bg-white hover:bg-gray-100 text-gray-900 border-none h-8"
                                                >
                                                    Change Image
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={onCameraClick}
                                            className="flex flex-col items-center justify-center gap-2 h-32 w-full rounded-xl border-2 border-dashed border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition-colors group cursor-pointer"
                                        >
                                            <FaCamera className="text-2xl text-amber-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm text-amber-600 font-medium">Select Image</span>
                                        </button>
                                    )}
                                    <Button
                                        onClick={handlePopoverSearch}
                                        disabled={!selectedFile || isLoading}
                                        className="cursor-pointer w-full bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl h-10 shadow-sm"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                                Searching...
                                            </>
                                        ) : (
                                            "Search Outfits"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Search Results Menu */}
                {showResults && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="p-2 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <span className="text-xs font-bold text-gray-400 px-2 uppercase tracking-wider">Results ({searchResults.length})</span>
                            <button
                                onClick={() => setShowResults(false)}
                                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {isLoading ? (
                                <div className="p-12 flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-sm text-gray-500 animate-pulse">Searching for outfits...</p>
                                </div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => setShowResults(false)}
                                        className="p-3 hover:bg-amber-50 flex items-center gap-4 cursor-pointer transition-all duration-200 group/item border-b border-gray-50 last:border-none"
                                    >
                                        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.productName}
                                                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-grow">
                                            <div className="flex justify-between items-start">
                                                <span className="text-sm font-bold text-gray-800 line-clamp-1">{product.productName}</span>
                                                <span className="text-sm font-black text-amber-600">${product.price}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{product.brand} • {product.category}</span>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{product.gender}</span>
                                                <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{product.color}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                                        <IoSearchSharp className="text-2xl" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No results found for "{searchQuery}"</p>
                                    <p className="text-xs text-gray-400 text-balance">Try searching for something else or check your spelling.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex gap-5 items-center">
                <Link href="/outfitbuilder" suppressHydrationWarning className="text-black hover:text-white hover:cursor-pointer text-lg font-medium transition-color hover:scale-110 transition-transform duration-300 ease-in-out transform">Outfit-Builder</Link>
                <Link href="/explore" className="text-black hover:text-white hover:cursor-pointer text-lg font-medium transition-color hover:scale-110 transition-transform duration-300 ease-in-out transform">Explore</Link>
                <div className="text-white hover:cursor-pointer text-lg font-medium transition-color bg-[#fc934d] rounded-xl p-2 cursor-pointer scale-100 hover:scale-110 transition-transform duration-300 ease-in-out transform">Create Listing</div>
                <FaShoppingCart className="text-xl text-black cursor-pointer hover:text-white hover:scale-110 transition-transform duration-300 ease-in-out transform" />
                <AvatarWithBadge />
            </div>
        </nav>
    );
};

export default Header;