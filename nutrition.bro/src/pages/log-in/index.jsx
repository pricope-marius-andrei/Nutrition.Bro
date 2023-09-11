'use client'

import LogInComponent from "@components/log-in"
import Provider from "@components/common/provider";
import "@styles/globals.css"

export default function SignUp()
{
    return (
        <Provider>
           <LogInComponent></LogInComponent>
        </Provider>
    )
}