import Logo from "../common/logo"
import Button from "../common/button"

export default function NavBar()
{
    return (
        <div className="flex place-content-between">
            <Logo style="with-text"/>
            <ul className="flex text-black mr-20 mt-12 items-center flex-row-reverse space-x-10 space-x-reverse text-3xl font-fredoka-light">
                <li className="cursor-pointer"><Button name="ACCOUNT"/></li>
                <li className="cursor-pointer">BLOGS</li>
                <li className="cursor-pointer">FOOD</li>
                <li className="cursor-pointer">HOME</li>
            </ul>
        </div>
    )
}