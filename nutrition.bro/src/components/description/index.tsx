export default function Description(props:any)
{
    return(
        <div className="w-full lg:p-36 md:p-28 sm:p-24 p-20 lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center font-fredoka-medium bg-gradient-to-r from-grass-green to-dark-grass text-white">
            {props.text}
        </div>
    )
}