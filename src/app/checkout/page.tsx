"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShoppingBag, CreditCard, ShieldCheck } from "lucide-react"

export default function CheckoutPage() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlePurchase = async () => {
        setIsProcessing(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:5207/api/Purchase?productId=1&userId=global-user', {
                method: 'POST',
                headers: {
                    'accept': 'text/plain'
                }
            })

            if (response.ok) {
                setIsSuccess(true)
            } else {
                const errorText = await response.text()
                setError(errorText || "Failed to complete purchase")
            }
        } catch (err) {
            setError("Server is not responding. Please try again.")
            console.error(err)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-4xl mx-auto px-4 mt-10">
                {!isSuccess ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column - Checkout Info */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-gray-100 rounded-3xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-amber-500 font-bold mb-1">
                                        <CreditCard className="w-5 h-5" />
                                        <span>Payment Information</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                                    <p className="text-gray-500 text-sm">Complete your purchase for: </p>

                                </div>
                                <div className="px-6 pb-6 space-y-4 pt-6">

                                    <div className="space-y-3 pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Selected User</span>
                                            <span className="font-medium">global-user</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Product ID</span>
                                            <span className="font-medium">#1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="md:col-span-1">
                            <div className="bg-gray-100 rounded-3xl shadow-lg sticky top-24 overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-lg font-bold">Order Summary</h2>
                                </div>
                                <div className="px-6 pb-6 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            <ShoppingBag className="w-8 h-8 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">Premium Item</p>
                                            <p className="text-xs text-gray-500">Product ID: 1</p>
                                        </div>
                                    </div>

                                    <hr className="border-gray-200" />

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span>$199.00</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Shipping</span>
                                            <span className="text-green-600 font-medium">FREE</span>
                                        </div>
                                        <div className="flex justify-between font-black text-xl pt-2 border-t border-gray-100 mt-2">
                                            <span>Total</span>
                                            <span className="text-amber-600">$199.00</span>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handlePurchase}
                                        disabled={isProcessing}
                                        className="cursor-pointer w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-14 rounded-2xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-gray-200 rounded-full animate-spin" />
                                                Processing...
                                            </div>
                                        ) : (
                                            "Complete Purchase"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Success View */
                    <div className="bg-white shadow-2xl max-w-xl mx-auto overflow-hidden rounded-3xl animate-in zoom-in-95 duration-500">
                        <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 w-full" />
                        <div className="pt-12 pb-12 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-800 mb-2">Purchase Success!</h2>
                            <p className="text-gray-500 max-w-sm">
                                Your order for Product #1 has been processed successfully.
                                Thank you for choosing ThryfAi.
                            </p>

                            <div className="mt-10 flex gap-4 w-full px-6">
                                <Button
                                    variant="outline"
                                    className="flex-1 h-12 rounded-xl border-gray-200 font-bold"
                                    onClick={() => setIsSuccess(false)}
                                >
                                    Back to Checkout
                                </Button>
                                <Button
                                    className="flex-1 h-12 rounded-xl bg-gray-900 hover:bg-black text-white font-bold"
                                    onClick={() => window.location.href = '/'}
                                >
                                    Continue Browsing
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
