import { Box, Input } from '@mui/material';
import { useState } from 'react';
import Canvas from './components/Canvas/Canvas.component';
import ToolBar from './components/ToolBar/ToolBar.component';
import { StickyNoteType, StickyImageType, BoxType } from './types';
import Card from './components/Card/Card.component';

const App = () => {
  const [notes, setStickyNotes] = useState<StickyNoteType[]>([]);
  const [photos, setPhotos] = useState<StickyImageType[]>([]);
  const [currentColor, setCurrentColor] = useState('black');
  const [pencilWidth, setPencilWidth] = useState(2);
  const [toggleDownload, setToggleDownload] = useState(false);

  const handleRemove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    boxType: keyof typeof BoxType
  ) => {
    const parentElement = e.currentTarget.parentElement?.parentElement;
    const currentId = parentElement?.id;
    if (boxType === BoxType.stickyNote) {
      const updatedNotes = notes.filter((note) => note.id !== currentId);
      setStickyNotes(updatedNotes);
    } else if (boxType === BoxType.stickyImage) {
      const updatedImages = photos.filter((image) => image.id !== currentId);
      setPhotos(updatedImages);
    }
  };

  const handleMinimize = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    boxType: keyof typeof BoxType
  ) => {
    const parentElement = e.currentTarget.parentElement?.parentElement;
    const currentId = parentElement?.id;
    if (boxType === BoxType.stickyNote) {
      const updatedNotes = notes.map((note) => {
        if (note.id === currentId) {
          return {
            ...note,
            isMinimize: !note.isMinimize,
          };
        }
        return note;
      });
      setStickyNotes(updatedNotes);
    } else if (boxType === BoxType.stickyImage) {
      const updatedImages = photos.map((image) => {
        if (image.id === currentId) {
          return { ...image, isMinimize: !image.isMinimize };
        }
        return image;
      });
      setPhotos(updatedImages);
    }
  };

  return (
    <>
      <ToolBar
        setCurrentColor={setCurrentColor}
        setPencilWidth={setPencilWidth}
        setPhotos={setPhotos}
        setStickyNotes={setStickyNotes}
        setToggleDownload={setToggleDownload}
        notes={notes}
        pencilWidth={pencilWidth}
        photos={photos}
      />
      <>
        {notes && notes.length
          ? notes.map((note) => {
              return (
                <Card
                  element={note}
                  type='stickyNote'
                  handleMinimize={handleMinimize}
                  handleRemove={handleRemove}>
                  <Input
                    fullWidth
                    multiline={true}
                    maxRows={5}
                    minRows={3}
                    disableUnderline={true}
                    spellCheck={true}
                    sx={{
                      padding: '5px',
                      display: note.isMinimize ? 'none' : 'block',
                    }}
                  />
                </Card>
              );
            })
          : null}
      </>
      <>
        {photos && photos.length
          ? photos.map((imageSticky) => {
              return (
                <Card
                  element={imageSticky}
                  type='stickyImage'
                  handleMinimize={handleMinimize}
                  handleRemove={handleRemove}>
                  <Box
                    component={'img'}
                    src={imageSticky.imgUrl}
                    display={imageSticky.isMinimize ? 'none' : 'block'}
                    width={'100%'}
                  />
                </Card>
              );
            })
          : null}
      </>
      <Canvas
        color={currentColor}
        pencilWidth={pencilWidth}
        toggleDownload={toggleDownload}
      />
    </>
  );
};

export default App;
