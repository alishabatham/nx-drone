import React, { useRef, useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Edit2, Camera, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  as: Tag = 'span',
  className = '',
  multiline = false,
}) => {
  const { isEditMode } = useAdmin();
  const textRef = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Synchronize DOM text with value
  useEffect(() => {
    if (textRef.current && textRef.current.innerText !== value) {
      textRef.current.innerText = value;
    }
  }, [value]);

  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  const handleBlur = () => {
    setIsEditing(false);
    if (textRef.current) {
      const newText = textRef.current.innerText.trim();
      if (newText && newText !== value) {
        onSave(newText);
      } else {
        textRef.current.innerText = value;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      textRef.current?.blur();
    }
    if (e.key === 'Escape') {
      if (textRef.current) textRef.current.innerText = value;
      textRef.current?.blur();
    }
  };

  return (
    <Tag
      ref={textRef as any}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      title="Click directly to edit in place"
      className={`${className} cursor-text transition-all duration-150 outline-none ${
        isEditing
          ? 'bg-orange-500/10 ring-2 ring-orange-500 rounded-sm px-1 py-0.5'
          : 'hover:ring-1 hover:ring-orange-400/80 hover:bg-orange-500/5 rounded-sm'
      }`}
    >
      {value}
    </Tag>
  );
};

interface EditableImageButtonProps {
  currentImage: string;
  onSaveImage: (newUrl: string) => void;
  className?: string;
}

export const EditableImageButton: React.FC<EditableImageButtonProps> = ({
  currentImage,
  onSaveImage,
  className = '',
}) => {
  const { isEditMode } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImage);

  const presetImages = [
    { label: 'Field Pilots', url: '/assets/showcase/field_pilots.jpg' },
    { label: 'Orthomosaic Map', url: '/assets/showcase/orthomosaic_map.jpg' },
    { label: 'Engineering Lab', url: '/assets/showcase/lab_engineering.jpg' },
    { label: 'Digital Twin 3D', url: '/assets/showcase/digital_twin.jpg' },
    { label: 'Survey Drone', url: '/assets/showcase/hero_drone.jpg' },
    { label: 'Industrial Inspection', url: '/assets/showcase/glance_industrial.jpg' },
  ];

  if (!isEditMode) return null;

  return (
    <div className={`relative z-20 ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-orange-600 text-white font-medium text-[11px] backdrop-blur-xs flex items-center gap-1.5 shadow-md border border-white/20 transition-all hover:scale-105"
        title="Change photo for this card"
      >
        <Camera className="w-3.5 h-3.5" />
        <span>Change Photo</span>
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-8 left-0 w-64 p-3 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 z-50 animate-in fade-in text-xs space-y-2.5"
        >
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>Change Card Photo</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">
              Image URL / Path
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-slate-50 font-mono"
              placeholder="/assets/..."
            />
          </div>

          <div>
            <span className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">
              Or pick preset:
            </span>
            <div className="grid grid-cols-2 gap-1">
              {presetImages.map((p) => (
                <button
                  key={p.url}
                  type="button"
                  onClick={() => {
                    setImageUrl(p.url);
                    onSaveImage(p.url);
                    setIsOpen(false);
                  }}
                  className="px-2 py-1 text-left text-[10px] truncate rounded-md bg-slate-100 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1 flex justify-end gap-1.5">
            <button
              type="button"
              onClick={() => {
                onSaveImage(imageUrl);
                setIsOpen(false);
              }}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-orange-500 text-white font-semibold text-[11px] transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

