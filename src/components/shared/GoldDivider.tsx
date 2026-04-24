'use client';

import React from 'react';

interface Props {
  className?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const spacingMap = {
  none: '',
  sm:   'my-4',
  md:   'my-8',
  lg:   'my-14',
};

export default function GoldDivider({ className = '', spacing = 'md' }: Props) {
  return (
    <div className={`relative ${spacingMap[spacing]} ${className}`}>
      {/* Main gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      {/* Subtle glow below */}
      <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-gold-400/20 to-transparent mt-px" />
    </div>
  );
}
