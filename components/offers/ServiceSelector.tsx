"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string | null;
}

interface ServiceSelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function ServiceSelector({ selectedIds, onChange }: ServiceSelectorProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const toggleService = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-4 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading services...</span>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-2">
        No services found. Please create services first.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Select Services</Label>
        <Badge variant="secondary" className="text-xs">
          {selectedIds.length} selected
        </Badge>
      </div>
      <div className="grid gap-2 max-h-60 overflow-y-auto rounded-md border p-3">
        {services.map((service) => (
          <label
            key={service.id}
            className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <Checkbox
              checked={selectedIds.includes(service.id)}
              onCheckedChange={() => toggleService(service.id)}
              className="mt-0.5"
            />
            <div className="space-y-0.5">
              <span className="text-sm font-medium leading-none">
                {service.title}
              </span>
              {service.description && (
                <p className="text-xs text-muted-foreground">
                  {service.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
