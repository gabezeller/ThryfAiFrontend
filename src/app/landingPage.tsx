"use client"

import { motion } from "framer-motion"
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';

export default function LandingPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0
        }
    }

    const springTransition = {
        type: "spring",
        stiffness: 100,
        damping: 20
    } as const

    // Column Definitions for the "Dip Shape" rhythm
    const column1 = [
        {
            type: 'accent',
            id: 'item-8',
            className: 'bg-[#ffbc8b] text-orange-900',
            content: (
                <div className="p-6 flex flex-col items-center justify-center min-h-[160px]">
                    <p className="font-bold text-center text-[18px] uppercase tracking-[0.2em] mb-1">Trending</p>
                    <p className="font-light text-center text-[12px] opacity-70">Curated daily picks</p>
                </div>
            )
        },
        {
            type: 'image',
            id: 'item-1',
            src: '/fashion-orange.png',
            alt: 'Fashion Orange',
            className: 'bg-[#ff6b35]'
        },
        {
            type: 'image',
            id: 'item-4',
            src: '/fashion-yellow.png',
            alt: 'Fashion Yellow',
            className: 'bg-[#ffd60a]'
        }
    ];

    const column2 = [
        {
            type: 'accent',
            id: 'item-9',
            className: 'bg-[#52b788] text-green-900',
            content: (
                <div className="p-4 min-h-[180px] flex">
                    <div className="p-4 w-full h-full flex flex-col items-center justify-center">
                        <p className="text-xl font-serif italic text-center">Sustainable</p>
                        <p className="text-[9px] uppercase font-bold opacity-80 text-center">Eco-Friendly Craft</p>
                    </div>
                </div>
            )
        },
        {
            type: 'image',
            id: 'item-3',
            src: '/fashion-green.png',
            alt: 'Fashion Green',
            className: 'bg-[#2d6a4f]'
        }
    ];

    const column3 = [
        {
            type: 'image',
            id: 'item-5',
            src: '/fashion-blue.png',
            alt: 'Fashion Blue',
            className: 'bg-[#457b9d]'
        },
        {
            type: 'accent',
            id: 'item-10',
            className: 'bg-[#a2d2ff] text-blue-900',
            content: (
                <div className="p-6 flex flex-col items-center justify-center min-h-[140px]">
                    <p className="text-[10px] font-bold uppercase tracking-tighter mb-0.5 opacity-60">Spring 2026</p>
                    <p className="text-2xl font-black tracking-tight">ESSENTIALS</p>
                </div>
            )
        },
        {
            type: 'image',
            id: 'item-6',
            src: '/fashion-mint.png',
            alt: 'Fashion Mint',
            className: 'bg-[#b7e4c7]'
        }
    ];

    const column4 = [
        {
            type: 'cta',
            id: 'item-7',
            content: (
                <div className="bg-zinc-900 group cursor-pointer overflow-hidden rounded-[24px]">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full min-h-[220px] flex items-center justify-center p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 relative overflow-hidden"
                    >
                        <div className="text-center relative z-10">
                            <a href="/explore" className="text-white text-xl font-bold block mb-2 tracking-tight">
                                Explore <br /> Collections
                            </a>
                            <div className="flex items-center justify-center gap-2 text-[#fc934d] font-semibold text-xs">
                                <span>Browse Shop</span>
                                <span className="text-lg group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#fc934d]/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    </motion.div>
                </div>
            )
        },
        {
            type: 'image',
            id: 'item-2',
            src: '/fashion-colorful.png',
            alt: 'Fashion Colorful',
            className: 'bg-[#f4a261]'
        }
    ];

    const renderColumn = (items: any[], offsetClass: string) => (
        <div className={`flex flex-col gap-6 flex-1 ${offsetClass}`}>
            {items.map((tile) => (
                <motion.div
                    key={tile.id}
                    variants={itemVariants}
                    transition={springTransition}
                    className={`grid-item relative rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${tile.type === 'cta' ? '' : tile.className}`}
                >
                    {tile.type === 'image' && (
                        <>
                            <img
                                src={tile.src}
                                alt={tile.alt}
                                className="w-full h-auto block object-cover"
                                loading="lazy"
                            />
                            <div className="item-overlay absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                        </>
                    )}
                    {(tile.type === 'accent' || tile.type === 'cta') && tile.content}
                </motion.div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen px-4 md:px-12 py-12 bg-[#fafafa]">
            {/* Hero Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10"
            >
                <h1 className="text-[4rem] font-bold text-center mb-16 text-zinc-900">
                    Elevate Your Style <br />
                    With <span className="bg-gradient-to-r from-[#fc934d] via-[#ff6b35] to-[#f43f5e] bg-clip-text text-transparent inline-flex items-center gap-4">
                        Intelligence
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="56"
                            height="56"
                            viewBox="0 0 30 30"
                            className="sparkle-gradient -mt-8"
                        >
                            <path d="M13.95 6.805l.654 3.06c.593 2.773 2.759 4.939 5.532 5.532l3.06.654c1.024.219 1.024 1.68 0 1.899l-3.06.654c-2.773.593-4.939 2.759-5.532 5.532l-.654 3.06c-.219 1.024-1.68 1.024-1.899 0l-.654-3.06c-.593-2.773-2.759-4.939-5.532-5.532l-3.06-.654c-1.024-.219-1.024-1.68 0-1.899l3.06-.654c2.773-.593 4.939-2.759 5.532-5.532l.654-3.06C12.269 5.781 13.731 5.781 13.95 6.805zM23.641 2.525l.588 2.119c.152.547.58.975 1.127 1.127l2.119.588c.65.18.65 1.102 0 1.282l-2.119.588c-.547.152-.975.58-1.127 1.127l-.588 2.119c-.18.65-1.102.65-1.282 0l-.588-2.119c-.152-.547-.58-.975-1.127-1.127l-2.119-.588c-.65-.18-.65-1.102 0-1.282l2.119-.588c.547-.152.975-.58 1.127-1.127l.588-2.119C22.539 1.875 23.461 1.875 23.641 2.525z"></path>
                        </svg>
                    </span>
                </h1>
            </motion.div>

            {/* Custom Column Grid for "Dip Shape" Effect */}
            <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col md:flex-row gap-6"
                >
                    {renderColumn(column1, "-mt-10")}
                    {renderColumn(column2, "mt-10")}
                    {renderColumn(column3, "mt-7")}
                    {renderColumn(column4, "-mt-10")}
                </motion.div>
            </Box>
        </div>
    )
}