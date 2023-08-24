import Button from "@components/common/button";
import Provider from "@components/common/provider";
import Registration from "@components/registration";
import "@styles/globals.css"

export default function SignIn()
{
    return(
        <Provider>
            <Registration/>
        </Provider>
    )
}