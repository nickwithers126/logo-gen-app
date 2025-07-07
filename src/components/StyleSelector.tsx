'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils'; // utility function from shadcn

const styleOptions = [
  'Minimal',
  'Futuristic',
  'Hand-drawn',
  'Bold',
  'Playful',
  'Elegant',
  'Geometric',
  'Abstract',
  'Retro',    
  'Tech',
  'Organic',
  'Brutalist',
  'Cyberpunk',
  'Pixelated'
];

interface StyleSelectorProps {
  selectedStyles: string[];
  setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function StyleSelector({ selectedStyles, setSelectedStyles }: StyleSelectorProps) {
  const maxStyles = 3;

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(prev => prev.filter(s => s !== style));
    } else if (selectedStyles.length < maxStyles) {
      setSelectedStyles(prev => [...prev, style]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm mb-1">Style (Select up to 3)</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full h-8 justify-start px-3 text-sm bg-[#181818] hover:bg-[#181818]">
            {selectedStyles.length > 0 ? (
              <span className="text-white">
                {selectedStyles.join(', ')}
              </span>
            ) : (
              <span className="text-muted-foreground">
                Select logo styles
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 bg-[#181818] border border-[#444] text-white">
          <div className="grid gap-2 max-h-64 overflow-y-auto">
            {styleOptions.map(style => {
              const isChecked = selectedStyles.includes(style);
              const isDisabled = !isChecked && selectedStyles.length >= maxStyles;

              return (
                <label
                  key={style}
                  className={cn(
                    'flex items-center space-x-2 cursor-pointer',
                    isDisabled && 'opacity-50 pointer-events-none'
                  )}
                >
                  <Checkbox
                    id={style}
                    checked={isChecked}
                    onCheckedChange={() => toggleStyle(style)}
                  />
                  <span className="text-sm">{style}</span>
                </label>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
