'use client'
import { FaTicket } from "react-icons/fa6";
import { useRouter } from 'next/navigation'

export default function Logo(){
    const router = useRouter()
    const handleClick = (e:any) => {
        e.preventDefault()
        router.push('/')
    }
    return(
        <div onClick={handleClick} className="cursor-pointer  flex gap-2 justify-center items-center   ">
            <FaTicket className="fill-white h-10 w-10"/>
            <h1 className="font-bold md:text-2xl text-white">Ticket app</h1>
        </div>
    )
}