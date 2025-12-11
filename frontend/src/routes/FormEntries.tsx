import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Chip,
  LinearProgress,
  Box,
  Typography,
  Tooltip,
  Container
} from "@mui/material";

const entriesFromDb = [
  {id: 11,
  form_id: 11,
  data:[],
  created_at: '2025-9-9',
  updated_at: '2025-9-9'},
 
  {id: 11,
    form_id: 11,
    data:[],
    created_at: '2025-9-9',
    updated_at: '2025-9-9'},
];







export default function FormEntriesTable({ entries}) {
  if (!entries) return <div>No entries</div>;

  

  return (
    <Container sx={{ minHeight: "100vh", mt: 4 }}>
    <TableContainer component={Paper}  >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Submit date</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
    
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
