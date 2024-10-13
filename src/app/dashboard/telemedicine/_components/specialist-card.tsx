import { ReactNode } from "react";

function SpecialistCard({
  color,
  icon,
  title,
  description,
}: {
  color: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className={`${color} rounded-lg p-4`}>
      <div className="mb-2 text-3xl">{icon}</div>
      <h3 className="md:text-md mb-1 text-sm font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default SpecialistCard;
