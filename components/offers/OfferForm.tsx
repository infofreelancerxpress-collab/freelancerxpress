"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceSelector } from "@/components/offers/ServiceSelector";
import { toast } from "sonner";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

const offerFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  discountPercentage: z.number().min(0, "Must be at least 0").max(100, "Must be at most 100"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  isActive: z.boolean(),
  serviceIds: z.array(z.string()).min(1, "At least one service must be selected"),
});

interface OfferFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    description: string;
    discountPercentage: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    services: { serviceId: string }[];
  };
}

export function OfferForm({ mode, initialData }: OfferFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [discountPercentage, setDiscountPercentage] = useState(
    initialData?.discountPercentage?.toString() ?? ""
  );
  const [startDate, setStartDate] = useState(
    initialData?.startDate ? initialData.startDate.slice(0, 10) : ""
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate ? initialData.endDate.slice(0, 10) : ""
  );
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [serviceIds, setServiceIds] = useState<string[]>(
    initialData?.services?.map((s) => s.serviceId) ?? []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      title,
      description,
      discountPercentage: parseFloat(discountPercentage),
      startDate,
      endDate,
      isActive,
      serviceIds,
    };

    const result = offerFormSchema.safeParse(formData);
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
          ? "/api/offers"
          : `/api/offers/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

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
        mode === "create" ? "Offer created successfully!" : "Offer updated successfully!"
      );
      router.push("/dashboard/offers");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/offers">
          <Button type="button" variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === "create" ? "Create New Offer" : "Edit Offer"}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Offer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Starter Bundle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this offer includes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <Label htmlFor="discount">Discount Percentage</Label>
            <Input
              id="discount"
              type="number"
              min={0}
              max={100}
              placeholder="e.g., 20"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
            />
            {errors.discountPercentage && (
              <p className="text-xs text-destructive">{errors.discountPercentage}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {errors.startDate && (
                <p className="text-xs text-destructive">{errors.startDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {errors.endDate && (
                <p className="text-xs text-destructive">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="isActive" className="text-sm font-medium">
                Active Status
              </Label>
              <p className="text-xs text-muted-foreground">
                When active, this offer will be visible to users.
              </p>
            </div>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bundle Services</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceSelector selectedIds={serviceIds} onChange={setServiceIds} />
          {errors.serviceIds && (
            <p className="text-xs text-destructive mt-2">{errors.serviceIds}</p>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Link href="/dashboard/offers">
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
          {mode === "create" ? "Create Offer" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
