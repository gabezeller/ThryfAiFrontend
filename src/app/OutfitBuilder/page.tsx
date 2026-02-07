"use client";

import { FaCamera, FaWandMagicSparkles } from "react-icons/fa6";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {motion} from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";




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
  const [prompt, setPrompt] = useState<string>("");

  const [generatorVisible, setGeneratorVisible] = useState<boolean>(false);
  const [completerVisible, setCompleterVisible] = useState<boolean>(false);

  const [imageCategories, setImageCategories] = useState<Map<string, string>>(new Map());

  const [loading, setLoading] = useState<boolean>(false);

  // ADD GENDER DROP DOWN
  const [gender, setGender] = useState<string>("");

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

  const updateMap = (key: string, value: string) => {
    setImageCategories(prev => new Map(prev).set(key, value));
  }

  useEffect(() => {
    console.log(imageCategories);
  }, [imageCategories]);

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files);
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const files = Array.from(e.target.files);

  const previewUrls = files.map(file => URL.createObjectURL(file));
  setPreviews(previewUrls);
};

async function handleCompleter(): Promise<Product[]> {



  // Logic to generate outfit based on uploaded images
  setLoading(true);
  const queryCategories = images ? Array.from(images).map(img => (imageCategories.get(img.name))) : [];
  console.log("Generating outfit with data:", queryCategories);
  console.log("Images:  ", images);


        const url = "http://localhost:5207/api/VisualOutfit/complete-look";
        console.log("Complete look URL:", url);
        try {
          const response = await fetch(url, {
        method: "POST"
      });
            
          
          
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            
          }
      
          const json = await response.json();
          console.log(json);
          
         
        } catch (error) {
          console.error("Error generating outfit:", error);
          
        } finally {
          setLoading(false);
        }

        return [];
}

