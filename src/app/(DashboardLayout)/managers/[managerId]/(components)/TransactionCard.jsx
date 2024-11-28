import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import BlankCard from '../../../../../../../../Software Key Gen Admin/Software Key Gen Admin 1/src/app/(DashboardLayout)/managers/[managerId]/(components)/BlankCard'
import { IconFileBroken, IconKey, IconMapPin, IconSearch } from '@tabler/icons-react';

const TransactionCard = ({ transactions }) => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(fetchFollwores());
    // }, [dispatch]);


    const filterFollowers = (followers, cSearch) => {
        // if (followers)
        //     return followers.filter((t) =>
        //         (t.token+"").toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()),
        //     );

        return followers;
    };
    const [search, setSearch] = React.useState('');

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Two-digit month (0-indexed)
        const year = date.getFullYear(); // Four-digit year
        const hour = String(date.getHours()).padStart(2, '0'); // Two-digit hour
        const minute = String(date.getMinutes()).padStart(2, '0'); // Two-digit minute
    
        return `${hour}:${minute} / ${day}-${month}-${year}`;
    }
    const getFollowers = filterFollowers(transactions, search)

    return (
        <>
            <Grid container spacing={3}>
                <Grid item sm={12} lg={12}>
                    <Stack direction="row" alignItems={'center'} mt={2}>
                        <Box>
                            <Typography variant="h3">
                                Transactions &nbsp;
                                {/* <Chip label={getFollowers.length} color="secondary" size="small" /> */}
                            </Typography>
                        </Box>
                        <Box ml="auto">
                            <TextField
                                id="outlined-search"
                                placeholder="Search Dealers"
                                size="small"
                                type="search"
                                variant="outlined"
                                inputProps={{ 'aria-label': 'Search Dealers' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconSearch size="14" />
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Box>
                    </Stack>
                </Grid>
                {getFollowers.map((profile) => {

                    return (
                        <Grid item xs={12} lg={4} key={profile.id}>
                            <BlankCard>
                                <CardContent>
                                    <Stack direction={'row'} gap={2} alignItems="center">
                                        <Avatar alt="Remy Sharp" src={profile.avatar} sx={{ width: 40, height: 40 }} >
                                            <IconKey size="20" />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" textOverflow={'ellipsis'} noWrap>
                                                {profile.token+""}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                            >
                                                {/* <IconKey size="14" /> */}
                                                {formatDate(profile.createdAt)+""}
                                            </Typography>
                                        </Box>
                                        <Box ml="auto">
                                            {profile.isFollowed ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                // onClick={() => dispatch(onToggleFollow(profile.id))}
                                                >
                                                    More
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                // onClick={() => dispatch(onToggleFollow(profile.id))}
                                                >
                                                    More
                                                </Button>
                                            )}
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </BlankCard>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default TransactionCard;