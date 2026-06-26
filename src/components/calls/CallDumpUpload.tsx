import { useState, useCallback } from "react";
import { Upload, FileUp, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import type { CreateCallDumpForm } from "@/types/calls";

interface CallDumpUploadProps {
  onUploadComplete?: (data: any) => void;
}

export function CallDumpUpload({ onUploadComplete }: CallDumpUploadProps) {
  const [form, setForm] = useState<CreateCallDumpForm>({
    dumpName: "",
    file: null as unknown as File,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        if (file.size <= 5 * 1024 * 1024) {
          setForm((prev) => ({ ...prev, file }));
        } else {
          toast.error("File size must be less than 5MB");
        }
      } else {
        toast.error("Please upload a CSV file");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        if (file.size <= 5 * 1024 * 1024) {
          setForm((prev) => ({ ...prev, file }));
        } else {
          toast.error("File size must be less than 5MB");
        }
      } else {
        toast.error("Please upload a CSV file");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.file || !form.dumpName) {
      toast.error("Please fill in all fields");
      return;
    }

    setStatus("uploading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("success");
          toast.success("Call dump uploaded successfully!");
          onUploadComplete?.({ dumpName: form.dumpName, file: form.file });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetForm = () => {
    setForm({ dumpName: "", file: null as unknown as File });
    setStatus("idle");
    setProgress(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Call Dump</CardTitle>
        <CardDescription>Upload a CSV file with call data</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dumpName">Dump Name</Label>
            <Input
              id="dumpName"
              value={form.dumpName}
              onChange={(e) => setForm((prev) => ({ ...prev, dumpName: e.target.value }))}
              placeholder="Enter dump name"
              disabled={status === "uploading" || status === "success"}
            />
          </div>

          {status !== "success" && (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {form.file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileUp className="h-10 w-10 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{form.file.name}</p>
                    <p className="text-sm text-gray-500">{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm((prev) => ({ ...prev, file: null as unknown as File }));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <p className="font-medium">Drag and drop CSV file here</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
                disabled={status === "uploading"}
              />
            </div>
          )}

          {status === "uploading" && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500 text-center">Uploading... {progress}%</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-medium">Upload successful!</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">Upload failed. Please try again.</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {status === "success" ? (
          <Button type="button" onClick={resetForm}>Upload Another</Button>
        ) : (
          <Button type="submit" onClick={handleSubmit} disabled={!form.file || !form.dumpName || status === "uploading"}>
            {status === "uploading" ? "Uploading..." : "Upload Dump"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
