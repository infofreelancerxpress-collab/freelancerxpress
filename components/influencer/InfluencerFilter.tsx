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
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "./data";

interface InfluencerFilterProps {
    onFilterChange?: (filters: Record<string, string>) => void;
}

export function InfluencerFilter({ onFilterChange }: InfluencerFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [audienceSize, setAudienceSize] = useState("");
    const [minEngagement, setMinEngagement] = useState([0]);
    const [searchQuery, setSearchQuery] = useState("");

    const applyFilters = () => {
        const filters: Record<string, string> = {};
        if (selectedCategory && selectedCategory !== "All Categories") filters.category = selectedCategory;
        if (selectedPlatforms.length === 1) filters.platform = selectedPlatforms[0];
        if (minEngagement[0] > 0) filters.minEngagement = minEngagement[0].toString();
        if (searchQuery) filters.search = searchQuery;

        // Map audience size to follower ranges
        if (audienceSize === "nano") { filters.minFollowers = "1000"; filters.maxFollowers = "10000"; }
        else if (audienceSize === "micro") { filters.minFollowers = "10000"; filters.maxFollowers = "100000"; }
        else if (audienceSize === "macro") { filters.minFollowers = "100000"; filters.maxFollowers = "1000000"; }
        else if (audienceSize === "mega") { filters.minFollowers = "1000000"; }

        onFilterChange?.(filters);
    };

    const resetFilters = () => {
        setSelectedCategory("");
        setSelectedPlatforms([]);
        setAudienceSize("");
        setMinEngagement([0]);
        setSearchQuery("");
        onFilterChange?.({});
    };

    const togglePlatform = (platform: string) => {
        setSelectedPlatforms((prev) =>
            prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
        );
    };

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
                        <FilterContent
                            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                            selectedPlatforms={selectedPlatforms} togglePlatform={togglePlatform}
                            audienceSize={audienceSize} setAudienceSize={setAudienceSize}
                            minEngagement={minEngagement} setMinEngagement={setMinEngagement}
                            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                            applyFilters={applyFilters} resetFilters={resetFilters}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden lg:block border rounded-xl p-6 bg-white dark:bg-slate-950 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground" onClick={resetFilters}>
                        Reset
                    </Button>
                </div>
                <FilterContent
                    selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                    selectedPlatforms={selectedPlatforms} togglePlatform={togglePlatform}
                    audienceSize={audienceSize} setAudienceSize={setAudienceSize}
                    minEngagement={minEngagement} setMinEngagement={setMinEngagement}
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    applyFilters={applyFilters} resetFilters={resetFilters}
                />
            </div>
        </div>
    );
}

interface FilterContentProps {
    selectedCategory: string; setSelectedCategory: (v: string) => void;
    selectedPlatforms: string[]; togglePlatform: (p: string) => void;
    audienceSize: string; setAudienceSize: (v: string) => void;
    minEngagement: number[]; setMinEngagement: (v: number[]) => void;
    searchQuery: string; setSearchQuery: (v: string) => void;
    applyFilters: () => void; resetFilters: () => void;
}

function FilterContent({ selectedCategory, setSelectedCategory, selectedPlatforms, togglePlatform, audienceSize, setAudienceSize, minEngagement, setMinEngagement, searchQuery, setSearchQuery, applyFilters }: FilterContentProps) {
    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="space-y-3">
                <Label className="font-semibold">Search</Label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
                <Label className="font-semibold">Category</Label>
                <div className="space-y-2">
                    {categories.slice(1, 6).map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                            <Checkbox id={`cat-${cat}`} checked={selectedCategory === cat} onCheckedChange={(checked) => setSelectedCategory(checked ? cat : "")} />
                            <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer text-muted-foreground">{cat}</Label>
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
                            <Checkbox id={`plat-${platform}`} checked={selectedPlatforms.includes(platform)} onCheckedChange={() => togglePlatform(platform)} />
                            <Label htmlFor={`plat-${platform}`} className="text-sm font-normal cursor-pointer text-muted-foreground">{platform}</Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Audience Size */}
            <div className="space-y-3">
                <Label className="font-semibold">Audience Size</Label>
                <Select value={audienceSize} onValueChange={setAudienceSize}>
                    <SelectTrigger><SelectValue placeholder="Any Size" /></SelectTrigger>
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
                    <span className="text-xs text-muted-foreground">{minEngagement[0]}%</span>
                </div>
                <Slider value={minEngagement} onValueChange={setMinEngagement} max={10} step={0.5} className="py-4" />
            </div>

            <Button className="w-full mt-4" onClick={applyFilters}>Apply Filters</Button>
        </div>
    );
}
