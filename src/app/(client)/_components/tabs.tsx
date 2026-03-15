"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageAnalysisTab } from "./imageAnalysisTab";
import { IngredientRecognitionTab } from "./ingredientRecognitionTab";
import { ImageCreatorTab } from "./imageCreateTab";

export const TabsDemo = () => {
  return (
    <Tabs defaultValue="analysis" className="w-145 mt-40">
      <TabsList>
        <TabsTrigger value="analysis">Image analysis</TabsTrigger>
        <TabsTrigger value="recognition">Ingredient recognition</TabsTrigger>
        <TabsTrigger value="creator">Image creator</TabsTrigger>
      </TabsList>

      <TabsContent value="analysis">
        <ImageAnalysisTab />
      </TabsContent>

      <TabsContent value="recognition">
        <IngredientRecognitionTab />
      </TabsContent>

      <TabsContent value="creator">
        <ImageCreatorTab />
      </TabsContent>
    </Tabs>
  );
};
