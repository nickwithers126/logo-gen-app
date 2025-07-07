'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ColorSchemeSelectorProps {
  colorScheme: string;
  setColorScheme: (value: string) => void;
  colors: string[];
  setColors: (colors: string[]) => void;
}

export default function ColorSchemeSelector({ colorScheme, setColorScheme, colors, setColors }: ColorSchemeSelectorProps) {

  const handleColorSchemeChange = (value: string) => {
    setColorScheme(value);
    const match = value.match(/\d+/); // extract number from "1 Color", "2 Colors", etc.
    const numColors = match ? parseInt(match[0]) : 0;

    if (numColors > 0) {
      setColors(new Array(numColors).fill('#000000'));
    } else {
      setColors([]);
    }
  };

  const updateColor = (index: number, value: string) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  return (
    <div className="grid w-full items-center gap-4">
      <div className="grid gap-2">
        <Label htmlFor="colorScheme">Color Scheme</Label>
        <Select value={colorScheme} onValueChange={handleColorSchemeChange} required>
          <SelectTrigger className="!h-8 w-full">
            <SelectValue placeholder="Select a color scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black-white">Black and White</SelectItem>
            <SelectItem value="1 Color">1 Color</SelectItem>
            <SelectItem value="2 Colors">2 Colors</SelectItem>
            <SelectItem value="3 Colors">3 Colors</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {colors.length > 0 && (
        <div className="flex gap-5">
          {colors.map((color, index) => (
            <div key={index} className="grid gap-1">
              <Label htmlFor={`color-${index}`}>{`Color ${index + 1}`}</Label>
              <Input
                type="color"
                id={`color-${index}`}
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                className="w-20 h-10 p-1 bg-transparent border border-[#444]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
