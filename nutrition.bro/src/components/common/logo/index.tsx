import Image from "next/image"

export default function Logo(props:any)
{
    let sizeLogo = props.largeLogo ? "object-contain cursor-pointer inline-block align-middle sm:min-w-[50px]" :
    "object-contain cursor-pointer inline-block align-middle min-h-fit"
    return (
        <div className="flex">
            <Image alt="nutrition.bro" width={50} height={50} src="./icons/logo.svg" className={sizeLogo}></Image>
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