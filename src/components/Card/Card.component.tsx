import { Paper, Box } from '@mui/material';
import { FC } from 'react';
import { CardType } from '../../types';

const Card: FC<CardType> = ({
  children,
  element,
  handleMinimize,
  type,
  handleRemove,
}) => {
  return (
    <Paper
      sx={{
        width: '250px',
        position: 'absolute',
        top: '20%',
        left: '10%',
      }}
      key={element.id}
      id={element.id}>
      <Box
        sx={{
          backgroundColor: 'bisque',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
        display={'flex'}
        justifyContent={'flex-end'}
        columnGap={'5px'}
        padding={'4px'}>
        <Box
          width={'20px'}
          height={'20px'}
          borderRadius={'50%'}
          onClick={(e) => {
            handleMinimize(e, type);
          }}
          sx={{ backgroundColor: 'green' }}
        />
        <Box
          width={'20px'}
          height={'20px'}
          borderRadius={'50%'}
          onClick={(e) => {
            handleRemove(e, type);
          }}
          sx={{ backgroundColor: 'red' }}
        />
      </Box>
      {children}
    </Paper>
  );
};

export default Card;
