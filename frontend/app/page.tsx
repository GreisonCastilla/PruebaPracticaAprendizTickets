"use client";

import Logo from "./ui/logo";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { CiLogin } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import Popup from "./ui/popups/Popup";
import Register from "./ui/popups/Register";
import { showToast } from "nextjs-toast-notify";
import { login } from "./services/login";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //se hace la llamada a la api
  const send = async () => {
    try {
      const data = await login(username, password);
      console.log(jwtDecode(data.access));
      showToast.success("Se inicio sesión correctamente", {
        duration: 4000,
        progress: false,
        position: "top-right",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });
      localStorage.setItem("access", data.access);

      setPassword("");
      setUsername("");
      router.push("/tickets");
    } catch (error) {
      console.error(error);
      showToast.error("Se produjo un error al Iniciar sesión", {
        duration: 4000,
        progress: false,
        position: "top-right",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      router.push("/tickets"); // redirige si ya está logueado
    }
  }, []);

  return (
    <div className="p-2 flex min-h-screen items-center justify-center bg-slate-800 font-sans">
      <main className=" flex flex-col w-2xl bg-slate-600 items-center justify-center gap-4 p-5 md:p-10 rounded-2xl">
        <Logo />

        <div className="flex flex-col gap-2 w-full">
          <Input
            value={username}
            onChange={setUsername}
            name="user"
            description="Usuario"
          />
          <Input
            value={password}
            onChange={setPassword}
            name="password"
            type="password"
            description="Contraseña"
          />
        </div>

        <div className="flex flex-col self-end-safe gap-2 md:flex-row">
          <Button onClick={send} action="Iniciar sesión" Icon={CiLogin} />
          <Button
            onClick={() => setOpen(true)}
            action="Registrarse"
            Icon={MdAdd}
          />
        </div>

        <Popup
          title="Registrar"
          isOpen={open}
          Content={Register}
          onClose={() => setOpen(false)}
        />
      </main>
    </div>
  );
}
