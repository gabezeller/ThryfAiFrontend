interface ItemCardProps {
  imgUrl: string;
  name: string;
  price: number;
}

export default function ItemCard({ imgUrl, name, price }: ItemCardProps) {
    return(
        <div className="h-64 w-48 rounded-2xl cursor-pointer shadow-xsm hover:shadow-lg transition-shadow duration-300">
            <img className="h-full w-full object-cover rounded-2xl"
                src={imgUrl}
                alt={name}
            />
            <h1 className="text-center mt-2">
            <div className="grid grid-cols-2 gap-4 relative whitespace-nowrap decoration-black">
                <p>{name} - ${price}</p>
                <svg id="heart" xmlns="http://www.w3.org" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6 absolute right-0 bottom-0 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.312-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>
            </h1>
        </div> 
    );
}