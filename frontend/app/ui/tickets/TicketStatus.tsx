import { FaPaperPlane, FaSearch, FaLock, FaQuestion } from "react-icons/fa";

interface Props {
  state: number | string;
}

export default function TicketStatus({ state }: Props) {
  let label = "Desconocido";
  let colorClass = "bg-gray-400";
  let Icon = FaQuestion;

  // Ensure state is compared as a number if possible, or string
  const stateVal = Number(state);

  switch (stateVal) {
    case 1:
      label = "Enviado";
      colorClass = "bg-green-500";
      Icon = FaPaperPlane;
      break;
    case 2:
      label = "En Revisión";
      colorClass = "bg-yellow-500";
      Icon = FaSearch;
      break;
    case 3:
      label = "Cerrado";
      colorClass = "bg-gray-500";
      Icon = FaLock;
      break;
    default:
      break;
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 h-full w-full items-center justify-center text-white text-sm font-medium  ${colorClass}`}
    >
      <span>{label}</span>
      <Icon className="text-xs" />
    </div>
  );
}
