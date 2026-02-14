import Input from "../Input";
import Select from "../Select";
import TextField from "../TextField";
import Button from "../Button";
import { HiOutlinePlus } from "react-icons/hi";
import { useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { createTicket } from "../../services/tickets";

export default function AddTicket(){

    const PRIORITY = [{value:1,label: 'MUY BAJA'},{value:2,label: 'BAJA'}, {value:3,label: 'MODERADA'}, {value:4,label: 'ALTA'},{value:5,label: 'MUY ALTA'}]
    const CATEGORIAS = [{value:1,label: 'SOPORTE'}, {value:2,label: 'FACTURACION'}, {value:3,label: 'VENTAS'}, {value:4,label: 'RECLAMOS'}, {value:5,label: 'CONSULTAS'}, {value:6,label: 'TECNICO'}]

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "1",
        priority: "1"
    });

    const send = async () => {
        try {
            const data = await createTicket(formData);
            console.log(data);
            showToast.success("Ticket agregado correctamente" + data, {
                duration: 4000,
                progress: false,
                position: "top-right",
                transition: "bounceIn",
                icon: "",
                sound: true,
            });
            
            setFormData({
                title: "",
                description: "",
                category: "",
                priority: ""
            });            
        } catch (error) {
            console.error(error);
            showToast.error("Se produjo un error al agregar el ticket", {
                duration: 4000,
                progress: false,
                position: "top-right",
                transition: "bounceIn",
                icon: "",
                sound: true,
            });
        }
    };

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 mt-4">
                <Input name="title" description="Titulo" value={formData.title} onChange={(value) => handleChange("title", value)} />
                <TextField name="description" description="Descripción" value={formData.description} onChange={(value) => handleChange("description", value)} />
                <Select name="category" description="Categoría" options={CATEGORIAS.map((category) => ({value:category.value.toString(),label:category.label}))} value={formData.category} onChange={(value) => handleChange("category", value)} />
                <Select name="priority" description="Prioridad" options={PRIORITY.map((priority) => ({value:priority.value.toString(),label:priority.label}))} value={formData.priority} onChange={(value) => handleChange("priority", value)} />
            </div>

            <div className="flex flex-col gap-2 self-end">
                <Button action="Agregar" Icon={HiOutlinePlus} onClick={send} />
            </div>

        </div>
       
    )
}