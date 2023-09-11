import Provider from "@components/common/provider";
import ProfileComponent from "@components/profile"
import "@styles/globals.css"

export default function Profile()
{
    return( 
        <Provider>
            <ProfileComponent></ProfileComponent>
        </Provider>
    )
}