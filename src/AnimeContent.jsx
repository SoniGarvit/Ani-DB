import { useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
export default function AnimeContent(props) {

    const [expandedId, setExpandedId] = useState(null)

    const toggleFunction = (id) => {
        setExpandedId(prev => (prev === id ? null : id))
    }


    return <>
        <ul className=' md:my-6 lg:my-6 xl:my-6 xxl:my-6 grid md:grid-cols-2 grid-flow-row md:gap-3 lg:grid-cols-3'>
            {props.data.map((item, index) => {
                return <li key={nanoid + `${index}`} className=" flex flex-col py-2 px-3.5 mt-5 sm:mt-5 md:mt-0 bg-white rounded-md shadow-md shadow-gray-50 max-w-[450px] sm:flex-row sm:justify-center sm:items-center sm:gap-2 sm:p-4" >
                    <div className='flex  justify-center gap-2 sm:justify-start sm:flex-col  sm:align-middle'>
                        <img className="h-auto w-20 rounded-lg sm:w-24 md:w-28 lg:w-32" src={item.images.jpg.large_image_url} alt={`${item.title} anime`} />
                        <div className='flex flex-col items-center w-36 sm:items-start sm:justify-center'>
                            <span className=" text-[13px]  pt-1.5 sm:text-[15px]"> Title : {item.title_english ? item.title_english : item.title}</span>
                            <span className=" text-[13px]  pt-1.5 sm:text-[15px] "> {item.episodes === 1 ? `Duration : ${item.duration}` : `Episodes : ${item.episodes}`} </span>
                            <span className=' text-[13px] pt-1.5 font-semibold hover:cursor-pointer underline sm:text-[15px]'><a href={item.url}>More Details here</a></span>
                        </div>
                    </div>
                    <p className=' text-[13px] pt-2.5 italic flex flex-col sm:text-[15px]'>Synopsis : {expandedId === nanoid + `${index}` ? (item.synopsis ? item.synopsis.slice(0, -25) : "Not Available") : (item.synopsis ? item.synopsis.slice(0,250) : "Not Available")}  <span className={` ${!item.synopsis && "hidden"} cursor-pointer font-semibold`} onClick={() => toggleFunction(nanoid + `${index}`)} >{nanoid + `${index}` === expandedId ? "See Less" : "See More"}</span></p>

                </li>
            })}
        </ul>
    </>

}