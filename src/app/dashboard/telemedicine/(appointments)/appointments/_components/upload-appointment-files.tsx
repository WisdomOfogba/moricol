"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSnackbar } from "notistack";
import FileInput from "@/components/file-input";
import telemedicineApi from "@/api/telemedicine";
import { Session } from "next-auth";
import uploadToCloudinary from "@/util/upload-to-cloudinary";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";

interface UploadAppointmentFilesProps {
    appointmentid: string;
}

const UploadAppointmentFiles = ({ appointmentid }: UploadAppointmentFilesProps) => {
    const { data: session } = useSession();
    const { enqueueSnackbar } = useSnackbar();
    const [uploaded, setUploaded] = useState(false);
    const [attachment, setAttachment] = useState("");
    const router = useRouter();

    const handleUpload = async (file: File, field: string, setLoading: ((loading: boolean) => void) | undefined) => {
        if (!attachment) {
            enqueueSnackbar("Please enter an attachment name", { variant: "error" });
            return;
        }
        try {
            setLoading && setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userid", session?.user?.id as string);
            formData.append("appointmentid", appointmentid);

            const url = await uploadToCloudinary(file);

            await telemedicineApi.uploadFiles({
                userid: session?.user?.id as string,
                appointmentid,
                userupload: [{ name: attachment, upload: url }],
                session: session as Session
            });

            enqueueSnackbar("File uploaded successfully", { variant: "success" });
            setAttachment("");
            router.refresh();
            setUploaded(true);
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Error uploading file", { variant: "error" });
        } finally {
            setLoading && setLoading(false);
        }
    };

    return (
        <div id="upload" className="px-4">
            <h3 className=" font-semibold">Upload Attachment (Lab report, prescription, etc)</h3>
            <p className="text-xs text-gray-500">This will help us understand your condition better</p>
            <br />
            <label className="pb-2 block" htmlFor="attachment">What are you uploading?</label>
            <Input type="text" name="attachment" placeholder="Enter attachment name" value={attachment} onChange={(e) => setAttachment(e.target.value)} />

            <FileInput
                title=""
                caption="Click to upload or drag and drop"
                acceptedFileTypes=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onUpload={handleUpload}
                uploaded={uploaded}
                field="attachment"
            />



        </div>
    );
};

export default UploadAppointmentFiles;