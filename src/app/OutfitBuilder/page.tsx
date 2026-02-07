"use client";

import { FaCamera, FaWandMagicSparkles } from "react-icons/fa6";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"



// background: amber 50
// highlights: green 200
// font: yellow 900

// export function InputFile() {
//   return (
//     <Field>
//       <FieldLabel htmlFor="picture">Picture</FieldLabel>
//       <Input id="picture" type="file" />
//       <FieldDescription>Select a picture to upload.</FieldDescription>
//     </Field>
//   )

export default function OutfitBuilder() {
  const [images, setImages] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files);
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const files = Array.from(e.target.files);

  const previewUrls = files.map(file => URL.createObjectURL(file));
  setPreviews(previewUrls);
};

  const outfitCompleter = () => {

    
    return ( 

      <div className="flex flex-col items-center mx-auto shadow-lg  bg-zinc-50 font-sans dark:bg-black  rounded-lg p-10">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-50">Find the missing piece</h2>
          <p className=" flex max-w-xs text-lg leading-8 text-zinc-600 dark:text-zinc-400 mx-auto text-center">
          Upload what you have and let out AI do the rest!
        </p>

        <Field>
          <FieldLabel htmlFor="picture">Pictures</FieldLabel>
          <Input id="picture" type="file" multiple onChange={handleChange}/>
          <FieldDescription>Upload pictures of your clothing.</FieldDescription>
        </Field>

        {previews.map((src, i) => (
  <img key={i} src={src} className="w-32 h-32 object-cover" />
))}

      <p className="flex max-w-xs text-lg leading-8 text-zinc-600 leading-tight mb-4 mt-10 text-sm dark:text-zinc-400 mx-auto text-center mt-4">
        Optionally add information about the missing piece to help our AI find the best match!
      </p>
          <div className="grid w-full gap-2">
      <Textarea placeholder="Type your prompt here." />
      <Button className="bg-gradient-to-tr from-amber-300  to-amber-400 text-black hover:opacity-70 hover:cursor-pointer">Generate Outfit</Button>
    </div>

      </div>
    );
  }

  return (
    <div className="flex min-h-screen h-screen items-center justify-center bg-amber-50 font-sans">
      <main className="flex flex-1 min-h-screen h-full  w-full max-w-7xl flex-col  bg-amber-50 dark:bg-black sm:items-start rounded-lg">
        {/* <h2 className="flex max-w-xs text-3xl font-semibold leading-10 tracking-tight mx-auto text-black dark:text-zinc-50  text-center">
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
        </div> */}

        {outfitCompleter()}

      </main>
    </div>
  );
}

