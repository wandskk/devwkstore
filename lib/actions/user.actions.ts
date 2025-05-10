'use server';

import { signInFormSchema, signUpFormSchema } from "@/lib/validators/form";
import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma"

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

export async function signUpUser(prevState: unknown, formaData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formaData.get('name'),
            email: formaData.get('email'),
            password: formaData.get('password'),
            confirmPassword: formaData.get('confirmPassword'),
        })

        user.password = hashSync(user.password, 10);

        const plainPassword = user.password

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        })

        await (signIn('credentials', {
            email: user.email,
            password: plainPassword
        }))

        return {
            success: true, message: 'User regostered successfully'
        }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return {
            success: false, message: 'User was not registered'
        }
    }
}