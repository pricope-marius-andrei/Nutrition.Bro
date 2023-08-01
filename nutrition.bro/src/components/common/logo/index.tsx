export default function Logo(props:any)
{
    return (
        <a href="#" className="flex">
            <img src="./logo.svg" className="cursor-pointer inline-block align-middle w-10"></img>
            {
                props.style == "with-text" &&
                <div className="flex cursor-pointer my-auto text-black mx-5 text-2xl">
                    <h1 className="font-fredoka-semi-bold">NUTRITION.</h1>
                    <h1 className=" font-fredoka-regular">BRO</h1>
                </div>
            }
        </a>
    )
}