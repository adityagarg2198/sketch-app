export interface StickyNoteType {
  id: string;
  isMinimize: boolean;
}

export interface StickyImageType {
  id: string;
  imgUrl: string;
  isMinimize: boolean;
}

export enum BoxType {
  stickyNote = 'stickyNote',
  stickyImage = 'stickyImage',
}

export interface CardType {
  children: React.ReactNode;
  element: StickyNoteType | StickyImageType;
  type: keyof typeof BoxType;
  handleMinimize: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    boxType: keyof typeof BoxType
  ) => void;
  handleRemove: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    boxType: keyof typeof BoxType
  ) => void;
}
export interface CanvasType {
  color: string;
  pencilWidth: number;
  toggleDownload: boolean;
}
