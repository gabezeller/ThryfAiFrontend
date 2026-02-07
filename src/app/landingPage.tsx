"use client"

export default function LandingPage() {
    return (
        <div className="min-h-screen px-8 py-12">
            {/* Hero Title */}
            <h1 className="text-[4rem] font-bold text-center mb-8 leading-tight">
                Elevate Your Style <br />
                With <span className="bg-gradient-to-r from-[#fc934d] to-[#ff6b35] bg-clip-text text-transparent inline-flex items-center gap-2">
                    Intelligence
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 30 30" className="sparkle-gradient -mt-4">
                        <path d="M13.95 6.805l.654 3.06c.593 2.773 2.759 4.939 5.532 5.532l3.06.654c1.024.219 1.024 1.68 0 1.899l-3.06.654c-2.773.593-4.939 2.759-5.532 5.532l-.654 3.06c-.219 1.024-1.68 1.024-1.899 0l-.654-3.06c-.593-2.773-2.759-4.939-5.532-5.532l-3.06-.654c-1.024-.219-1.024-1.68 0-1.899l3.06-.654c2.773-.593 4.939-2.759 5.532-5.532l.654-3.06C12.269 5.781 13.731 5.781 13.95 6.805zM23.641 2.525l.588 2.119c.152.547.58.975 1.127 1.127l2.119.588c.65.18.65 1.102 0 1.282l-2.119.588c-.547.152-.975.58-1.127 1.127l-.588 2.119c-.18.65-1.102.65-1.282 0l-.588-2.119c-.152-.547-.58-.975-1.127-1.127l-2.119-.588c-.65-.18-.65-1.102 0-1.282l2.119-.588c.547-.152.975-.58 1.127-1.127l.588-2.119C22.539 1.875 23.461 1.875 23.641 2.525z"></path>
                    </svg>
                </span>
            </h1>

            {/* Fashion Image Grid */}
            <div className="max-w-7xl mx-auto -mt-[100px]">
                <div className="grid-container">
                    {/* Orange Fashion - Top Left */}
                    <div className="grid-item item-1 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42]">
                        <img
                            src="/fashion-orange.png"
                            alt="Fashion Orange"
                            className="image-fill"
                        />
                    </div>

                    {/* Colorful Fashion - Bottom Left */}
                    <div className="grid-item item-2 bg-gradient-to-br from-[#f4a261] to-[#e9c46a]">
                        <img
                            src="/fashion-colorful.png"
                            alt="Fashion Colorful"
                            className="image-fill"
                        />
                    </div>

                    {/* Green Fashion - Center Large */}
                    <div className="grid-item item-3 bg-gradient-to-br from-[#2d6a4f] to-[#40916c]">
                        <img
                            src="/fashion-green.png"
                            alt="Fashion Green"
                            className="image-fill"
                        />
                    </div>

                    {/* Yellow Fashion - Center */}
                    <div className="grid-item item-4 bg-gradient-to-br from-[#ffd60a] to-[#ffc300]">
                        <img
                            src="/fashion-yellow.png"
                            alt="Fashion Yellow"
                            className="image-fill"
                        />
                    </div>

                    {/* Blue Fashion - Right Center */}
                    <div className="grid-item item-5 bg-gradient-to-br from-[#457b9d] to-[#a8dadc]">
                        <img
                            src="/fashion-blue.png"
                            alt="Fashion Blue"
                            className="image-fill"
                        />
                    </div>

                    {/* Mint Fashion - Top Right */}
                    <div className="grid-item item-6 bg-gradient-to-br from-[#b7e4c7] to-[#95d5b2]">
                        <img
                            src="/fashion-mint.png"
                            alt="Fashion Mint"
                            className="image-fill"
                        />
                    </div>

                    {/* CTA Button */}
                    <div className="grid-item item-7 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center group cursor-pointer">
                        <div className="text-center px-6">
                            <span className="text-white text-xl font-semibold block mb-2 group-hover:scale-110 transition-transform">
                                Explore Collections
                            </span>
                            <span className="text-white/80 text-sm">→</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <footer className="mt-24 border-t border-gray-200 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8 py-12">
                    {/* Main Footer Content */}
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
                        {/* Brand */}
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold mb-2">
                                Thryft<span className="text-[#fc934d]">AI</span>
                            </h3>
                            <p className="text-gray-600 text-sm max-w-xs">
                                AI-powered fashion intelligence for your perfect style.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="flex gap-12">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Product</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="footer-link text-sm">Explore</a></li>
                                    <li><a href="#" className="footer-link text-sm">Outfit Builder</a></li>
                                    <li><a href="#" className="footer-link text-sm">Collections</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Company</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="footer-link text-sm">About</a></li>
                                    <li><a href="#" className="footer-link text-sm">Contact</a></li>
                                    <li><a href="#" className="footer-link text-sm">Blog</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
                        <p>© 2026 ThryfAI. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-[#fc934d] transition-colors">Privacy</a>
                            <a href="#" className="hover:text-[#fc934d] transition-colors">Terms</a>
                            <a href="#" className="hover:text-[#fc934d] transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    grid-auto-rows: 120px;
                    gap: 20px;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .grid-item {
                    border-radius: 24px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .grid-item:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
                }

                .image-fill {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .grid-item:hover .image-fill {
                    transform: scale(1.05);
                }

                /* Grid positioning - masonry style */
                .item-1 {
                    grid-column: 1 / 4;
                    grid-row: 1 / 4;
                }

                .item-2 {
                    grid-column: 1 / 4;
                    grid-row: 4 / 6;
                }

                .item-3 {
                    grid-column: 4 / 7;
                    grid-row: 2 / 7;
                }

                .item-4 {
                    grid-column: 7 / 10;
                    grid-row: 2 / 5;
                }

                .item-5 {
                    grid-column: 10 / 13;
                    grid-row: 1 / 5;
                }

                .item-6 {
                    grid-column: 10 / 13;
                    grid-row: 5 / 8;
                }

                .item-7 {
                    grid-column: 7 / 10;
                    grid-row: 5 / 7;
                }

                /* Responsive design */
                @media (max-width: 1024px) {
                    .grid-container {
                        grid-template-columns: repeat(6, 1fr);
                    }

                    .item-1 {
                        grid-column: 1 / 4;
                        grid-row: 1 / 3;
                    }

                    .item-2 {
                        grid-column: 4 / 7;
                        grid-row: 1 / 3;
                    }

                    .item-3 {
                        grid-column: 1 / 4;
                        grid-row: 3 / 6;
                    }

                    .item-4 {
                        grid-column: 4 / 7;
                        grid-row: 3 / 5;
                    }

                    .item-5 {
                        grid-column: 4 / 7;
                        grid-row: 5 / 8;
                    }

                    .item-6 {
                        grid-column: 1 / 4;
                        grid-row: 6 / 8;
                    }

                    .item-7 {
                        grid-column: 1 / 7;
                        grid-row: 8 / 10;
                    }
                }

                @media (max-width: 640px) {
                    .grid-container {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12px;
                    }

                    .item-1 { grid-column: 1 / 2; grid-row: 1 / 3; }
                    .item-2 { grid-column: 2 / 3; grid-row: 1 / 2; }
                    .item-3 { grid-column: 1 / 2; grid-row: 3 / 6; }
                    .item-4 { grid-column: 2 / 3; grid-row: 2 / 4; }
                    .item-5 { grid-column: 2 / 3; grid-row: 4 / 7; }
                    .item-6 { grid-column: 1 / 2; grid-row: 6 / 8; }
                    .item-7 { grid-column: 1 / 3; grid-row: 8 / 10; }
                }

                /* Footer Styles */
                .social-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #f3f4f6;
                    color: #4b5563;
                    transition: all 0.3s ease;
                }

                .social-icon:hover {
                    background: linear-gradient(135deg, #fc934d, #ff6b35);
                    color: white;
                    transform: translateY(-2px);
                }

                .footer-link {
                    color: #6b7280;
                    transition: all 0.3s ease;
                    position: relative;
                    display: inline-block;
                }

                .footer-link:hover {
                    color: #fc934d;
                    padding-left: 4px;
                }

                .newsletter-input {
                    padding: 12px 16px;
                    border: 2px solid #e5e7eb;
                    border-radius: 12px;
                    outline: none;
                    transition: all 0.3s ease;
                    min-width: 260px;
                }

                .newsletter-input:focus {
                    border-color: #fc934d;
                    box-shadow: 0 0 0 3px rgba(252, 147, 77, 0.1);
                }

                .newsletter-button {
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #fc934d, #ff6b35);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .newsletter-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(252, 147, 77, 0.3);
                }


                @media (max-width: 640px) {
                    .newsletter-input {
                        min-width: 100%;
                    }
                }

                /* Sparkle Gradient */
                .sparkle-gradient {
                    fill: url(#sparkle-gradient);
                }

                .sparkle-gradient path {
                    fill: #fc934d;
                    animation: sparkle-pulse 2s ease-in-out infinite;
                }

                @keyframes sparkle-pulse {
                    0%, 100% {
                        opacity: 1;
                        fill: #fc934d;
                    }
                    50% {
                        opacity: 0.7;
                        fill: #ff6b35;
                    }
                }
            `}</style>
        </div>
    )
}