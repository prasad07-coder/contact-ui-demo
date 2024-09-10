import { Box, Typography } from "@mui/material";

const EmptyDataListOverlay = ({ message }: { message: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{message}</Typography>
    </Box>
  );
};

export default EmptyDataListOverlay;
