import { FaCamera, FaWandMagicSparkles } from "react-icons/fa6";



// background: amber 50
// highlights: green 200
// font: yellow 900


export default function OutfitBuilder() {
  return (
    <div className="flex min-h-screen h-screen items-center justify-center bg-amber-50 font-sans">
      <main className="flex flex-1 min-h-screen h-full w-full max-w-7xl flex-col  bg-amber-50 dark:bg-black sm:items-start rounded-lg">
        <h2 className="flex max-w-xs text-3xl font-semibold leading-10 tracking-tight mx-auto text-black dark:text-zinc-50  text-center">
          Complete or Build an Outfit
        </h2>
        <p className=" flex max-w-xs text-lg leading-8 text-zinc-600 dark:text-zinc-400 mx-auto text-center">
          Powered by AI
        </p>
        <div className="flex flex-col text-base font-medium sm:flex-row w-full h-1/2 sm:w-6/10 sm:mx-auto">
        <button className="flex shadow-[5px_5px_0px_rgba(101,163,13,1)] w-8/10 h-1/2 mx-auto max-w-xs text-base items-center justify-center  bg-gradient-to-tr from-amber-300  to-amber-400  rounded-lg
         hover:cursor-pointer hover:opacity-75 hover:shadow-[3px_3px_0px_rgba(101,163,13,1)]  transition-colors transition-shadow mt-10">
            <FaCamera className="mr-2" /> Complete your outfit
        </button>

        <button className="flex shadow-[5px_5px_0px_rgba(101,163,13,1)] w-8/10 h-1/2 mx-auto max-w-xs text-base items-center justify-center  bg-gradient-to-tr from-amber-300  to-amber-400 rounded-lg
         hover:cursor-pointer hover:opacity-75 hover:shadow-[3px_3px_0px_rgba(101,163,13,1)]  transition-colors transition-shadow mt-10">
            <FaWandMagicSparkles className="mr-2" /> Start from scratch...
        </button>
        </div>

      </main>
    </div>
  );
}