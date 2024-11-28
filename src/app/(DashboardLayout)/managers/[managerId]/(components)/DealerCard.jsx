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
import BlankCard from './BlankCard'
import { IconFileBroken, IconKey, IconMapPin, IconSearch } from '@tabler/icons-react';

const DealerCard = ({dealers}) => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(fetchFollwores());
    // }, [dispatch]);


    const filterFollowers = (followers, cSearch) => {
        if (followers)
            return followers.filter((t) =>
                t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()),
            );

        return followers;
    };
    const [search, setSearch] = React.useState('');

    
    const getFollowers =filterFollowers(dealers, search)

    return (
        <>
            <Grid container spacing={3}>
                <Grid item sm={12} lg={12}>
                    <Stack direction="row" alignItems={'center'} mt={2}>
                        <Box>
                            <Typography variant="h3">
                                Dealers &nbsp;
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
                                        <Avatar alt="Remy Sharp" src={profile.avatar} sx={{ width: 40, height: 40 }} />
                                        <Box>
                                            <Typography variant="h6" textOverflow={'ellipsis'} noWrap>
                                                {profile.name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                            >
                                                <IconKey size="14" />
                                                {profile.tokens}
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

export default DealerCard;