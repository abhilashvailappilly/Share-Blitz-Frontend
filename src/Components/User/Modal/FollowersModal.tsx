import  { FC } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface FollowersModalProps {
    setOpen: (open: boolean) => void;
  }
  
  // Define the functional component
  export const FollowersModal: FC<FollowersModalProps> = ({ setOpen }) => {
  const handleOpen = ( ) => setOpen(false);

  return (
    <>
     
      <Dialog
              open={true}
              handler={handleOpen}
              animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.9, y: -100 },
              }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Followers</DialogHeader>
        <DialogBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty-five years to get these plants, twenty-five years of
          blood, sweat, and tears, and I'm never giving up, I'm just getting
          started. I'm up to something. Fan luv.
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button
                      variant="text"
                      color="red"
                      onClick={handleOpen}
                      className="mr-1"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default FollowersModal;
