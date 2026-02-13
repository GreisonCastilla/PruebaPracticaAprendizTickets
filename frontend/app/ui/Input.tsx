interface props{
    name:string;
    description:string;
    type?:string;
    value:string;
    onChange: (value: string) => void;

}

export default function Input({name, description, type="text", value, onChange}:props){
    return(
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor={name} className="text-white font-extralight">{description}</label>
          <input onChange={(e) => onChange(e.target.value)} id={name} name={name} 
          type={type} value={value} placeholder={description}
          className="bg-white rounded outline-none p-1" />
        </div>

    )
}