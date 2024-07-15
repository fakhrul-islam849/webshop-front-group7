import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
// import CustomIconButton from '../Buttons/IconButton/CustomIconButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/* {onClose ? (
        <CustomIconButton
          handleButton={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 24,
            top: 15,
            backgroundColor: 'action.disabled',
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <ClearIcon color="action.active" />
        </CustomIconButton>
      ) : null} */}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
function CustomModal({
  children,
  size = 'sm',
  title,
  open,
  setOpen,
  customClass = '',
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        className={customClass}
        maxWidth={size} // 'sm' || 'md' || 'lg' || 'xl'
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          sx={{
            backgroundColor: 'rgba(37, 120, 255, 0.05)',
          }}
          onClose={handleClose}
        >
          <Typography variant="h5" color="text.primary" component="span">
            {title}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>{children}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}
export default CustomModal;
