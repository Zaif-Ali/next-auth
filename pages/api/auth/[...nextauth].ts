import checkUserExistence from '@/lib/UserExistance'
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { createUser } from '@/lib/CreateNewUser';
import type { NextAuthOptions } from 'next-auth';
import { IUser } from '@/types/Global';

export const authOptions: NextAuthOptions = {
    // Secret String for tokens 
    secret: process.env.NEXTAUTH_SECRET as string,
    // Providers 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID as string,
            clientSecret: process.env.GITHUB_SECRETKEY as string,
        }),

    ],

    // Session token 
    session: {
        strategy: 'jwt',
        maxAge: 3444,
    },
    // Callbacks functions 
    callbacks: {
        // When user signIn 
        signIn: async ({ user, email, profile }) => {
            const userEmail = email || (profile?.email as string);
            const userName = profile?.name as string || "";
            // Check user existance
            const { found, user: fetcheduser }: { found: boolean, user: IUser | null } = await checkUserExistence(userEmail as string);
            // if user was sign in first sigin
            if (!found) {
                const createdUser = await createUser(userEmail as string, userName, user.image as string);
                user.role = createdUser.role;
                user.emailVerified = createdUser.emailVerified;
                user.followers = createdUser.followers;
                user.following = createdUser.following;
                user.isVerified = createdUser.isVerified;
                return true;
            } else {
                // set user role in the user.role for acessing in the pages
                user.role = fetcheduser?.role as string;
                user.gender = fetcheduser?.gender as string;
                user.emailVerified = fetcheduser?.emailVerified as boolean;
                user.followers = fetcheduser?.followers as string[];
                user.following = fetcheduser?.following as string[];
                user.isVerified = fetcheduser?.isVerified as boolean;
                return true;
            }
        },
        // for setting the jwt tokens
        jwt: async ({ token, user }) => {
            if (user) {
                token.role = user.role;
                token.gender = user.gender;
                token.emailVerified = user.emailVerified;
                token.followers = user.followers;
                token.following = user.following;
                token.isVerified = user.isVerified;
                token.user = {
                    _id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                    image: user.image,
                    gender: user.gender,
                    emailVerified: user.emailVerified,
                    followers: user.followers,
                    following: user.following,
                    isVerified: user.isVerified,
                };
            }
            return token;
        },
        // setting the sessions
        session: async ({ session, token }) => {
            if (token) {
                session.user = token.user as any;
            }
            return session;
        },
    },

};

export default NextAuth(authOptions);
