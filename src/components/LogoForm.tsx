'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StyleSelector from "@/components/StyleSelector";
import ColorSchemeSelector from "./ColorSchemeSelector";
import { useState } from "react";

export default function LogoForm({
  setImageUrl,
  setIsLoading,
  isLoading,
  imageUrl
}: {
  setImageUrl: (url: string) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  imageUrl: string;
}) {

  const [brandName, setBrandName] = useState('');
  const [logoType, setLogoType] = useState('');
  const [industry, setIndustry] = useState('');
  const [tagline, setTagline] = useState('');
  const [iconConcepts, setIconConcepts] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [colorScheme, setColorScheme] = useState('');
  const [colors, setColors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({
      brandName,
      logoType,
      industry,
      selectedStyles,
      colorScheme,
      colors,
      tagline,
      iconConcepts
    });

    const formData = new FormData(e.currentTarget);
    const payload = {
      brandName: formData.get('brandName'),
      logoType: formData.get('logoType'),
      industry: formData.get('industry'),
      styles: selectedStyles,
      colorScheme: colorScheme,
      colors: colors,
      tagline: formData.get('tagline'),
      iconConcepts: formData.get('iconConcepts')
    }

    try {
      const response = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("API Response:", data);
      if (Array.isArray(data.data) && data.data.length > 0) {
        setImageUrl(data.data[0].url);
      } else {
        console.error('No image data returned:', data);
      }
    } catch (error) {
      console.error('Error generating logo:', error);
    } finally {
      setIsLoading(false);
    };
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl min-w-sm md:w-md mx-auto p-6 bg-[#181818] rounded-xl shadow-lg text-white">

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input
          id="brandName"
          name="brandName"
          placeholder="Enter your brand name"
          required
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
      </div>


      <div className="grid w-full items-center gap-2">
        <Label htmlFor="logoType">Logo Type</Label>
        <Select
          name="logoType"
          required
          value={logoType}
          onValueChange={setLogoType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a logo type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="icon">Icon</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="icon-and-text">Icon & Text</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          name="industry"
          placeholder="Enter your brand’s industry"
          required
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>

      <StyleSelector
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
      />

      <ColorSchemeSelector
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
        colors={colors}
        setColors={setColors}
      />

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="tagline">
          Tagline or Slogan <span className="text-sm text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="tagline"
          name="tagline"
          placeholder="e.g. Just Do It"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="iconConcepts">Icon Concepts or Keywords</Label>
        <Input
          id="iconConcepts"
          name="iconConcepts"
          placeholder="e.g. mountain, crown, lightning"
          required
          value={iconConcepts}
          onChange={(e) => setIconConcepts(e.target.value)} />
      </div>

      <Button 
        type="submit" 
        className={`w-full text-white
          ${isLoading ? 'bg-red-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-[#306bd0]'}`}
          disabled={isLoading}
        >
        {imageUrl ? 'Regenerate Logo' : 'Generate Logo'}
      </Button>

    </form>
  );
}
