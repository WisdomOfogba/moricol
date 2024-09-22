import { cn } from "@/util/cn";

export default function LocationSVG({
  fill = "#E6F6FC",
  className,
}: {
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M12 13.0156C13.6569 13.0156 15 11.6725 15 10.0156C15 8.35877 13.6569 7.01562 12 7.01562C10.3431 7.01562 9 8.35877 9 10.0156C9 11.6725 10.3431 13.0156 12 13.0156Z"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.5 10.0156C19.5 16.7656 12 22.0156 12 22.0156C12 22.0156 4.5 16.7656 4.5 10.0156C4.5 8.0265 5.29018 6.11885 6.6967 4.71232C8.10322 3.3058 10.0109 2.51563 12 2.51562C13.9891 2.51563 15.8968 3.3058 17.3033 4.71232C18.7098 6.11885 19.5 8.0265 19.5 10.0156V10.0156Z"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
