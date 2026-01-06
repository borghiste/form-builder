import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Chip
} from '@mui/material';
import {
  Dashboard,
  Menu,
  RocketLaunch,
  DragIndicator,
  Security,
  Analytics
} from '@mui/icons-material';

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
 

      {/* Hero Section */}
      <Paper elevation={0} sx={{ py: 8, px: { xs: 2, md: 5 } }}>
        <Container maxWidth="md">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h2" component="h1" fontWeight="900" sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }}>
                  Building better connections, one form at a time.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
                  We simplify data collection for everyone from freelancers to enterprises, making it easier to connect with your audience meaningfully.
                </Typography>
              
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(19, 127, 236, 0.1) 0%, rgba(19, 127, 236, 0.2) 100%)',
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAaXvO7-X2HGkTk77RG4H7VNyFvVt8AabSARvL6tgauXtvainOVw0PPu_voP8PQX1vSuOPmWNHmM5ODOxiM-k2tdcPHVoo807CM05yQukwdnGKqRNn7JNaeNvs9ANvqqdIZI3FzeZvDvLsFKy-cggbvWzinDY5yRbxGr8VH-wQhOcr1Q0i1XhpPtpjJAmpK31OHvVUVe5Ojn3LVIluf8Y5dQI4pKMwZoturDKhBUxo0zAJsI3liWcHuR_2-r2n0nrYUVMEhH9DIOQ")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

    

      {/* Who We Are */}
      <Paper elevation={0} sx={{ py: 8, px: { xs: 2, md: 5 } }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Box>
              <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
                Who we are
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: 720 }}>
                FormBuilder is a dedicated tool designed to streamline the way you gather information. Whether you are conducting simple surveys or managing complex enterprise data pipelines, our platform adapts to your needs with ease and efficiency. We believe that technology should empower communication, not complicate it.
              </Typography>
            </Box>

            {/* Mission Card */}
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                p: 4,
                borderRadius: 3,
                bgcolor: 'rgba(19, 127, 236, 0.05)',
                border: '1px solid rgba(19, 127, 236, 0.1)'
              }}
            >
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
                  <RocketLaunch />
                  <Typography variant="caption" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Our Mission
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  Democratizing Data Collection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our mission is to make powerful form tools accessible and intuitive for everyone, regardless of technical skill. We strip away the complexity so you can focus on the answers that matter.
                </Typography>
              </Box>
              <Box
                sx={{
                  width: { xs: '100%', md: '33%' },
                  aspectRatio: { xs: '16/9', md: '1/1' },
                  borderRadius: 2,
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuACkyox7jBDzjfAPFVqa5hmi3P5uSkHSm6uDj_2SeTNJwvrf5UvIXz1N-asRgGPi1P868WJ89_R24NP3NFtR8wBFotGzpVupWWB98sZqXzmibFvR7gfZjOhGcYYeHkdzQk5tyVqpeVADzb6TS_LU1dDdOB9gLA8KrS4z69xpyl4Gtpbmo-achFSFSK6WQwnSDpWr29xkWETinkmXMvPjICL5CMcLJ2wzHL3fCiFm9tkhlezVQyMtARqe6d4NU49BzTwbQ9Xourr6qw")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </Paper>
          </Box>
        </Container>
      </Paper>

      {/* Features */}
      <Box sx={{ bgcolor: 'grey.50', py: 8, px: { xs: 2, md: 5 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto', mb: 5 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Why choose Formitekt?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Everything you need to create, share, and analyze forms without writing a single line of code.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {[
              { icon: <DragIndicator />, title: 'Drag & Drop Builder', desc: 'Create complex forms in minutes with our intuitive visual editor. What you see is exactly what you get.' },
              { icon: <Security />, title: 'Enterprise Security', desc: 'Your data is safe with us. We offer end-to-end encryption, GDPR compliance, and SSO integration.' },
              { icon: <Analytics />, title: 'Smart Analytics', desc: 'Get real-time insights with built-in charts and export capabilities to make data-driven decisions.' }
            ].map((feature, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card elevation={0} sx={{ height: '100%', border: 1, borderColor: 'divider', '&:hover': { boxShadow: 2 }, transition: 'box-shadow 0.3s' }}>
                  <CardContent>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(19, 127, 236, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                        mb: 2
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team */}
      <Paper elevation={0} sx={{ py: 8, px: { xs: 2, md: 5 }, borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 5 }}>
            Meet the Team
          </Typography>
          <Grid container spacing={4}>
            {[
              { name: 'Sarah Jenkins', role: 'CEO & Co-Founder', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgreLMZopfz6-qgYJKI7Q1smL_T5IJhLgmrJcfJJRbrx9_hXXyAkHXKtytG45Tz1FFXAP836Rux9glY-op4c2HAI6fFzXuqD1DHNgV9l6R3p8TQQx2GJ8XIswuoBNZChobz4UYDJWq-cDPd6ChODUqETcDZm3N1E_otBfpTZcuqyHLfiN8QCNYwUc5WinfbNmHyVNXDkNm5rLCoVAoK9caDfnzUoh2WEmfc8RcL_3EfWQ9z-fDx_2xXlYrhGVK9aXlBXeTXLTOLaM' },
              { name: 'David Chen', role: 'CTO & Co-Founder', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhA-klKnLHX26wkqtqYiIjviFxl-Qcd1-Imfg8sEjyesGC_odHmGXdRmiq2Yhu_xRShW-LY7bqQeZQtCeemuDN9SXzg-IBMp8UOomfsch5LE6aaYLEB6dBAGvMV-Swiix4TTLsnqGlnmBTSt0VuR0q77TIXFogtDVIRvf89AdN28KhbV4monTXLohrDL6cbHshJ1t44mpIVJ4rM5TnD0UtCJxJ4jUcO8fX5pRODiP-vqTJezDGcmHqu8ssVgZNYIJ3s4U_AEfd28s' },
              { name: 'Emily Rodriguez', role: 'Head of Design', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqf5tmL5qlHwqqpOP9Swl0YM5heYv10P-h-lNJjuy9Yv8WTZG8ulHRrc8qg_w-WG7436EszCdnKtBo_RmLCUH2-bt5gbEJdXsabR0TthOQXfVY22-G5zT7LhiFzQBv7EdpKUwDJESNwDfDEWJckwsZfpQpHMj-m1zphXvLgnajsjXXz3f2MDgd1D_P9V03UBJftmD2dxgOGwb8qWPXoV5buIYjXm_HbeIlcV6iinwf6YIMii8jXkQEFxAgWAm7UVorRM4uD0wp6VQ' },
              { name: 'Mark Thompson', role: 'Lead Developer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1122pnhwlLTw44BXSJicJApxT0cyu8H7DJXz76_f-4Pwe9B8213i78BeuZPgqM4IsCCMAwzd00wnjHMl9BXXKNblTHo6rVHUeTITOjq69H-GAY22k3DcC1gIvQy2eEnRCWCC6YpUBu5Eh1oc0KeRzg2J-8EbtOzlOfIn_BATjdFgLoe1umdtM4s2QkW-8JPXh-M0d5m4zxJd4p0zjQqeSu1KEgExFBf_dZP1m-KoVuG-s3wLPEwIIIgWppLqISZF6TGuAG7NuME8' }
            ].map((member, idx) => (
              <Grid item xs={6} sm={6} md={3} key={idx}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1.5 }}>
                  <Avatar
                    src={member.img}
                    sx={{
                      width: 128,
                      height: 128,
                      border: '2px solid transparent',
                      transition: 'border-color 0.3s',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>

      {/* CTA */}
      <Box sx={{ bgcolor: 'grey.50', py: 10, px: { xs: 2, md: 5 } }}>
        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 3 }}>
            <Typography variant="h3" fontWeight="900" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Ready to build your first form?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
              Join thousands of users who are creating better connections today.
            </Typography>
            <Button variant="contained" size="large" disableElevation sx={{ mt: 2, minWidth: 180, boxShadow: 4 }}>
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Paper elevation={0} sx={{ py: 4, px: 5, borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              © 2023 FormBuilder Inc. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {['Privacy Policy', 'Terms of Service', 'Twitter'].map((link) => (
                <Button key={link} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  {link}
                </Button>
              ))}
            </Box>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}