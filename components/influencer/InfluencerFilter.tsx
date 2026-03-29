"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "./data";

export function InfluencerFilter() {
    const [priceRange, setPriceRange] = useState([0, 1000]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between lg:hidden mb-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full cursor-p">
                            <Filter className="w-4 h-4 mr-2" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Filter Influencers</SheetTitle>
                        </SheetHeader>
                        <FilterContent priceRange={priceRange} setPriceRange={setPriceRange} />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden lg:block border rounded-xl p-6 bg-white dark:bg-slate-950 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
                        Reset
                    </Button>
                </div>
                <FilterContent priceRange={priceRange} setPriceRange={setPriceRange} />
            </div>
        </div>
    );
}

function FilterContent({ priceRange, setPriceRange }: { priceRange: number[], setPriceRange: (val: number[]) => void }) {
    return (
        <div className="space-y-6">
            {/* Category */}
            <div className="space-y-3">
                <Label className="font-semibold">Category</Label>
                <div className="space-y-2">
                    {categories.slice(1, 6).map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                            <Checkbox id={`cat-${cat}`} />
                            <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer text-muted-foreground">
                                {cat}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Platform */}
            <div className="space-y-3">
                <Label className="font-semibold">Platform</Label>
                <div className="grid grid-cols-2 gap-2">
                    {['Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn'].map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                            <Checkbox id={`plat-${platform}`} />
                            <Label htmlFor={`plat-${platform}`} className="text-sm font-normal cursor-pointer text-muted-foreground">
                                {platform}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Follower Count */}
            <div className="space-y-3">
                <Label className="font-semibold">Audience Size</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Any Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="nano">Nano (1k - 10k)</SelectItem>
                        <SelectItem value="micro">Micro (10k - 100k)</SelectItem>
                        <SelectItem value="macro">Macro (100k - 1M)</SelectItem>
                        <SelectItem value="mega">Mega (1M+)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Engagement Rate */}
            <div className="space-y-4">
                <div className="flex justify-between">
                    <Label className="font-semibold">Min. Engagement</Label>
                    <span className="text-xs text-muted-foreground">{priceRange[0]}%</span>
                </div>
                <Slider
                    defaultValue={[1]}
                    max={10}
                    step={0.5}
                    className="py-4"
                />
            </div>

            <Button className="w-full mt-4">Apply Filters</Button>
        </div>
    );
}
