import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-row": {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  "& .MuiDataGrid-cell": {
    color: "#333333",
  },

  "& .MuiIconButton-root": {
    color: "#3f51b5",
  },
}));
