"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type OCRItem = { genetrated_text: string };
type CaptionerFn = (text: string) => Promise<OCRItem[]>;


export const IngredientRecognnitionTab = () => {
    
  return (
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
        <Textarea
          className="w-133 h-31"
          placeholder="e.g. chicken curry with potatoes"
        />
      </CardContent>
    </Card>
  );
};
