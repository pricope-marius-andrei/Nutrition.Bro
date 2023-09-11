'use client'

import SignUpComponent from "@components/sign-up"
import Provider from "@components/common/provider";
import "@styles/globals.css"

export default function SignUp()
{
    return (
        <Provider>
           <SignUpComponent></SignUpComponent>
        </Provider>
    )
}