import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

import Link from "next/link";

const Header = () => {
    return (
        // <nav className="flex items-center justify-between w-full bg-gradient-to-tr from-lime-600 via-lime-500 to-amber-400 text-black p-4">
    <nav className="flex items-center max-w-7xl mx-auto justify-between w-full text-black p-4 sm:rounded-2xl bg-gradient-to-tr from-amber-300  to-amber-400 mb-10 sm:mt-4 rounded-none mt-0">
    
            <Link href={"/"} className="text-2xl font-bold  hover:cursor-pointer">
                <h1 className="text-2xl font-bold  hover:cursor-pointer">Thryft.ai</h1>
            </Link>
            <div className="flex gap-3">
                <div className="text-black hover:text-amber-50 hover:cursor-pointer text-lg font-medium transition-color">Explore</div>
                <div className="text-black hover:text-amber-50 hover:cursor-pointer text-lg font-medium transition-color">OutfitBuilder</div>
            </div>
            

        </nav>
        );

};

export default Header;