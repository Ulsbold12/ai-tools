"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export function ImageCreatorTab() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setImageUrl(null);

    try {
      const response = await fetch("/api/image-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch {
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "generated-image.png";
    a.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image creator</CardTitle>
        <CardDescription>
          Describe an image, and AI will generate it for you.
        </CardDescription>
      </CardHeader>

      <CardContent className="text-muted-foreground text-sm space-y-4">
        <Textarea
          className="w-full h-28"
          placeholder="e.g. a futuristic city at sunset with flying cars"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex justify-end">
          <Button onClick={handleGenerate} disabled={!prompt.trim() || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate image"}
          </Button>
        </div>

        {imageUrl && (
          <div className="space-y-3">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full rounded-xl border object-cover"
            />
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={isLoading}>
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
