'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StyleSelector from "@/components/StyleSelector";

export default function LogoForm() {
  return (
    <form className="space-y-6 max-w-xl min-w-md mx-auto p-6 bg-[#181818] rounded-xl shadow-lg text-white">

      <h1 className="text-3xl font-bold">AI Logo Generator</h1>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input id="brandName" name="brandName" placeholder="Enter your brand name" required />
      </div>


      <div className="grid w-full items-center gap-2">
        <Label htmlFor="logoType">Logo Type</Label>
        <Select name="logoType" required>
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
        <Select name="industry" required>
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

      <StyleSelector />

    </form>
  );
}
