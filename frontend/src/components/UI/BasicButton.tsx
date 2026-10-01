


import React from 'react';
import Button from '@mui/material/Button';

type BasicButtonProps = {
  text: string;
  onClick?: () => void;
  href?: string;
  startIcon?: React.ReactNode;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'text';
  textColor?: string;
  width?: string | number;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  fontSize?: number | string;
  borderradius?: number | string;
};

export default function BasicButton({
  text,
  onClick,
  href,
  startIcon,
  color,
  size = 'medium',
  variant = 'contained',
  textColor,
  width,
  type,
  fullWidth,
  fontSize,
  borderradius,
}: BasicButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      startIcon={startIcon}
      type={type}
      href={href}
      sx={{
        backgroundColor: color,
        color: textColor,
        width,
        textAlign: 'center',
        margin: 0.5,
        textWrap: 'nowrap',
      }}
      fullWidth={fullWidth}
      fontSize={fontSize}
      borderRadius={borderradius}
    >
      {text}
    </Button>
  );
}
