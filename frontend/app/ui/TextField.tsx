interface props{
    name:string
    description:string
    value:string
    onChange: (value: string) => void
}

export default function TextField({name,description,value,onChange}:props){
    return(
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-white">{description}</label>
            <textarea className="resize-none outline-none p-2 rounded-md bg-white text-slate-800 h-30" name={name} id={name} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}