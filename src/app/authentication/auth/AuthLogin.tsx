'use client'

import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import {verifyUser} from '../../../../lib/actions'

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()


  const signIn = async () => {
    const response = await verifyUser(name, password);

    if(response?.success){
      router.push('/')
    }else {
      router.push('/authentication/login')
    }
  }

    return (
      <>
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}

        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField variant="outlined" value={name}  fullWidth onChange={(e: any) => setName(e.target.value)}/>
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField type="password" value={password} onChange={(e: any) => setPassword(e.target.value) } variant="outlined" fullWidth />
          </Box>
          {/* <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Forgot Password ?
        </Typography>
      </Stack> */}
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            sx={{ mt: 4 }}
            onClick={signIn}
          >
            Sign In
          </Button>
        </Box>
        {subtitle}
      </>
    );
  }

export default AuthLogin;
