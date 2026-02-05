"use client";

import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type OCRItem = { generated_text: string };
type CaptionerFn = (image: string) => Promise<OCRItem[]>;

export function TabsDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);

  const captionerRef = useRef<CaptionerFn | null>(null);

  const handleGenerate = async () => {
    if (!preview) return;

    setIsLoading(true);
    setResult("");

    try {
      if (!captionerRef.current) {
        setIsModelLoading(true);

        const { pipeline } = await import("@xenova/transformers");

        const captioner = (await pipeline(
          "image-to-text",
          "Xenova/trocr-base-handwritten",
        )) as unknown as CaptionerFn;

        captionerRef.current = captioner;
        setIsModelLoading(false);
      }

      const output = await captionerRef.current(preview);
      console.log("MODEL OUTPUT:", output);

      if (Array.isArray(output) && output.length > 0) {
        const text = output
          .map((x) => x?.generated_text ?? "")
          .join(" ")
          .trim();

        setResult(text || "No text detected.");
      } else {
        setResult("No text detected.");
      }
    } catch (err) {
      console.error(err);
      setResult("Error while generating.");
    } finally {
      setIsLoading(false);
      setIsModelLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file || !file.type.startsWith("image/")) {
      setSelectedFile(null);
      setPreview(null);
      setResult("");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult("");
  };

  const btnText = isModelLoading
    ? "Loading model..."
    : isLoading
      ? "Generating..."
      : "Generate";

  return (
    <Tabs defaultValue="analysis" className="w-145 mt-40">
      <TabsList>
        <TabsTrigger value="analysis">Image analysis</TabsTrigger>
        <TabsTrigger value="recongnition">Ingredient recongnition</TabsTrigger>
        <TabsTrigger value="creator">Image creator</TabsTrigger>
      </TabsList>

      <TabsContent value="analysis">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Image analysis
            </CardTitle>
            <CardDescription>
              Upload an image. (This OCR model reads text from images.)
            </CardDescription>
          </CardHeader>

          <CardContent className="text-muted-foreground text-sm">
            <div className="space-y-4">
              {/* Upload row */}
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer text-sm font-medium">
                  File
                </Label>

                <span className="text-sm text-muted-foreground">
                  {selectedFile ? selectedFile.name : "JPG, PNG"}
                </span>

                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="space-y-2">
                  <div className="w-64 h-64 overflow-hidden rounded-xl border">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-xs underline">
                    Remove
                  </button>
                </div>
              )}

              {/* Generate button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleGenerate}
                  disabled={!preview || isLoading || isModelLoading}>
                  {(isLoading || isModelLoading) && (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  )}
                  {btnText}
                </Button>
              </div>

              {/* Result */}
              <div className="mt-4 space-y-2">
                <div className="font-medium text-foreground">
                  Here is the summary
                </div>
                <div className="text-muted-foreground">
                  {result || "First, upload an image to recognize text."}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recongnition">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Ingredient recongnition
            </CardTitle>
            <CardDescription>
              Describe the food, and AI will detect the ingredient
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            <Textarea className="w-133 h-31" />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="creator">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download your detailed reports.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            You have 5 reports ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
