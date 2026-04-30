'use client';

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(value);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);

        // Create local preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        try {
            const formData = new FormData();
            formData.append("file", file);

            // We need to call the server action. 
            // Since this is a client component, we can import it or pass it.
            // Better to use the action directly if possible or fetch API.
            // But server actions in client components need to be imported.
            // Let's import the uploadImage action.
            // Dynamic import or passed as prop is better to avoid circular deps if any?
            // No, standard import is fine.

            const { uploadImage } = await import("@/app/actions/team");
            const res = await uploadImage(formData);

            if (res.success && res.data) {
                onChange(res.data);
            } else {
                console.error(res.error);
                // Revert preview on error?
            }
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = () => {
        onChange("");
        setPreview(null);
    };

    return (
        <div className="flex flex-col gap-4">
            {preview ? (
                <div className="relative aspect-square w-32 h-32 rounded-lg overflow-hidden border">
                    <Image
                        fill
                        src={preview}
                        alt="Profile Image"
                        className="object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg hover:bg-red-600 transition"
                        type="button"
                        disabled={disabled}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={disabled || isLoading}
                        className="cursor-pointer"
                    />
                </div>
            )}
        </div>
    );
}
