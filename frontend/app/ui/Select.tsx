interface props{
    name:string
    description:string
    options:any[]
    onChange: (value: string) => void
    value?: string
}

export default function Select({name,description,options,onChange, value}:props){
    return(
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-white">{description}</label>
            <select name={name} id={name} value={value} onChange={(e) => onChange(e.target.value)}
                className="p-2 rounded-md bg-white text-slate-800 outline-none
                transition-all duration-300 ease-in-out hover:bg-slate-200 hover:text-slate-800">
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}