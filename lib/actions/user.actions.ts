'use server';

import { signInFormSchema } from "../validators/form";
import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signInWithCredentials(prevState: unknown, formaData: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formaData.get('email'),
            password: formaData.get('password'),
        })

        await signIn('credentials', user);



        return {
            success: true, message: 'Signed in successfully'
        }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return {
            success: false, message: 'Invalid email or password'
        }
    }
}

export async function signOutUser() {
    await signOut()
}