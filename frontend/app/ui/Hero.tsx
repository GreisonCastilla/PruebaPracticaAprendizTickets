import Logo from "./logo";
import Button from "./Button";
import { CiLogout } from "react-icons/ci";

export default function Hero(){

    return(
        <div className="flex align-middle items-center place-content-between px-10 w-full h-20 bg-slate-600">
            <Logo/>

            <Button Icon={CiLogout} action="Cerrar sesión"/>
        </div>
    )
}