import Tickets from "./Tickets";

interface props {
    user?: any;
}

export default function Admin({ user }: props){

    return(
        <div className="flex flex-col gap-4 p-4 sm:p-10 min-h-screen bg-slate-800">
            <span className="text-xl text-white font-bold">Panel de Administración - Bienvenido, {user?.username}</span>
            <Tickets isAdmin={true} />
        </div>
    )
}