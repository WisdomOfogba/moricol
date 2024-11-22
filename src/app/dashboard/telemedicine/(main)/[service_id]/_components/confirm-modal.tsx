'use client'
import Button from "@/components/button";
import { Card, CardContent, CardFooter } from "@/components/card";
import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";

const ConfirmBookingModal = ({
  show,
  onClose,
  showSub,
}: {
  show: boolean;
  onClose: () => void;
  showSub: () => void;
}) => {
  const router = useRouter()
  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${show ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
    >
      <div
        className={`m-auto w-[90%] max-w-[600px] transform rounded-lg bg-white shadow-lg transition-transform ${show ? "scale-100" : "scale-95"
          }`}
      >
        <Card className="w-full overflow-hidden rounded-lg bg-white">
          <CardContent className="p-6 text-center">

            <h2 className="mb-2 text-xl font-semibold">
              Your upcoming virtual appointment with has
              been scheduled
            </h2>
            {/* <p className="mb-4 text-gray-600">
              22nd Wednesday, June 2023 at 12:30PM CAT
            </p> */}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 p-6 pt-0">
            <Button
              className="w-full bg-primary-500 text-white hover:bg-primary-600"
              onClick={() => {
                router.push(routes.TELEMEDICINE_APPOINTMENTS)
                onClose()
              }}
            >
              OKAY
            </Button>
            <Button
              variant="text"
              onClick={showSub}
              className="text-primary-500 hover:text-primary-600"
            >
              Set a Reminder
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmBookingModal;
