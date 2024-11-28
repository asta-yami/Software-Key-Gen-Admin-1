'use client'

const { styled, Card, CardMedia, Grid, Stack, Typography, Avatar, Fab, Button, Box, CardContent, Tabs, Tab } = require("@mui/material");
const { IconFileDescription, IconUserCircle, IconUserCheck, IconBrandFacebook, IconBrandTwitter, IconBrandDribbble, IconBrandYoutube, IconEdit, IconStatusChange, IconTrash, IconKey } = require("@tabler/icons-react");
import { useState } from "react";
import ProfileTab from "./ProfileTab";
import Follower from "./DealerCard";
import DealerCard from "./DealerCard";
import TransactionCard from "./TransactionCard";
import { AddDialog, EditDialog } from "@/app/(DashboardLayout)/components/helper/MDialog";
import Type from "../../../../../helpers/Type";
import { addTokenToManager } from "../../../../../../lib/actions";
import { updateManager } from "@/helpers/actions";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
        </div>
    );
}


export default function ManagerProfileBanner({ data, params }) {
    const [showBuyPlan, setShowBuyPlan] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const ProfileImage = styled(Box)(() => ({
        backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
        borderRadius: '50%',
        width: '110px',
        height: '110px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: "0 auto"
    }));

    return (
        <>

            <AddDialog addDataFunc={addTokenToManager} showAddDialog={showBuyPlan} setShowAddDialog={setShowBuyPlan} name={'Token'} isName={false} extraData={params} extraField={{ token: Type.Int }} />
            <EditDialog updateDataFunc={updateManager} row={data} showEditDialog={showEditDialog} setShowEditDialog={setShowEditDialog} name={'Manager'} isName={true} extraField={{ username: Type.String, password: Type.String }} />

            <Card>
                {/* <CardMedia component="img" image={'/images/backgrounds/profilebg.jpg'} alt={"profilecover"} width="100%" height="100px" /> */}

                {/* <CardContent width="100%" height="100px" ></CardContent> */}
                <Grid container spacing={0} justifyContent="center" alignItems="center" mt={12} >
                    {/* Post | Followers | Following */}
                    <Grid
                        item
                        lg={4}
                        sm={12}
                        md={5}
                        xs={12}
                        sx={{
                            order: {
                                xs: '2',
                                sm: '2',
                                lg: '1',
                            },
                        }}
                    >
                        <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
                            <Box>
                                <Typography variant="h4" fontWeight="600">
                                    {data.tokens}
                                </Typography>
                                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                                    Tokens
                                </Typography>
                            </Box>
                            <Box>

                                <Typography variant="h4" fontWeight="600">
                                    {data.dealers.length}
                                </Typography>
                                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                                    Dealers
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h4" fontWeight="600">
                                    {data.managerTransactions.length}
                                </Typography>
                                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                                    Transactions
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    {/* about profile */}
                    <Grid
                        item
                        lg={4}
                        sm={12}
                        xs={12}
                        sx={{
                            order: {
                                xs: '1',
                                sm: '1',
                                lg: '2',
                            },
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            textAlign="center"
                            justifyContent="center"
                            sx={{
                                mt: '-85px',
                            }}
                        >
                            <Box>
                                <ProfileImage>
                                    <Avatar
                                        src={"/images/profile/user-1.jpg"}
                                        alt="profileImage"
                                        sx={{
                                            borderRadius: '50%',
                                            width: '100px',
                                            height: '100px',
                                            border: '4px solid #fff',
                                        }}
                                    />
                                </ProfileImage>
                                <Box mt={1}>
                                    <Typography fontWeight={600} variant="h5">
                                        {data.name}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="h6"
                                        fontWeight={400}
                                    >
                                        Manager
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    {/* friends following buttons */}
                    <Grid
                        item
                        lg={4}
                        sm={12}
                        xs={12}
                        sx={{
                            order: {
                                xs: '3',
                                sm: '3',
                                lg: '3',
                            },
                        }}
                    >
                        <Stack direction={'row'} gap={2} alignItems="center" justifyContent="center" my={2}>

                            <Button color="primary" variant="outlined" onClick={() => setShowEditDialog(true)}>
                                <IconEdit size="16" style={{ marginRight: 6 }} />
                                Edit Profile
                            </Button>

                            {/* <Fab size="small" color="primary" sx={{ backgroundColor: '#1877F2' }}>
                                <IconEdit size="16" />
                            </Fab> */}
                            {/* <Fab size="small" color="primary" sx={{ backgroundColor: '#1DA1F2' }}>
                                <IconStatusChange size="18" />
                            </Fab> */}
                            {/* <Fab size="small" color="success" sx={{ backgroundColor: '#EA4C89' }}>
                                <IconTrash size="18" />
                            </Fab> */}
                            {/* <Fab size="small" color="error" sx={{ backgroundColor: '#CD201F' }}>
                                <IconBrandYoutube size="18" />
                            </Fab> */}
                            <Button color="primary" variant="contained" onClick={() => setShowBuyPlan(true)}>
                                <IconKey size="16" style={{ marginRight: 6 }} />
                                Buy Tokens
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                {/**TabbingPart**/}
                <ProfileTab value={value} setValue={setValue} handleChange={handleChange} />
            </Card>



            <CustomTabPanel value={value} index={0} >
                <DealerCard dealers={data.dealers} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} >
                <TransactionCard transactions={data.managerTransactions} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2} >
                Item One3
            </CustomTabPanel>
        </>
    );
};