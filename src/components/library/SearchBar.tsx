'use client';

import React from 'react';
import { Input } from '../ui/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="max-w-md w-full mx-auto mb-8">
      <Input
        label="Search Books"
        placeholder="Search by title or filename..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
