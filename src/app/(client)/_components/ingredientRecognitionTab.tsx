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

export const IngredientRecognitionTab = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: input.trim() }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setResult(data.ingredients);
    } catch {
      setResult("Error while detecting ingredients. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Ingredient recognition
        </CardTitle>
        <CardDescription>
          Describe the food, and AI will detect the ingredients.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm space-y-4">
        <Textarea
          className="w-full h-28"
          placeholder="e.g. chicken curry with potatoes"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!input.trim() || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Detecting..." : "Detect ingredients"}
          </Button>
        </div>

        {result && (
          <div className="space-y-2 mt-2">
            <div className="font-medium text-foreground">Ingredients</div>
            <div className="text-muted-foreground whitespace-pre-wrap">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
