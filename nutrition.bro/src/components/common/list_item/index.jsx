export default function ListItem(props)
{
    return (
        <div className="grid grid-cols-2">
            <div className="flex justify-center ">
                <span className="flex justify-center items-center w-32 h-32 text-6xl text-center rounded-full outline-none outline-black outline-8 mb-5 text-black">{props.id}</span>
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