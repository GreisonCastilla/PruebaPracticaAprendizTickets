
import Button from "../Button";
import { HiOutlinePlus } from "react-icons/hi";
import Popup from "../popups/Popup";   
import { useState } from "react";
import AddTicket from "../popups/AddTicket";

interface props{
    user:any
}


export default function Petitioner({user}:props){
const [open, setOpen] = useState(false);

    return(
        <div className="flex flex-col gap-4 p-10 h-screen bg-slate-800"  >
            <span className="text-xl text-white font-bold">Bienvenido, {user.username}</span>
        
            <div>
                <Button onClick={() => setOpen(true)} action="Crear ticket" Icon={HiOutlinePlus} />
            </div>
            <Popup
                title="Agregar ticket"
                isOpen={open}
                Content={AddTicket}
                onClose={() => setOpen(false)}
            />
        </div>

        
    )
}