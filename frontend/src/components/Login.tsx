'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Box, Typography, Avatar } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';

const Login = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (session) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        p: 2,
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {session.user?.image && (
            <Avatar 
              src={session.user.image} 
              alt={session.user.name || 'User'}
              sx={{ width: 32, height: 32 }}
            />
          )}
          <Typography variant="body1">
            {session.user?.name}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={() => signOut()}
          size="small"
        >
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={() => signIn('google')}
        size="large"
      >
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;
