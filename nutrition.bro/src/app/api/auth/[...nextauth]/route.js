import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDB from "@utils/database.js" 
import User from "@models/user"
import UserCredentials from "@models/userCredentials"
import bcrypt from "bcrypt"

const handler = NextAuth({
    
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials: {
                email: {label: "Email", type:"text", placeholder:"Email"},
                password: {label: "Password", type:"password"},
            },
            authorize : async function (credentials) {
                await connectToDB()
            
                if(!credentials.email || !credentials.password)
                {
                        throw new Error('Please enter an email and password')
                }
                const user = await UserCredentials.findOne({email:credentials.email});

                console.log(`User: ${user}`)

                if(!user )
                {
                    throw new Error('The email is not correct')
                }

                const thePasswordIsMatched = await bcrypt.compare(credentials.password,user.password);
                if(!thePasswordIsMatched)
                {
                    throw new Error('The password is not correct')
                }

                return user
            }
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: "/log-in",
    callbacks: {
        // async session({session}) 
        // {
        //         const sessionUser = await User.findOne({
        //             email:session.user.email
        //         })

        //         session.user.id = sessionUser._id.toString();

        //         return session;  
        // }
        // ,
        async signIn({profile, account})
        {
            if(account.provider === "google") {
                try {
                    await connectToDB();

                    //check if the user already exist
                    const userExist = await User.findOne({
                        email: profile.email
                    })

                    //if not create a new user
                    if(!userExist)
                    {
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", "").replace("-","").toLowerCase(),
                            image: profile.pictures
                        })
                    }
                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
            else if(account.provider === "credentials") {
                return true
            }
        }
    }
})

export {handler as GET, handler as POST}


