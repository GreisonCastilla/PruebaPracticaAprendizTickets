import Input from "../Input"

export default function Register(){

    return(
        <div className="flex flex-col p-2 gap-2">
            <Input name="usuario" description="Usuario"/>
            <Input name="contrasena" description="Contraseña"/>

        </div>
    )
}