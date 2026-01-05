"use client";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ChangeEvent } from "react";

interface CustomPaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
}

export default function CustomPagination({page,setPage,totalPages}: CustomPaginationProps) {
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
  setPage(value);
  };

  return (
    <Stack spacing={2} className="mt-6 flex items-center">
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        color="secondary"
        shape="rounded"
        className="text-white"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "white",
            borderColor: "white",
          },
          "& .MuiPaginationItem-icon": {
            color: "white",
          },
        }}
      />
    </Stack>
  );
}