import { useContext, useState } from "react";
import scanImage from "./assets/scan.png";
import ScanModal from "./ScanModal";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { SourceContext } from "./SourceContext";

const Scan = () => {
  function wildcardToRegex(pattern) {
    const escaped = pattern.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&');
    const regexStr = '^' + escaped
      .replace(/\\\*/g, '.*')   // Convert * to .*
      .replace(/\\\?/g, '.')    // Convert ? to .
      + '(.+)?$'; // Match the rest of the string
    return new RegExp(regexStr, 'i'); // 'i' for case-insensitive search
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [barcode, setBarcode] = useState("");
  const { source } = useContext(SourceContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleScan = (code) => {
    if (!source) {
      alert("Kaynak dosyası bulunamadı!");
      return;
    }
    const searchBarcode = code || barcode;

    if (searchBarcode === "") {
      alert("Barkod boş olamaz!");
      return;
    }

    setIsLoading(true);

    const result = source?.data.filter((row) => {
      console.log(row);
      const rowData = row[0];
      console.log(rowData);
      console.log(wildcardToRegex(rowData));
      return wildcardToRegex(rowData).test(searchBarcode);
    });
    setIsModalOpen(false);
    setTimeout(() => {
      setResult(result);
      setIsLoading(false);
    }, 1000);
  };


  
  const handleClose = (barcode) => {
    setIsModalOpen(false);
    if (barcode) {
      setBarcode(barcode);
      handleScan(barcode);
    }
  };

  return (
    <div className="flex gap-4 flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Barkod Ara</CardTitle>
          <CardDescription>Uygun barkodu bul!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label="Tara!"
              className="cursor-pointer"
            >
              <img src={scanImage} height={36} width={36} alt="" />
            </button>
            <Input
              type="text"
              className="input"
              placeholder="Barkod"
              onChange={(e) => setBarcode(e.target.value)}
              value={barcode}
            />

            <Button disabled={isLoading} type="button" onClick={() => handleScan()}>
              Tara
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Sonuç</CardTitle>
            <CardDescription>Barkodun durumu</CardDescription>
          </CardHeader>
          <CardContent>
            {result === null ? (
              <div className="scan__result__content">
                Barkod bilgileri burada görünecek.
              </div>
            ) : null}
            {result?.length === 0 ? (
              <div className="scan__result__content">Barkod bulunamadı!</div>
            ) : null}
            {result ? (
              <div className="gap-2 flex flex-col">
                {result.map((row, index) => (
                  <Card key={index} className="scan__result__row">
                    <CardContent>
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex}
                          className={cellIndex === 0 ? "font-semibold" : ""}
                        >
                          {cell}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
      <ScanModal isOpen={isModalOpen} closeModal={handleClose} />
    </div>
  );
};
export default Scan;
