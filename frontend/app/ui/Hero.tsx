"use client";
import Logo from "./logo";
import Button from "./Button";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function Hero(){
    const router = useRouter();

    const handleLogout = () => {
        if(typeof window !== "undefined"){
            localStorage.removeItem("access");
            router.push("/");
        }
    };

    return(
        <div className="flex align-middle items-center place-content-between px-10 w-full h-20 bg-slate-600">
            <Logo/>

            <Button Icon={CiLogout} action="Cerrar sesión" onClick={handleLogout}/>
        </div>
    )
}