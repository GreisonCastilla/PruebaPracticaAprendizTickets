import Input from "../Input"
import { MdAdd } from "react-icons/md";
import Button from "../Button";
import { useState } from "react";
import { register } from "@/app/services/register";
import { showToast } from "nextjs-toast-notify";

export default function Register(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const send = async ()=>{
        try{
            const data = await register(username, password);
            console.log(data);
            showToast.success("Se realizó el registro correctamente", {
                duration: 4000,
                progress: false,
                position: "top-right",
                transition: "bounceIn",
                icon: '',
                sound: true,
            });
            setPassword('')
            setUsername('')
        }catch(error){
            console.error(error);
            showToast.error("Se produjo un error al registrar", {
                duration: 4000,
                progress: false,
                position: "top-right",
                transition: "bounceIn",
                icon: '',
                sound: true,
            });
        }
    }

    return(
        <div className="flex flex-col p-2 gap-4">
            <div className="flex flex-col gap-2">
                <Input value={username} onChange={setUsername} name="usuario" description="Usuario"/>
                <Input value={password} onChange={setPassword} name="contrasena" type="password" description="Contraseña"/>
            </div>
            <div className="place-content-end w-full flex">
                <Button onClick={send} action="Registrarse" Icon={MdAdd}/>
            </div>
            
        </div>
    )
}