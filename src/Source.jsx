import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SourceContext } from "./SourceContext";

const Source = () => {
  const { source, handleSourceChange } = useContext(SourceContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const fetchSource = () => {
    setIsLoading(true);
    setError(null);
    fetch(value)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kaynak dosyası indirilemedi!");
        }
        return response.text();
      })
      .then((text) => {
        handleSourceChange(text);
        setIsLoading(false);
        setError(null);
        alert("Kaynak indirildi!");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Kaynak</CardTitle>
        <CardDescription>Kaynağı güncelle</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input"
            placeholder="https://"
          />
          <Button type="button" onClick={fetchSource} disabled={isLoading}>
            {isLoading ? "Yükleniyor" : "İndir"}
          </Button>
          {error && <div className="error">{error}</div>}
        </div>
        <div>
          {source?.data?.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Kaynak dosya {source?.data?.length} satırdan oluşuyor.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default Source;
