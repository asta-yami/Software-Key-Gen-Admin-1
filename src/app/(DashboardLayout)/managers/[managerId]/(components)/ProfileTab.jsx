import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { IconBrandAsana, IconHeart, IconPhoto, IconReceipt, IconUserCircle } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';




function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProfileTab = ({ value, setValue, handleChange }) => {
    const location = usePathname();

    const ProfileTabs = [
        {
            label: 'Dealers',
            icon: <IconUserCircle size="20" />,
            to: '/apps/user-profile/profile',
        },
        {
            label: 'Transactions',
            icon: <IconHeart size="20" />,
            to: '/apps/user-profile/followers',
        },

    ];

    const handleChange1 = () => {
        console.log('Arc')
    }

    console.log(value)

    return (
        <>

            {/* <Box mt={1} sx={{ mt: 1, backgroundColor: (theme) => theme.palette.grey[100] }}>
                <Box justifyContent={'end'} display="flex" sx={{ maxWidth: { xs: 320, sm: '100%' } }}>
                    <Tabs
                        value={value}
                        onChange={handleChange1}
                        variant="scrollable"
                        allowScrollButtonsMobile
                        aria-label="scrollable prevent tabs example"
                    >
                        {ProfileTabs.map((tab, index) => {
                            return (
                                <Tab
                                    iconPosition="start"
                                    label={tab.label}
                                    sx={{ minHeight: '50px' }}
                                    icon={tab.icon}
                                    value={value}
                                    key={tab.label}
                                    // onChange={() => handleChange(e, index)}
                                />
                            );
                        })}
                    </Tabs>
                </Box>

            </Box > */}

            <Box mt={1} sx={{ mt: 1, backgroundColor: (theme) => theme.palette.grey[100] }}>
                <Box justifyContent={'end'} display="flex" sx={{ maxWidth: { xs: 320, sm: '100%' } }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab iconPosition="start" icon={<IconBrandAsana />} sx={{ minHeight: '60px' }} label="Dealers" {...a11yProps(0)} />
                            <Tab iconPosition="start" icon={<IconReceipt />} sx={{ minHeight: '60px' }} label="Transactions" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                </Box>
            </Box>

        </>



    );
};

export default ProfileTab;