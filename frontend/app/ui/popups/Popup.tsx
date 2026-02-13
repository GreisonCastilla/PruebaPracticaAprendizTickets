'use client'

import React from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  title:String
  isOpen: boolean;
  onClose: () => void;
  Content?: React.ReactNode;
}

export default function Popup({ title, isOpen, onClose, Content }: ModalProps){
    
    if (!isOpen) return null;

    return(
        <div className="cursor fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-slate-600 p-6 rounded-xl shadow-lg">
                <div className="w-full flex align-middle items-center place-content-between">
                    <span className="text-2xl text-white">
                        {title}
                    </span>
                    
                    <IoMdClose onClick={onClose} className="h-5 w-5 fill-white cursor-pointer"/>
                </div>

                {Content && <Content/>}

            </div>
        </div>

    )
}