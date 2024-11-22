import { useEffect, useState } from "react";

const PDFFileSize = ({ pdfUrl }: {  pdfUrl: string; }) => {
  const [pdfSize, setPdfSize] = useState<string | unknown | null>(null);

  useEffect(() => {
    const fetchPDFSize = async () => {
      try {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch PDF file.");
        }
        const blob = await response.blob();
        if (blob.type !== "application/pdf") {
          throw new Error("File is not a valid PDF.");
        }
        const sizeMB = (blob.size / 1024 / 1024).toFixed(2);
        setPdfSize(sizeMB);
      } catch (error) {
        console.error("Error fetching PDF size:", error);
        setPdfSize("Error");
      }
    };

    fetchPDFSize();
  }, [pdfUrl]);

  return (
      <p>{pdfSize && pdfSize !== "Error" ? `${pdfSize} MB` : ""}</p>
  );
};

export default PDFFileSize;
