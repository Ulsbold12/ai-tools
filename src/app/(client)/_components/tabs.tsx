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
import { ImageAnalysisTab } from "./imageAnalysisTab";
import { IngredientRecognnitionTab } from "./ingredientRecognitionTab";
import { ImageCreatorTab } from "./imageCreateTab";

export const TabsDemo = () => {
  return (
    <Tabs defaultValue="analysis" className="w-145 mt-40">
      <TabsList>
        <TabsTrigger value="analysis">Image analysis</TabsTrigger>
        <TabsTrigger value="recongnition">Ingredient recongnition</TabsTrigger>
        <TabsTrigger value="creator">Image creator</TabsTrigger>
      </TabsList>

      <TabsContent value="analysis">
        <ImageAnalysisTab />
      </TabsContent>

      <TabsContent value="recongnition">
        <IngredientRecognnitionTab />
      </TabsContent>

      <TabsContent value="creator">
        <ImageCreatorTab />
      </TabsContent>
    </Tabs>
  );
};
