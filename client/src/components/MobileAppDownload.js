import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
} from '@mui/material';
import {
  Android as AndroidIcon,
  Apple as AppleIcon,
  QrCode2 as QrCodeIcon,
} from '@mui/icons-material';

const MobileAppDownload = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const appStoreLinks = {
    ios: 'https://apps.apple.com/app/food-delivery-app/id1234567890',
    android: 'https://play.google.com/store/apps/details?id=com.fooddelivery.app',
    qrCode: 'https://fooddelivery.app/download',
  };

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Get Our Mobile App
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  Order food on the go with our mobile app. Available for iOS and Android devices.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Grow in timeout={1000} style={{ transitionDelay: '200ms' }}>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            transition: 'all 0.3s ease-in-out',
                          },
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<AppleIcon />}
                          sx={{
                            py: 1.5,
                            bgcolor: 'white',
                            color: 'black',
                            '&:hover': {
                              bgcolor: 'grey.100',
                            },
                          }}
                          onClick={() => window.open(appStoreLinks.ios, '_blank')}
                        >
                          Download for iOS
                        </Button>
                      </Paper>
                    </Grow>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grow in timeout={1000} style={{ transitionDelay: '400ms' }}>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            transition: 'all 0.3s ease-in-out',
                          },
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<AndroidIcon />}
                          sx={{
                            py: 1.5,
                            bgcolor: 'white',
                            color: 'black',
                            '&:hover': {
                              bgcolor: 'grey.100',
                            },
                          }}
                          onClick={() => window.open(appStoreLinks.android, '_blank')}
                        >
                          Download for Android
                        </Button>
                      </Paper>
                    </Grow>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Scan QR code to download
                  </Typography>
                  <Box
                    component="img"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(appStoreLinks.qrCode)}`}
                    alt="QR Code"
                    sx={{
                      width: 120,
                      height: 120,
                      mt: 1,
                      bgcolor: 'white',
                      p: 1,
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grow in timeout={1000} style={{ transitionDelay: '600ms' }}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    zIndex: 0,
                  },
                }}
              >
                <Box
                  component="img"
                  src="/mobile-app-mockup.png"
                  alt="Mobile App"
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                  }}
                />
              </Box>
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MobileAppDownload; 