import { HeartSVG } from "@/components/svgs";
import Link from "next/link";

const accountLinks = [
  { name: "My Orders", link: "/", icon: <OrderSvg /> },
  { name: "Saved Items", link: "/", icon: <HeartSVG className="h-5 w-5" /> },
  { name: "Addresses", link: "/", icon: <AddressBookSvg /> },
  { name: "Inbox", link: "/", icon: <Inbox /> },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-8 py-10">
      <div className="border-b border-[#D2D2D2] pb-3">
        <h1 className="shrink-0 text-lg font-semibold text-primary-500">
          Account
        </h1>
      </div>
      <div className="flex items-start gap-x-7 py-3.5">
        <aside className="w-[243px] shrink-0 rounded border border-[#CACACA] p-6">
          <ul className="grid gap-y-5">
            {accountLinks.map(({ name, link, icon }) => (
              <li key={link} className="border-b border-gray-300 pb-5 last:border-none last:pb-0">
                <Link
                  href={link}
                  className="flex items-center gap-x-2 text-sm text-primary-500"
                >
                  {icon}
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="grow">{children}</section>
      </div>
    </main>
  );
}

function OrderSvg() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5459 5.119L4.61561 2.35938H12.8945L14.9642 5.119M2.5459 5.119V14.7777C2.5459 15.1436 2.69127 15.4946 2.95004 15.7533C3.2088 16.0121 3.55976 16.1575 3.92571 16.1575H13.5844C13.9503 16.1575 14.3013 16.0121 14.5601 15.7533C14.8188 15.4946 14.9642 15.1436 14.9642 14.7777V5.119M2.5459 5.119H14.9642"
        stroke="#E29A13"
        stroke-width="1.37981"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.5144 7.87891C11.5144 8.6108 11.2236 9.31272 10.7061 9.83025C10.1886 10.3478 9.48663 10.6385 8.75474 10.6385C8.02284 10.6385 7.32092 10.3478 6.80339 9.83025C6.28586 9.31272 5.99512 8.6108 5.99512 7.87891"
        stroke="#E29A13"
        stroke-width="1.37981"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function AddressBookSvg() {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.20544 12.6776V15.6321H14.0237V0.859375H2.20544V3.81393M1.4668 10.4617H2.94407M1.4668 8.24576H2.94407M1.4668 6.02985H2.94407"
        stroke="#E29A13"
        stroke-width="1.47728"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.114 7.13815C8.92987 7.13815 9.59127 6.47675 9.59127 5.66087C9.59127 4.84499 8.92987 4.18359 8.114 4.18359C7.29812 4.18359 6.63672 4.84499 6.63672 5.66087C6.63672 6.47675 7.29812 7.13815 8.114 7.13815Z"
        stroke="#E29A13"
        stroke-width="1.47728"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.0693 12.31C11.0693 11.5264 10.758 10.7749 10.2039 10.2208C9.64981 9.66675 8.89831 9.35547 8.11471 9.35547C7.33111 9.35547 6.57961 9.66675 6.02553 10.2208C5.47144 10.7749 5.16016 11.5264 5.16016 12.31"
        stroke="#E29A13"
        stroke-width="1.47728"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function Inbox() {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9833 1.6875H4.3246C3.77584 1.68805 3.24972 1.90628 2.86169 2.29431C2.47367 2.68234 2.25543 3.20846 2.25488 3.75722V13.4159C2.25543 13.9646 2.47367 14.4908 2.86169 14.8788C3.24972 15.2668 3.77584 15.4851 4.3246 15.4856H13.9833C14.532 15.4851 15.0581 15.2668 15.4462 14.8788C15.8342 14.4908 16.0524 13.9646 16.053 13.4159V3.75722C16.0524 3.20846 15.8342 2.68234 15.4462 2.29431C15.0581 1.90628 14.532 1.68805 13.9833 1.6875ZM4.3246 3.06731H13.9833C14.1662 3.06749 14.3416 3.14024 14.4709 3.26958C14.6002 3.39892 14.673 3.5743 14.6732 3.75722V9.27646H12.9719C12.7447 9.27624 12.5211 9.33218 12.3208 9.43931C12.1205 9.54644 11.9498 9.70142 11.8239 9.89047L10.8539 11.3462H7.45263L6.48262 9.89047C6.35671 9.70142 6.18601 9.54644 5.98572 9.43931C5.78543 9.33218 5.56176 9.27624 5.33462 9.27646H3.63469V3.75722C3.63488 3.5743 3.70762 3.39892 3.83696 3.26958C3.96631 3.14024 4.14168 3.06749 4.3246 3.06731ZM13.9833 14.1058H4.3246C4.14168 14.1056 3.96631 14.0329 3.83696 13.9035C3.70762 13.7742 3.63488 13.5988 3.63469 13.4159V10.6563H5.33462L6.30463 12.112C6.43054 12.301 6.60123 12.456 6.80153 12.5631C7.00182 12.6703 7.22549 12.7262 7.45263 12.726H10.8539C11.081 12.7262 11.3047 12.6703 11.505 12.5631C11.7053 12.456 11.876 12.301 12.0019 12.112L12.9719 10.6563H14.6725V13.4159C14.6723 13.5988 14.5996 13.7742 14.4702 13.9035C14.3409 14.0329 14.1662 14.1056 13.9833 14.1058Z"
        fill="#E29A13"
      />
    </svg>
  );
}
