'use server'
import { CartItem } from "@/types/cart"

export async function addItemToCart(data: CartItem) {
    return {
        success: true,
        message: "Item added to cart"
    }
}