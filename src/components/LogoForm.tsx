'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StyleSelector from "@/components/StyleSelector";
import ColorSchemeSelector from "./ColorSchemeSelector";
import { useState } from "react";

export default function LogoForm() {

  const [brandName, setBrandName] = useState('');
  const [logoType, setLogoType] = useState('');
  const [industry, setIndustry] = useState('');
  const [tagline, setTagline] = useState('');
  const [iconConcepts, setIconConcepts] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [colorScheme, setColorScheme] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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
      colorScheme: formData.get('colorScheme'),
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

      <h1 className="text-3xl font-bold">AI Logo Generator</h1>

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
        <Select
          name="industry"
          required
          value={industry}
          onValueChange={setIndustry}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent side="bottom" className="max-h-64">
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="health-wellness">Health & Wellness</SelectItem>
            <SelectItem value="food-and-beverage">Food & Beverage</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="real-estate">Real Estate</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="sports-and-fitness">Sports & Fitness</SelectItem>
            <SelectItem value="art-and-design">Art & Design</SelectItem>
            <SelectItem value="travel-and-hospitality">Travel & Hospitality</SelectItem>
            <SelectItem value="automotive">Automotive</SelectItem>
            <SelectItem value="industrial-and-manufacturing">Industrial & Manufacturing</SelectItem>
            <SelectItem value="beauty-and-personal-care">Beauty & Personal Care</SelectItem>
            <SelectItem value="e-commerce">E-commerce</SelectItem>
            <SelectItem value="non-profit">Non-Profit</SelectItem>
          </SelectContent>
        </Select>
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

      <Button type="submit" className="w-full bg-[#3ba55d] text-white hover:bg-[#2e8b51]" >
        {isLoading ? 'Generating...' : 'Generate Logo'}
      </Button>

      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="Generated logo" className="rounded shadow-md" />
        </div>
      )}

    </form>
  );
}
