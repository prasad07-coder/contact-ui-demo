import { useState, useEffect } from "react";
import { Fade, Alert, Box } from "@mui/material";

const FadeOutAlert = ({
  message,
  status,
}: {
  message: string;
  status: string;
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {open && (
        <Box
          sx={{
            position: "fixed", // Fixes the position relative to the viewport
            bottom: 20, // Distance from the bottom
            left: "20%", // Center horizontally
            transform: "translateX(-20%)", // Center alignment adjustment
            zIndex: 1300, // Ensure it appears above other elements
          }}
        >
          <Fade in={open} timeout={{ enter: 500, exit: 1500 }}>
            <Alert
              severity={status === "success" ? "success" : "error"}
              onClose={() => setOpen(false)}
              variant="filled"
              sx={{ width: "400px" }}
            >
              {message}
            </Alert>
          </Fade>
        </Box>
      )}
    </>
  );
};

export default FadeOutAlert;
