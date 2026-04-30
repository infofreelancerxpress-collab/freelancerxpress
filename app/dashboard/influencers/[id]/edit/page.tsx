"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { ImageUpload } from "@/components/team/image-upload";

const CATEGORIES = ["Fashion & Lifestyle","Tech & Gadgets","Fitness & Health","Food & Dining","Business & Entrepreneurship","Travel & Adventure","Gaming","Beauty & Makeup","Parenting & Family"];
const EXPERIENCE_LEVELS = ["Nano", "Micro", "Macro", "Mega"];
const PLATFORM_OPTIONS = ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn"];

interface PlatformEntry { name: string; handle: string; followers: string; link: string; }
interface PortfolioEntry { type: "image" | "youtube"; url: string; }

export default function EditInfluencerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: "", username: "", email: "", profilePhoto: "", category: "",
        location: "", bio: "", tags: [] as string[], priceRange: "",
        experienceLevel: "", verified: false, engagementRate: 0,
    });
    const [platforms, setPlatforms] = useState<PlatformEntry[]>([]);
    const [portfolio, setPortfolio] = useState<PortfolioEntry[]>([]);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        async function fetchInfluencer() {
            try {
                const res = await fetch(`/api/influencers/${id}`);
                const json = await res.json();
                if (json.success) {
                    const d = json.data;
                    setFormData({
                        name: d.name, username: d.username, email: d.email,
                        profilePhoto: d.profilePhoto, category: d.category,
                        location: d.location, bio: d.bio, tags: d.tags || [],
                        priceRange: d.priceRange, experienceLevel: d.experienceLevel,
                        verified: d.verified, engagementRate: d.engagementRate,
                    });
                    setPlatforms(Array.isArray(d.platforms) ? d.platforms : []);
                    setPortfolio(Array.isArray(d.portfolio) ? d.portfolio : []);
                } else {
                    toast.error("Influencer not found");
                    router.push("/dashboard/influencers");
                }
            } catch { toast.error("Failed to load influencer"); }
            finally { setIsFetching(false); }
        }
        fetchInfluencer();
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addTag = () => {
        const tag = tagInput.trim();
        if (tag && !formData.tags.includes(tag)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
            setTagInput("");
        }
    };
    const removeTag = (tag: string) => setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
    const addPlatform = () => setPlatforms((prev) => [...prev, { name: "Instagram", handle: "", followers: "", link: "#" }]);
    const removePlatform = (i: number) => setPlatforms((prev) => prev.filter((_, idx) => idx !== i));
    const updatePlatform = (i: number, field: keyof PlatformEntry, value: string) => {
        setPlatforms((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
    };

    const addPortfolioItem = () => setPortfolio((prev) => [...prev, { type: "image", url: "" }]);
    const removePortfolioItem = (i: number) => setPortfolio((prev) => prev.filter((_, idx) => idx !== i));
    const updatePortfolioItem = (i: number, field: keyof PortfolioEntry, value: string) => {
        setPortfolio((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`/api/influencers/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, platforms, portfolio }),
            });
            const json = await res.json();
            if (json.success) {
                toast.success("Influencer updated successfully!");
                router.push("/dashboard/influencers");
            } else {
                const msg = json.errors ? Object.values(json.errors).flat().join(", ") : json.message;
                toast.error(msg || "Failed to update");
            }
        } catch { toast.error("An error occurred"); }
        finally { setIsLoading(false); }
    };

    if (isFetching) {
        return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/influencers"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button></Link>
                <div><h1 className="text-3xl font-bold tracking-tight">Edit Influencer</h1><p className="text-muted-foreground">Update {formData.name}&apos;s profile</p></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Card><CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label htmlFor="name">Full Name *</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} required /></div>
                            <div className="space-y-2"><Label htmlFor="username">Username *</Label><Input id="username" name="username" value={formData.username} onChange={handleChange} required /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required /></div>
                            <div className="space-y-2"><Label htmlFor="location">Location *</Label><Input id="location" name="location" value={formData.location} onChange={handleChange} required /></div>
                        </div>
                        <div className="space-y-2">
                            <Label>Profile Photo *</Label>
                            <ImageUpload
                                value={formData.profilePhoto}
                                onChange={(value) => setFormData((prev) => ({ ...prev, profilePhoto: value }))}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2"><Label htmlFor="bio">Bio *</Label><Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} required /></div>
                    </CardContent>
                </Card>

                <Card><CardHeader><CardTitle>Classification</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Category *</Label>
                                <Select value={formData.category} onValueChange={(v) => setFormData((p) => ({ ...p, category: v }))}><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent></Select>
                            </div>
                            <div className="space-y-2"><Label>Experience Level *</Label>
                                <Select value={formData.experienceLevel} onValueChange={(v) => setFormData((p) => ({ ...p, experienceLevel: v }))}><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent>{EXPERIENCE_LEVELS.map((l) => (<SelectItem key={l} value={l}>{l}</SelectItem>))}</SelectContent></Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2"><Label htmlFor="priceRange">Price Range *</Label><Input id="priceRange" name="priceRange" value={formData.priceRange} onChange={handleChange} required /></div>
                            <div className="space-y-2"><Label htmlFor="engagementRate">Engagement Rate (%) *</Label><Input id="engagementRate" name="engagementRate" type="number" step="0.1" min="0" max="100" value={formData.engagementRate} onChange={(e) => setFormData((p) => ({ ...p, engagementRate: parseFloat(e.target.value) || 0 }))} required /></div>
                        </div>
                        <div className="flex items-center gap-3"><Switch id="verified" checked={formData.verified} onCheckedChange={(c) => setFormData((p) => ({ ...p, verified: c }))} /><Label htmlFor="verified">Verified Influencer</Label></div>
                    </CardContent>
                </Card>

                <Card><CardHeader><CardTitle>Tags</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2"><Input placeholder="Add a tag..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} /><Button type="button" variant="outline" onClick={addTag}>Add</Button></div>
                        <div className="flex flex-wrap gap-2">{formData.tags.map((tag) => (<span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">#{tag}<button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500"><X className="h-3 w-3" /></button></span>))}</div>
                    </CardContent>
                </Card>

                <Card><CardHeader><div className="flex items-center justify-between"><CardTitle>Platforms</CardTitle><Button type="button" variant="outline" size="sm" onClick={addPlatform}><Plus className="h-4 w-4 mr-1" />Add</Button></div></CardHeader>
                    <CardContent className="space-y-4">
                        {platforms.map((platform, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg">
                                <div className="space-y-1"><Label className="text-xs">Platform</Label><Select value={platform.name} onValueChange={(v) => updatePlatform(index, "name", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PLATFORM_OPTIONS.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}</SelectContent></Select></div>
                                <div className="space-y-1"><Label className="text-xs">Handle</Label><Input value={platform.handle} onChange={(e) => updatePlatform(index, "handle", e.target.value)} placeholder="@handle" /></div>
                                <div className="space-y-1"><Label className="text-xs">Followers</Label><Input value={platform.followers} onChange={(e) => updatePlatform(index, "followers", e.target.value)} placeholder="150K" /></div>
                                <div className="flex items-end">{platforms.length > 1 && <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => removePlatform(index)}><X className="h-4 w-4" /></Button>}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card><CardHeader><div className="flex items-center justify-between"><CardTitle>Portfolio</CardTitle><Button type="button" variant="outline" size="sm" onClick={addPortfolioItem}><Plus className="h-4 w-4 mr-1" />Add Item</Button></div></CardHeader>
                    <CardContent className="space-y-4">
                        {portfolio.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">No portfolio items added yet.</p>
                        ) : portfolio.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg">
                                <div className="space-y-1"><Label className="text-xs">Type</Label>
                                    <Select value={item.type} onValueChange={(v) => updatePortfolioItem(index, "type", v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="image">Image</SelectItem>
                                            <SelectItem value="youtube">YouTube Video</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1 md:col-span-2"><Label className="text-xs">URL</Label>
                                    {item.type === "image" ? (
                                        <div className="flex flex-col gap-2">
                                            <ImageUpload value={item.url} onChange={(url) => updatePortfolioItem(index, "url", url)} disabled={isLoading} />
                                        </div>
                                    ) : (
                                        <Input value={item.url} onChange={(e) => updatePortfolioItem(index, "url", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
                                    )}
                                </div>
                                <div className="flex items-end justify-end"><Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => removePortfolioItem(index)}><X className="h-4 w-4" /></Button></div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading} className="min-w-[140px]">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</> : "Save Changes"}</Button>
                    <Link href="/dashboard/influencers"><Button type="button" variant="outline">Cancel</Button></Link>
                </div>
            </form>
        </div>
    );
}
