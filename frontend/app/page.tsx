'use client'

import Logo from "./ui/logo";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { CiLogin } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import Popup from "./ui/popups/Popup"
import Register from "./ui/popups/Register";

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-2 flex min-h-screen items-center justify-center bg-slate-800 font-sans dark:bg-black">
      <main className=" flex flex-col w-2xl bg-slate-600 items-center justify-center gap-4 p-5 md:p-10 rounded-2xl">
        
        <Logo/>

        <div className="flex flex-col gap-2 w-full">
          <Input name="user" description="Usuario"/>
          <Input name="password" type="password" description="Contraseña"/>
        </div>
        
        <div className="flex flex-col self-end-safe gap-2 md:flex-row">
          <Button action="Iniciar sesión" Icon={CiLogin}/>
          <Button onClick={() => setOpen(true)} action="Registrarse" Icon={MdAdd}/>
        </div>

        <Popup title="Registrar" isOpen={open} Content={Register} onClose={()=>setOpen(false)} />
        
      </main>
    </div>
  );
}
