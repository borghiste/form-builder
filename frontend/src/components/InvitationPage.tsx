import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Paper,
  Stack,
  Divider,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import BasicButton from "../components/UI/BasicButton";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import { useInvitationsStore, useInviteFormStore, useModalStore } from "../stores/index";
import { nanoid } from "nanoid";
import { Email } from "@mui/icons-material";

const roles = [
  { value: "viewer", label: "Viewer" },
  { value: "admin", label: "Admin" },
];

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function InvitationPage() {
  const { pendingInvitations, getInvitations } = useInvitationsStore();
  const { sendInvitations } = useInviteFormStore();
  const {setModalOpen, setModalMode} = useModalStore();

  useEffect(() => {
    getInvitations();
  }, []);

 
  const [entries, setEntries] = useState<{ id: string; email: string; role: string; message: string }[]>([]);
  const [localInput, setLocalInput] = useState("");
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  const addEmail = (raw: string) => {
    const val = raw.trim().toLowerCase();
    if (!val) {
      setInputError(true);
      return;
    }
    if (!isValidEmail(val)) { setInputError(true); return; }
    if (entries.find((e) => e.email === val)) { setLocalInput(""); return; }
    setEntries((prev) => [...prev, { id: nanoid(), email: val, role: "viewer", message }]);
    setLocalInput("");
    setInputError(false);
  };

  const removeEntry = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail(localInput);
      return;
    }
    if (e.key === "Backspace" && localInput === "" && entries.length > 0) {
      setEntries((prev) => prev.slice(0, -1));
    }
  };

  const handleSendInvitations = () => {
    if (entries.length === 0) {
      setInputError(true);
      return;
    }
    sendInvitations(entries)
    handleCancel();

  }
  const handleCancel = () => {
    setEntries([]);
    setLocalInput("");
    setMessage("");
    setInputError(false);
    setModalOpen(false);
    setModalMode(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Main Layout */}
      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 6 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >

        {/* Invite Card */}
        <Card elevation={0} sx={{ width: "100%", minWidth: 0, flex: 1, border: "1px solid #e5e7eb", borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {/* Header */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1.5}
              mb={0.5}
            >
              <Box sx={{ width: 40, height: 40, flexShrink: 0, bgcolor: "#1a1a2e", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PersonAddAlt1Icon sx={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{ minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                Invite new members
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Add the email addresses of the people you want to invite. You can assign them a role and write a personal message to include in the invitation email.
            </Typography>

            {/* Email input area */}
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              EMAIL ADDRESSES
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 2,
                borderColor: inputError ? "error.main" : "#e5e7eb",
                mb: entries.length > 0 ? 1.5 : 3,
                cursor: "text",
                "&:focus-within": { borderColor: inputError ? "error.main" : "#4f46e5" },
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                <TextField
                  variant="standard"
                  type="email"
                  placeholder="Add email addresses…"
                  value={localInput}
                  onChange={(e) => { setLocalInput(e.target.value); setInputError(false); }}
                  onKeyDown={handleKeyDown}
                  onBlur={() => { if (localInput) addEmail(localInput); }}
                  error={inputError}
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 13, color: inputError ? "error.main" : "#6b7280" },
                  }}
                  sx={{ minWidth: 200, flex: 1 }}
                  required
                />
                <BasicButton
                text='+'
                size='medium'
                color='gray.light'
                onClick={() => addEmail(localInput)}/>
              </Box>
            </Paper>
                
            {inputError && (
              <Typography variant="caption" color="error" sx={{ mb: 1.5, display: "block" }}>
                Please enter a valid email address.
              </Typography>
            )}

            {/* Per-email role list */}
            {entries.length > 0 && (
              <Stack spacing={1} mb={3}>
                {entries.map((entry) => (
                  <Box
                    key={entry.id}
                    sx={{
                      display: "flex", alignItems: "center", gap: 1.5,
                      bgcolor: "background.paper", border: "1px solid #e5e7eb",
                      borderRadius: 2, px: 1.5, py: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ flex: 1, fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {entry.email}
                    </Typography>
                    <Select
                      size="small"
                      value={entry.role}
                      onChange={(e) => setEntries((prev) => prev.map((el) => el.id === entry.id ? { ...el, role: e.target.value } : el))}
                      sx={{
                        fontSize: 12, minWidth: 100, flexShrink: 0,
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e5e7eb" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#c7d2fe" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4f46e5" },
                      }}
                    >
                      {roles.map((r) => (
                        <MenuItem key={r.value} value={r.value} sx={{ fontSize: 12 }}>
                          {r.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Tooltip title={`Remove ${entry.email}`}>
                      <IconButton size="small" onClick={() => removeEntry(entry.id)} sx={{ flexShrink: 0 }}>
                        <CloseIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}
              </Stack>
            )}

            {/* Personal Message */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="caption" color="text.secondary">PERSONAL MESSAGE</Typography>
              <Typography variant="caption" color="text.secondary">Optional</Typography>
            </Box>
            <TextField
              multiline rows={3} fullWidth
              placeholder="write a personal message to your invitees…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2, fontSize: 13,
                  "& fieldset": { borderColor: "#e5e7eb" },
                  "&:hover fieldset": { borderColor: "#c7d2fe" },
                  "&.Mui-focused fieldset": { borderColor: "#4f46e5" },
                },
              }}
            />

            {/* Actions */}
            <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
              <BasicButton text="cancel" variant="outline" onClick={handleCancel} />
              <BasicButton
                text="Send invitation"
                variant="contained"
                color="cyan.main"
                onClick={() => handleSendInvitations()}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Pending Invites */}
        <Card sx={{ width: { xs: "100%", md: "20rem" }, maxHeight: { xs: "15rem", md: '100%'},  border: "1px solid #e5e7eb", borderRadius: 3, flexShrink: 0 }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1.5}>
              Pending invites
            </Typography>
            <Stack
              divider={<Divider flexItem />}
              sx={{ maxHeight: { xs: "40vh", sm: "50vh", md: "calc(100vh - 180px)" }, overflowY: "auto", pr: 0.5 }}
            >
              {pendingInvitations?.map(({ email, time, role }) => (
                <React.Fragment key={email}>
                  <Stack direction="row" alignItems="center" spacing={1.5} py={1.25}>
                    <Avatar sx={{ width: 34, height: 34, fontSize: 12, fontWeight: 700 }}>
                      {email.slice(0, 2).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} fontSize={12} noWrap>{email}</Typography>
                      <Typography variant="caption" color="text.secondary" fontSize={11}>{time}</Typography>
                    </Box>
                    <Chip
                      label={role}
                      size="small"
                      sx={{ fontSize: 10, height: 20, fontWeight: 700, letterSpacing: "0.04em" }}
                    />
                  </Stack>
                </React.Fragment>
              ))}
            </Stack>
          
          </CardContent>
        </Card>

      </Box>
    </Box>
  );
}