import React from "react";

type props = {
    onClick?: () => void;
    action:string;
    Icon:React.ComponentType;
}

export default function Button({onClick, action, Icon}:props){
    return(
        <div onClick={onClick} className="flex gap-2 align-middle p-1 px-2 bg-white rounded-sm border border-slate-600
        hover:bg-slate-600 hover:text-white hover:border-white cursor-pointer text-slate-600 
        transition-all duration-300  place-content-between h-fit">
            {action}
            <Icon className="h-5 w-5"/>
        </div>
        
    )
}