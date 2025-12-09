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
  {
    id: 1,
    form_id: 1,
    data: '{"name":"Mario Rossi","age":30,"email":"mario@example.com","newsletter":true,"satisfaction":80}',
    created_at: "2025-12-09 14:22",
  },
  {
    id: 2,
    form_id: 1,
    data: '{"name":"Luca Bianchi","age":25,"email":"luca@example.com","newsletter":false,"satisfaction":60}',
    created_at: "2025-12-08 10:15",
  },
];

const parsedEntries = entriesFromDb.map((e) => ({
  ...e,
  responses: JSON.parse(e.data),
}));

type Entry = typeof parsedEntries[number];

interface FormEntriesTableProps {
  entries?: Entry[];
}

export default function FormEntriesTable({ entries = parsedEntries }: FormEntriesTableProps) {
  if (!entries.length) return <div>Nessuna risposta</div>;

  const columns = Object.keys(entries[0].responses);

  return (
    <Container sx={{ minHeight: "100vh", mt: 4 }}>
    <TableContainer component={Paper}  >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Data invio</TableCell>
            {columns.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.id}</TableCell>
              <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
              {columns.map((col) => {
                const value = entry.responses[col];

                if (typeof value === "boolean") {
                  return (
                    <TableCell key={col}>
                      <Chip label={value ? "Sì" : "No"} color={value ? "success" : "warning"} />
                    </TableCell>
                  );
                }

                if (typeof value === "number") {
                  const progress = Math.min(Math.max(value, 0), 100);
                  return (
                    <TableCell key={col}>
                      <Box sx={{ width: 100 }}>
                        <LinearProgress variant="determinate" value={progress} />
                      </Box>
                    </TableCell>
                  );
                }

                if (typeof value === "string" && value.length > 30) {
                  return (
                    <TableCell key={col}>
                      <Tooltip title={value}>
                        <Typography noWrap>{value}</Typography>
                      </Tooltip>
                    </TableCell>
                  );
                }

                return <TableCell key={col}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
