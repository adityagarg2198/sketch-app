import { Box } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import { CanvasType } from '../../types';

const Canvas: FC<CanvasType> = ({ color, pencilWidth, toggleDownload }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  let mouseDown = false;
  const canvas = canvasRef.current;
  const context = canvas?.getContext('2d');

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    mouseDown = true;
    const clientRect = canvas?.getBoundingClientRect();
    if (clientRect) {
      context?.beginPath();
      context?.moveTo(e.clientX - clientRect?.x, e.clientY - clientRect.y);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const clientRect = canvas?.getBoundingClientRect();
    if (mouseDown && context && clientRect) {
      context.lineTo(e.clientX - clientRect?.x, e.clientY - clientRect.y);
      context.stroke();
    }
  };

  useEffect(() => {
    if (canvas) {
      canvas.width = window.innerWidth - 0;
      canvas.height = window.innerHeight - 75;
    }
  }, [canvas]);

  useEffect(() => {
    if (toggleDownload && canvas) {
      const url = canvas.toDataURL('jpg', 1);
      if (downloadRef.current && toggleDownload) {
        downloadRef.current.href = url;
        downloadRef.current.download = 'board.jpg';
        downloadRef.current.click();
      }
    }
  }, [canvas, toggleDownload]);

  useEffect(() => {
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = pencilWidth;
    }
  }, [color, context, pencilWidth]);

  return (
    <>
      <Box
        component={'canvas'}
        id='canvas'
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={() => {
          mouseDown = false;
        }}
        onMouseMove={handleMouseMove}
      />
      <Box component={'a'} ref={downloadRef} display={'none'} />
    </>
  );
};

export default Canvas;
