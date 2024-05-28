import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';



interface ReportReasonModalPropsInterface {
    submitFunction:(reason : string)=>void
    cancelFunction:()=> void
}

export default function ReportReasonModal({submitFunction,cancelFunction} :ReportReasonModalPropsInterface) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    cancelFunction()
  };

  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const reason = formJson.reason;
            submitFunction(reason);
          },
        }}
      >
        <DialogTitle>Report Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Type the reason to report the post
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="reason"
            name="reason"
            label="Reason"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" className='text-red-700'>Report</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
