"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ImageUpload } from "@/components/shared/ImageUpload";

const galleryFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

interface GalleryFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    category: string;
    imageUrl: string;
    link: string | null;
  };
}

export function GalleryForm({ mode, initialData }: GalleryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [link, setLink] = useState(initialData?.link ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      title,
      description,
      category,
      imageUrl,
      link,
    };

    const result = galleryFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0]?.toString();
        if (path) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const url =
        mode === "create"
          ? "/api/gallery"
          : `/api/gallery/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(
        mode === "create" ? "Gallery item created successfully!" : "Gallery item updated successfully!"
      );
      router.push("/dashboard/gallery");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/gallery">
          <Button type="button" variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === "create" ? "Create New Gallery Item" : "Edit Gallery Item"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="e.g., E-commerce Redesign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g., Web Design"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Image</Label>
            <ImageUpload 
              value={imageUrl} 
              onChange={(value) => setImageUrl(value)} 
            />
            {errors.imageUrl && (
              <p className="text-xs text-destructive">{errors.imageUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">External Link (Optional)</Label>
            <Input
              id="link"
              placeholder="https://example.com/case-study"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            {errors.link && (
              <p className="text-xs text-destructive">{errors.link}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href="/dashboard/gallery">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {mode === "create" ? "Create Project" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
