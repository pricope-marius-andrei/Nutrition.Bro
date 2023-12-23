export default function ListItem(props)
{
    return (
        <div className="grid grid-cols-2">
            <div className="flex justify-center ">
                <span className="flex bg-white justify-center items-center md:w-32 md:h-32 w-24 h-24 md:text-6xl text-5xl text-center rounded-full outline-none outline-black md:outline-8 outline-4 mb-5 text-black">{props.id}</span>
            </div>
            <div className="flex items-center">
                {props.children}
            </div>
            {
                !props.finalItem &&
                <div className="flex">
                    <hr className="mx-auto outline-dashed outline-4 outline-black h-24 mb-5"></hr>
                </div>
            }
        </div>
    )
}