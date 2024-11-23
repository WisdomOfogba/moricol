"use client";
import { LocationSVG, PhoneSVG, SingleUserSvg } from "@/components/svgs";
import EditOrAddAddress from "@/app/dashboard/pharmarcy/modals/edit-or-add-address";
import { AddressParams } from "../account/addresses/page";
import { useSnackbar } from "notistack";
import onlinePharmacyApi from "@/api/online-pharmacy";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Address(user: AddressParams) {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const router = useRouter();
  const setDefault = async () => {
    await onlinePharmacyApi
      .setDefaultAddress(session!, {
        //@ts-expect-error: there'll be id
        userid: session?.user.id,
        //@ts-expect-error: there'll be id
        addressid: user._id,
      })
      .then((res) => {
        // console.log(res);
        if (res.status_code == 200) {
          enqueueSnackbar("Set default address successfully!", {
            variant: "success",
          });
        }

        router.push("/dashboard/pharmarcy/account");
        // router.refresh();
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
        console.log(err);
      });
    // .finally(() => router.refresh());
  };
  return (
    <article>
      {user.show && (
        <h3 className="mb-5 border-b border-b-[#9F9FA0] pb-3.5 text-xs font-bold text-primary-500">
          {user.defaultaddress
            ? "Default Address"
            : user.index != null
              ? `Address ${user.index + 1}`
              : ""}
        </h3>
      )}

      <div className="flex items-center justify-between">
        <div className="grid gap-y-1.5 text-xs text-[#636985]">
          <p className="flex w-1/2 items-center gap-x-1 font-bold capitalize md:w-full">
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <SingleUserSvg />
            </span>
            {`${user.firstname} ${user.lastname}`}
          </p>
          <p className="flex items-center gap-x-1 capitalize">
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <LocationSVG fill="#E29A13" className="h-4 w-4" />
            </span>
            {`${user.address} | ${user.city} - ${user.state},${user.country} | ${user.postalcode}`}
          </p>
          <p className="flex items-center gap-x-1">
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <PhoneSVG />
            </span>
            +234 {user.phone}
          </p>
        </div>
        <div className="absolute right-6 -mt-16 flex gap-x-2 md:right-14 lg:right-20 lg:-mt-0">
          {!user.defaultaddress && (
            <button
              onClick={setDefault}
              className="w-24 rounded border border-[#9F9FA0] bg-primary-400 px-2 py-2 text-xs font-bold text-white"
            >
              Set Default
            </button>
          )}
          {user.show && (
            <EditOrAddAddress
              useraddress={user.address}
              firstname={user.firstname}
              lastname={user.lastname}
              phone={user.phone}
              country={user.country}
              city={user.city}
              state={user.state}
              postalcode={user.postalcode}
              email={user.email}
              addressid={user._id}
              title="Edit"
            />
          )}
        </div>
      </div>
    </article>
  );
}
