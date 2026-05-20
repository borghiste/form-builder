import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Button,
  Card,
  CardContent,
  Avatar,
  Badge,
  IconButton,
  Paper,
  Stack,
  Divider,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//stores
import { useInvitationsStore } from "../stores/useInvitationsStore";

// mui icons
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";


const roles = [
  {
    id: "viewer",
    label: "Viewer",
    description: "Can view, fill forms and submit filled forms",
    Icon: VisibilityOutlinedIcon,
  },
 
  {
    id: "admin",
    label: "Admin",
    description: "Full access control",
    Icon: AdminPanelSettingsOutlinedIcon,
  },
];

 

export default function InvitationPage() {
  const { getInvitations, invitations } = useInvitationsStore();
  useEffect(() => {
    getInvitations();
  }, [getInvitations]);
 
  
  



   

  
  const [emails, setEmails] = useState(["alex.rivera@company.com", "sarah.j@design.io"]);
  const [inputValue, setInputValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("editor");
  const [message, setMessage] = useState("");

  const addEmail = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const email = inputValue.trim().replace(/,$/, "");
      if (email && !emails.includes(email)) setEmails([...emails, email]);
      setInputValue("");
    }
  };

  const removeEmail = (email) => setEmails(emails.filter((e) => e !== email));

  return (
    
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          
        }}
      >

        {/* Main Layout */}
        <Box sx={{ maxWidth: 960, mx: "auto", px: 3, py: 6, display: "flex", gap: 3, alignItems: "flex-start", overflow:'scroll' }}>
          {/* Invite Card */}
          <Card elevation={0} sx={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#1a1a2e",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonAddAlt1Icon sx={{ color: "#fff", fontSize: 20 }} />
                </Box>
                <Typography variant="h5">Invite New Member</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Enter the email addresses of the people you want to invite.
              </Typography>

              {/* Email Field */}
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={1}
              >
                EMAIL ADDRESSES
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 1.5, borderRadius: 2, borderColor: "#e5e7eb", mb: 3, minHeight: 80 }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {emails.map((email) => (
                    <Chip
                      key={email}
                      label={email}
                      onDelete={() => removeEmail(email)}
                      size="small"
                      sx={{ bgcolor: "#f3f4f6", fontSize: 13 }}
                    />
                  ))}
                  <TextField
                    variant="standard"
                    placeholder="Add email..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={addEmail}
                    InputProps={{ disableUnderline: true, sx: { fontSize: 14, color: "#6b7280" } }}
                    sx={{ minWidth: 120, flex: 1 }}
                  />
                </Box>
              </Paper>

              {/* Role Selection */}
              <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                ASSIGN ROLE
              </Typography>
              <Stack direction="row" spacing={1.5} mb={3}>
                {roles.map(({ id, label, description, Icon }) => {
                  const active = selectedRole === id;
                  return (
                    <Box
                      key={id}
                      onClick={() => setSelectedRole(id)}
                      sx={{
                        flex: 1,
                        p: 2,
                        borderRadius: 2,
                        border: active ? "2px solid #4f46e5" : "2px solid #e5e7eb",
                        cursor: "pointer",
                        bgcolor: active ? "#eef2ff" : "#fff",
                        position: "relative",
                        transition: "all 0.15s",
                        "&:hover": { borderColor: active ? "#4f46e5" : "#c7d2fe" },
                      }}
                    >
                      {active && (
                        <CheckCircleOutlineIcon
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            fontSize: 18,
                            color: "#4f46e5",
                          }}
                        />
                      )}
                      <Icon sx={{ fontSize: 18, color: active ? "#4f46e5" : "#9ca3af", mb: 0.5 }} />
                      <Typography variant="body2" fontWeight={600} color={active ? "#4f46e5" : "text.primary"}>
                        {label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
                        {description}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>

              {/* Personal Message */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  PERSONAL MESSAGE
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Optional
                </Typography>
              </Box>
              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder="Write a short note to your new team members..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    fontSize: 14,
                    "& fieldset": { borderColor: "#e5e7eb" },
                    "&:hover fieldset": { borderColor: "#c7d2fe" },
                  },
                }}
              />

              {/* Actions */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{ borderColor: "#e5e7eb", color: "text.primary", "&:hover": { borderColor: "#9ca3af", bgcolor: "#f9fafb" } }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disableElevation
                 
                  sx={{ bgcolor: "cyan.main", "&:hover": { bgcolor: "#2d2d4e" } }}
                >
                  Send Invitation
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Pending Invites Panel */}
          <Card
            elevation={0}
            sx={{ width: 260, border: "1px solid #e5e7eb", borderRadius: 3, flexShrink: 0 }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={700} mb={2}>
                Pending Invites
              </Typography>
              <Stack spacing={2} divider={<Divider flexItem />}>
             
                {invitations?.map(({ email, status, created_at, role }) => (
                  
                  
                  
                  <Stack key={email} direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ width: 36, height: 36, fontSize: 13, fontWeight: 700 }}>
                      {email.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {created_at.slice(0, 10)}
                      </Typography>
                    </Box>
                    <Chip
                      label={role}
                      size="small"
                      sx={{
                        fontSize: '1rem',
                        
                        bgcolor: "background.paper",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                      />
                  </Stack>
                     
                ))}
              </Stack>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  mt: 2.5,
                  borderColor: "#e5e7eb",
                  color: "text.primary",
                  fontWeight: 600,
                  "&:hover": { borderColor: "#9ca3af", bgcolor: "#f9fafb" },
                }}
              >
                View All Pending
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    
  );
}