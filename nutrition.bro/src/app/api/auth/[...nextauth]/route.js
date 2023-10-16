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
        async jwt({token, trigger, session, user})
        {
            if(trigger === "update")
            {
                return {...token, ...session.user}
            }

            return {...token, ...user}
        },
        async session({session}) 
        {
            //Credentials session
            if(!session.user.name) {
                const user = await UserCredentials.findOne({email:session.user.email});
                session.user = {
                ...session.user,
                id:user?.id.toString(),
                name:user.first_name + " " + user.last_name ,
                height:user?.height,
                weight:user?.weight,
                // food:user?.food,
                sessionName: "Credentials"
                }
            }
            //Google session
            else 
            {
                const user = await User.findOne({email:session.user.email});
                session.user = {
                    ...session.user,
                    measurements: {
                        height:user?.measurements?.height,
                        weight:user?.measurements?.weight,
                    },       
                    food: [] || []
                    ,
                    sessionName: "Google"
                }
            }
            return session;  
        }
        ,
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
                            image: profile.pictures,
                            measurements : {
                                height: 0,
                                weight: 0
                            },
                            food: []
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


