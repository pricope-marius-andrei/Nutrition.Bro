export default function Logo(props:any)
{
    let sizeLogo = props.largeLogo ? "object-contain cursor-pointer inline-block align-middle w-20" :
    "object-contain cursor-pointer inline-block align-middle w-10"
    return (
        <div className="flex">
            <img src="./icons/logo.svg" className={sizeLogo}></img>
            {
                props.style == "with-text" &&
                <div className="flex cursor-pointer my-auto text-black mx-5 text-2xl">
                    <h1 className="font-fredoka-semi-bold">NUTRITION.</h1>
                    <h1 className=" font-fredoka-regular">BRO</h1>
                </div>
            }
        </div>
    )
}