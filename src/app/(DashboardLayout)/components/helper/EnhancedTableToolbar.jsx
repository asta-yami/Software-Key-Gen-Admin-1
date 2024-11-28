'use client'

import { Box, Button, InputAdornment, TextField, Toolbar } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";

export const EnhancedTableToolbar = ({ handleSearch, search, setShowAddDialog, isAdd, newAddon, addTitle }) => {

    return (

        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                
            }}

            
        >

            <Box display={'flex'} sx={{ width: '100%'}}>
                <Box flexGrow={1}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconSearch size="1.1rem" />
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Search Product"
                        size="small"
                        onChange={handleSearch}
                        value={search}
                    />
                </Box>

                <Box>
                    {isAdd ? <Button onClick={() => setShowAddDialog(true)}>{addTitle ? addTitle: 'ADD'} </Button> : null}
                </Box>


                {newAddon ? newAddon : null}
            </Box>



        </Toolbar>
    )

}

