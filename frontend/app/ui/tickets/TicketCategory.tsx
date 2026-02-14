interface Props {
  category: number | string;
}

export default function TicketCategory({ category }: Props) {
  let label = "Desconocido";

  const val = Number(category);

  switch (val) {
    case 1:
      label = "Soporte";
      break;
    case 2:
      label = "Facturación";
      break;
    case 3:
      label = "Ventas";
      break;
    case 4:
      label = "Reclamos";
      break;
    case 5:
      label = "Consultas";
      break;
    case 6:
      label = "Técnico";
      break;
    default:
      break;
  }

  return (
    <span className="text-white font-medium">
      {label}
    </span>
  );
}
