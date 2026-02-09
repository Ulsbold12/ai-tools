"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ImageCreatorTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image creator</CardTitle>
        <CardDescription>Generate and download your images.</CardDescription>
      </CardHeader>

      <CardContent className="text-muted-foreground text-sm">
        Coming soon...
      </CardContent>
    </Card>
  );
}
