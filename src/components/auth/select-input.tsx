import Image from "next/image";
import chevronDown from "../../../public/icons/chevron-down.svg";

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  icon?: React.ReactNode;
  name: string;
  children: React.ReactNode;
};

export default function SelectInput({
  label,
  icon,
  name,
  children,
  ...props
}: SelectInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-grey-800 mb-2.5 inline-block font-medium"
      >
        {label}
      </label>

      <div className="text-grey-500 relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2">{icon}</div>
        <select
          className={`w-full appearance-none py-2.5 pl-11 placeholder:font-light focus:outline-none ${
            icon === undefined && "pl-3.5"
          } border-grey-400 rounded-lg border pr-3.5`}
          id={name}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          <Image src={chevronDown} alt="Chevron down icon" />
        </div>
      </div>
    </div>
  );
}
