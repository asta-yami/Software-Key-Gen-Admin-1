'use client'

import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material'
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { EnhancedTableToolbar } from '../../components/helper/EnhancedTableToolbar';
import { EnhancedTableHead } from '../../components/helper/EnhancedTableHead';
import { AddDialog } from '../../components/helper/MDialog';
import { addManager } from '@/helpers/actions';
import Type from '../../../../helpers/Type'


const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    }, {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'User Name',
    },
    {
        id: 'tokens',
        numeric: false,
        disablePadding: false,
        label: 'Tokens',
    }, {
        id: 'dealers',
        numeric: false,
        disablePadding: false,
        label: 'Dealers',
    }, {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    }, {
        id: 'profile',
        numeric: false,
        disablePadding: false,
        label: 'Profile',
    },
];

export default function ManagerList({ data }) {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState(data);
    const [showDel, setShowDel] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [currRow, setCurrRow] = useState(null);
    const [search, setSearch] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        const filteredRows = data.filter((row) => {
            console.log(row.name)
            return row.name.toLowerCase().includes(event.target.value);
        });
        setSearch(event.target.value);
        setRows(filteredRows);
    };

    const editHandler = (row) => {
        setCurrRow(row);

        setShowEditDialog(true);
    }
    return (
        <Box>

            <AddDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} addDataFunc={addManager} extraField={{ 'mob': Type.String, 'username': Type.String, 'password': Type.Password, 'tokens': Type.Int }} name={'Manager'} />


            <Box>
                <EnhancedTableToolbar
                    setShowAddDialog={setShowAddDialog}
                    search={search}
                    handleSearch={(event) => handleSearch(event)}
                    isAdd={true}
                />

                <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >

                            <EnhancedTableHead
                                headCells={headCells}
                                rowCount={rows.length}
                            />

                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {


                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.name}
                                            >

                                                <TableCell align="right">
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" fontWeight="400" sx={{ ml: 1 }}>
                                                            {row.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" fontWeight="400" sx={{ ml: 1 }}>
                                                            {row.username}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" fontWeight="400" sx={{ ml: 1 }}>
                                                            {row.tokens}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box display="flex" alignItems="center">
                                                        <Link href={'/'} underline="none">
                                                            Dealers
                                                        </Link>
                                                    </Box>
                                                </TableCell>
                                                <TableCell >
                                                    {row.isActive ? 'Active' : 'Inactive'}
                                                </TableCell>

                                                <TableCell >
                                                    <Button component={Link} href={'/managers/'+row.id} variant='contained' >
                                                        Profile
                                                    </Button>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })
                                }


                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Box>
    )
}
