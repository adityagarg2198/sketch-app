import {
  Draw,
  FormatColorFill,
  Rectangle,
  Download,
  AddPhotoAlternate,
  StickyNote2,
} from '@mui/icons-material';
import { BottomNavigation, Slider, Stack, Box, Input } from '@mui/material';
import React, { FC, useState } from 'react';
import ToggleButton from '../ToggleButton/ToggleButton.component';
import { nanoid } from 'nanoid';
import { StickyImageType, StickyNoteType } from '../../types';

const ToolBar: FC<{
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  setPencilWidth: React.Dispatch<React.SetStateAction<number>>;
  setToggleDownload: React.Dispatch<React.SetStateAction<boolean>>;
  setPhotos: React.Dispatch<React.SetStateAction<StickyImageType[]>>;
  setStickyNotes: React.Dispatch<React.SetStateAction<StickyNoteType[]>>;
  notes: StickyNoteType[];
  photos: StickyImageType[];
  pencilWidth: number
}> = ({
  setCurrentColor,
  setPencilWidth,
  setToggleDownload,
  setPhotos,
  setStickyNotes,
  notes,
  photos,
  pencilWidth
}) => {
  const [eraserWidth, setEraserWidth] = useState(2);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uniqueId = nanoid();
    const file = e?.target?.files?.[0];
    const imgUrl = file ? URL.createObjectURL(file) : '';
    const imageSticky: StickyImageType = {
      id: uniqueId,
      imgUrl,
      isMinimize: false,
    };
    setPhotos([...photos, imageSticky]);
  };

  const addStickyNote = (e: React.MouseEvent) => {
    e.preventDefault();
    const uniqueId = nanoid();
    const stickyNote: StickyNoteType = {
      id: uniqueId,
      isMinimize: false,
    };
    setStickyNotes([...notes, stickyNote]);
  };

  return (
    <BottomNavigation showLabels>
      <ToggleButton
        label='Pencil'
        type='popper'
        icon={<Draw />}
        children={
          <Slider
            defaultValue={3}
            value={pencilWidth}
            step={1}
            min={2}
            max={12}
            size='small'
            onChange={(_e, value) => {
              setPencilWidth(value as number);
            }}
            sx={{ color: '#4A6A88', width: '20rem' }}
          />
        }
      />
      <ToggleButton
        label='Pick Color'
        type='popper'
        icon={<FormatColorFill />}
        children={
          <Stack
            flexDirection={'row'}
            gap={'1rem'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Box
              width={'20px'}
              height={'20px'}
              borderRadius={'50%'}
              onClick={() => {
                setCurrentColor('black');
              }}
              sx={{ backgroundColor: 'black', cursor: 'pointer' }}
            />
            <Box
              width={'20px'}
              height={'20px'}
              borderRadius={'50%'}
              onClick={() => {
                setCurrentColor('red');
              }}
              sx={{ backgroundColor: 'red', cursor: 'pointer' }}
            />
            <Box
              width={'20px'}
              height={'20px'}
              borderRadius={'50%'}
              onClick={() => {
                setCurrentColor('blue');
              }}
              sx={{ backgroundColor: 'blue', cursor: 'pointer' }}
            />
          </Stack>
        }
      />
      <ToggleButton
        label='Eraser'
        type='popper'
        icon={<Rectangle />}
        onClick={() => {
          setCurrentColor('white');
        }}
        children={
          <Slider
            defaultValue={3}
            value={eraserWidth}
            step={1}
            min={2}
            size='small'
            onChange={(_e, value) => {
              setEraserWidth(value as number);
            }}
            max={12}
            sx={{ color: '#4A6A88', width: '20rem' }}
          />
        }
      />
      <ToggleButton
        label='Download'
        type='normal'
        onClick={() => {
          setToggleDownload(true);
          setTimeout(() => {
            setToggleDownload(false);
          }, 0);
        }}
        icon={<Download />}
      />
      <ToggleButton
        label='Add Image'
        type='normal'
        icon={<AddPhotoAlternate />}
        onClick={() => {
          document.getElementById('add-image')?.click();
        }}
        children={
          <Input
            type='file'
            sx={{ display: 'none' }}
            id='add-image'
            onChange={(e) => {
              handleImageUpload(e as React.ChangeEvent<HTMLInputElement>);
            }}
          />
        }
      />
      <ToggleButton
        label='Add Note'
        type='normal'
        icon={<StickyNote2 />}
        onClick={(e) => {
          addStickyNote(e);
        }}
      />
    </BottomNavigation>
  );
};

export default ToolBar;
