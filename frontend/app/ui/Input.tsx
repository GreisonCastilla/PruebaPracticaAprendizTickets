interface props{
    name:string;
    description:string;
    type?:string;
}

export default function Input({name, description, type="text"}:props){
    return(
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor={name} className="text-white font-extralight">{description}</label>
          <input id={name} name={name} type={type} 
          className="bg-white rounded outline-none p-1" />
        </div>

    )
}