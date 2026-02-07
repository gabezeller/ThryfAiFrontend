
export default function Footer() {
    return (
            <footer className="mt-24 border-t border-gray-200 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
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

                    <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
                        <p>© 2026 ThryftAI. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-[#fc934d] transition-colors">Privacy</a>
                            <a href="#" className="hover:text-[#fc934d] transition-colors">Terms</a>
                            <a href="#" className="hover:text-[#fc934d] transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
