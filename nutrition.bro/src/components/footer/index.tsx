import Logo from "../common/logo";

export default function Footer()
{
    return (
        <div className="flex justify-between bg-gradient-to-r from-grass-green to-dark-grass p-12">
            <div className="flex">
                <div className="ml-10 m-auto">
                    <Logo largeLogo={true} withText={false}/>
                </div>
                <div className="m-auto">
                    <ul className="text-white ml-10 md:text-xl text-lg font-fredoka-medium">
                        <li className="cursor-pointer">About us</li>
                        <li className="cursor-pointer">Contacts</li>
                        <li className="cursor-pointer">Terms & Conditions</li>
                        <li className="cursor-pointer">Privacy Policy</li>   
                    </ul>
                </div>
            </div>
            <div >
                <h1 className="text-white font-fredoka-medium text-xl mb-2">Newsletter</h1>
                <input placeholder="Enter your email" className="rounded-xl px-5 py-2 mb-4"></input>
                <div className="flex">
                    <img className="m-4 cursor-pointer" src="#"></img>
                    <img className="m-4 cursor-pointer" src="#"></img>
                    <img className="m-4 cursor-pointer" src="#"></img>
                </div>
            </div>
        </div>
    )
}