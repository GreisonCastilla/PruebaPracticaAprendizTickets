interface Props {
  priority: number | string;
}

export default function TicketPriority({ priority }: Props) {
  let label = "Desconocido";
  let colorClass = "bg-gray-400";

  const val = Number(priority);

  switch (val) {
    case 1:
      label = "Muy Baja";
      colorClass = "bg-green-500";
      break;
    case 2:
      label = "Baja";
      colorClass = "bg-lime-500"; // Slightly lighter/yellower green
      break;
    case 3:
      label = "Moderada";
      colorClass = "bg-yellow-500";
      break;
    case 4:
      label = "Alta";
      colorClass = "bg-orange-500";
      break;
    case 5:
      label = "Muy Alta";
      colorClass = "bg-red-500";
      break;
    default:
      break;
  }

  return (
    <div
      className={`flex items-center justify-center px-3 py-1 h-full w-full text-white text-xs font-bold uppercase ${colorClass}`}
    >
      <span>{label}</span>
    </div>
  );
}