const handleGenerator = () => {
  // Logic to generate outfit based on prompt
  console.log("Generating outfit with prompt:", prompt);
}



  const outfitCompleter = () => {

    
    return ( 

       <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}  className="flex flex-col items-center mx-auto shadow-lg  bg-zinc-50 font-sans dark:bg-black  rounded-lg p-10">
        <IoArrowBackCircleOutline className="self-start text-2xl relative -left-5 -top-5 hover:cursor-pointer hover:opacity-75" onClick={() => setCompleterVisible(false)} />
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-50">Find the missing piece</h2>
          <p className=" flex max-w-xs text-lg leading-8 text-zinc-600 dark:text-zinc-400 mx-auto text-center">
          Upload what you have and let our AI complete your fit!
        </p>

        <Field className="mb-4">
          <FieldLabel htmlFor="picture"><FaCamera /> Pictures</FieldLabel>
          <Input id="picture" type="file" multiple onChange={onImageUpload}/>
          <FieldDescription>Upload pictures of your clothing.</FieldDescription>
        </Field>

        <Select value={gender} onValueChange={(e) => setGender(e)} >
        <SelectTrigger className="w-[150px] bg-white mb-4" >
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="unisex">Unisex</SelectItem>
        </SelectContent>
      </Select>

        {images && Array.from(images).map((src, i) => (
          <motion.div initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} key={i} className="flex flex-col    mb-4">
        
          <ClothingImageCategory img={src} updateMap={updateMap} />


          </motion.div>

))}

      
      <Button className="bg-gradient-to-tr from-amber-300  to-amber-400 text-black hover:opacity-70 hover:cursor-pointer mt-6" onClick={handleCompleter}><FaWandMagicSparkles className="" />Generate Outfit</Button>
    
      </motion.div>
    );
  }

  const outfitGenerator = () => {

    
    return ( 

      <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} className="flex flex-col items-center mx-auto shadow-lg  bg-zinc-50 font-sans dark:bg-black  rounded-lg p-10">
                <IoArrowBackCircleOutline className="self-start text-2xl relative -left-5 -top-5 hover:cursor-pointer hover:opacity-75" onClick={() => setGeneratorVisible(false)} />

        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-50">The AI Outfit Builder</h2>
          <p className=" flex max-w-xs text-lg leading-8 text-zinc-600 dark:text-zinc-400 mx-auto text-center">
          Tell us what you want and let our AI find the best fit for you!
        </p>

       

      
          <div className="grid w-full gap-2">
      <Textarea placeholder="Type your prompt here." className="mt-6" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <Button className="bg-gradient-to-tr from-amber-300  to-amber-400 text-black hover:opacity-70 hover:cursor-pointer" onClick={handleGenerator}><FaWandMagicSparkles className="" /> Generate Outfit</Button>
    </div>
      </motion.div>
    );
  }

  

  return (
    <div className="flex min-h-screen h-screen items-center justify-center bg-amber-50 font-sans">
      <main className="flex flex-1 min-h-screen h-full  w-full max-w-7xl flex-col  bg-amber-50 dark:bg-black sm:items-start rounded-lg">
        
        <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} className={`${completerVisible || generatorVisible ? "hidden" : ""} flex flex-1 min-h-screen h-full  w-full max-w-7xl flex-col  bg-amber-50 dark:bg-black sm:items-start rounded-lg`}>
        <h2 className="flex max-w-xs text-3xl font-semibold leading-10 tracking-tight mx-auto text-black dark:text-zinc-50  text-center">
          Complete or Build an Outfit
        </h2>
        <p className=" flex max-w-xs text-lg leading-8 text-zinc-600 dark:text-zinc-400 mx-auto text-center">
          Powered by AI
        </p>
        <div className="flex flex-col text-base font-medium xl:flex-row w-full h-1/2 sm:w-6/10 sm:mx-auto">
        <button className="flex shadow-[5px_5px_0px_rgba(0,0,0,1)] w-8/10 h-1/2 mx-auto max-w-xs text-base items-center justify-center  bg-gradient-to-tr from-amber-300  to-amber-400  rounded-lg
         hover:cursor-pointer hover:opacity-75 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]  transition-colors transition-shadow mt-10 " onClick={() => setCompleterVisible(true)}>
            <FaCamera className="mr-2" /> Complete your outfit
        </button>

        <button className="flex shadow-[5px_5px_0px_rgba(0,0,0,1)] w-8/10 h-1/2 mx-auto max-w-xs text-base items-center justify-center  bg-gradient-to-tr from-amber-300  to-amber-400 rounded-lg
         hover:cursor-pointer hover:opacity-75 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]  transition-colors transition-shadow mt-10" onClick={() => setGeneratorVisible(true)}>
            <FaWandMagicSparkles className="mr-2" /> Start from scratch...
        </button>
        </div>
    </motion.div>
            {generatorVisible && outfitGenerator()}
        {completerVisible && outfitCompleter()}

      </main>

      

    </div>
  );
}

function ClothingImageCategory({ img, updateMap }: { img: File, updateMap: (key: string, value: string) => void }) {
  const [category, setCategory] = useState<string>("");

  const handleValueChange = (value: string) => {
    // Call both functions inside the handler
    updateMap(img.name, value);
    setCategory(value);
  };


  useEffect(() => {
    
  }, [category]);

  return (
    <div className="flex flex-row items-center mx-auto ">
        <Image alt="clothing item" src={URL.createObjectURL(img)} className="w-32 h-32 object-cover" width={40} height={40} />
        <Select value={category} onValueChange={(e) => {handleValueChange(e)}} >
        <SelectTrigger className="w-[150px] bg-white ml-4" >
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="topwear">Topwear</SelectItem>
          <SelectItem value="bottomwear">Bottomwear</SelectItem>
          <SelectItem value="footwear">Footwear</SelectItem>
          <SelectItem value="accessories">Accessories</SelectItem>
        </SelectContent>
      </Select>
    </div>

  );
}

