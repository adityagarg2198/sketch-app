import { BottomNavigationAction, Popover } from '@mui/material';
import { FC, useState } from 'react';

const ToggleButton: FC<{
  label: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  type: 'normal' | 'popper';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ label, children, icon, type, onClick }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <BottomNavigationAction
        label={label}
        icon={icon}
        showLabel
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          color: '#4A6A88',
          '& svg': {
            fontSize: '3rem',
          },
        }}
      />
      {type === 'popper' ? (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                padding: '1rem 2rem',
              },
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          {children}
        </Popover>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ToggleButton;
