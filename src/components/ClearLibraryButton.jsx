import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ClearLibraryButton({ onClear }) {
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="error"
        size="small"
        style={{ marginLeft: "auto" }}
        onClick={() => setClearDialogOpen(true)}
      >
        Clear Library
      </Button>

      <Dialog open={clearDialogOpen}>
        <DialogTitle>Clear all books?</DialogTitle>
        <DialogContent>
          This will permanently delete your entire library.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onClear();
              setClearDialogOpen(false);
            }}
          >
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
