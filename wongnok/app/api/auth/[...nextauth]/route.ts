import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getPrismaClient } from '@/app/components/prismaClient'

const prisma = getPrismaClient()

export const authOptions: AuthOptions = {
    providers: [ 
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Invalid Data");
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        image: user.image,
                    }
                } else {
                    throw new Error('Invalid email or password')
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username
                token.id = user.id
                token.role = user.role
                token.image = user.image
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.username = token.username as string
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.image = token.image as string
            }
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }