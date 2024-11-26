"use client";
import TextInput from "@/components/auth/text-input";
import Button from "@/components/button";
import PageToolBar from "@/components/dashboard/pharmacy-page-toolbar";
import FileInput from "@/components/file-input";
import { useRouter, useParams } from "next/navigation";
import { routes } from "@/constants/routes";
import { useState } from "react";
import { useSnackbar } from "notistack";

export interface PrescriptionParams {
  nin: string;
  name: string;
  fileName: string;
}
export default function Prescription() {
  const router = useRouter();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<PrescriptionParams>({
    fileName: "",
    name: "",
    nin: "",
  });
  // const [fileName, setFileName] = useState<string | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (data.name != "" && data.nin != "" && data.fileName != "") {
      if (data.nin.length != 11)
        enqueueSnackbar({
          variant: "error",
          message: "Invalid NIN! NIN should be 11 numbers",
        });
      else {
        localStorage.setItem("nin", JSON.stringify(data));
        console.log("Saved");
        router.push(routes.PHARMARCYPRODUCT + `/${id}`);
      }
    } else enqueueSnackbar({ variant: "error", message: "Enter all fields" });
  };
  const onUpload = (file: File): void => {
    setData({ ...data, fileName: file.name });
  };
  return (
    <main>
      <PageToolBar />

      <section className="gray-container my-10 px-12 py-6">
        <p className="mb-9 text-center">
          To continue with this drug, You will need to provide your NIN and
          prescription from doctors about this particular medication
        </p>

        <form>
          <div className="mb-8 grid gap-y-4">
            <TextInput
              value={data.nin}
              onChange={(e) => setData({ ...data, nin: e.target.value })}
              name=""
              label="Provide your NIN"
            />
            <TextInput
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              name=""
              label="Name of attachment"
            />
            <FileInput onUpload={onUpload} title="" />
          </div>
          <Button onClick={handleClick}>CONTINUE</Button>
        </form>
      </section>
    </main>
  );
}
