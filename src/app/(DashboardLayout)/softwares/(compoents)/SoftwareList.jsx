'use client'

import {  Box, IconButton,  Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material'
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { AddDialog, DeleteDialog, EditDialog } from '../../components/helper/MDialog'
import { addSoftware, updateSoftware } from '../../../../helpers/actions'
import { EnhancedTableToolbar } from '../../components/helper/EnhancedTableToolbar';
import { EnhancedTableHead } from '../../components/helper/EnhancedTableHead';

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Software',
    },
    {
        id: 'pname',
        numeric: false,
        disablePadding: false,
        label: 'Latest Version',
    },

    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Versions',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Edit',
    },
    {
        id: 'delete',
        numeric: false,
        disablePadding: false,
        label: 'Delete',
    },
];


export default function SoftwareList({ data }) {
    const [showAddDialog, setShowAddDialog] = useState(false);

    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [products, setProducts] = useState(data)
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
                <AddDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} addDataFunc={addSoftware} isImg={false} name={'Software'}/>
                <DeleteDialog showDel={showDel} setShowDel={setShowDel} />
                <EditDialog showEditDialog={showEditDialog} setShowEditDialog={setShowEditDialog} updateDataFunc={updateSoftware} row={currRow} isImg={false} name={'Software'} />

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
                                    numSelected={selected.length}
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
                                                    key={row.id}

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
                                                                {row.latestVersion}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Box display="flex" alignItems="center">
                                                            <Link href={`/softwares/${row.id}`} underline="none">
                                                                Versions
                                                            </Link>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell >
                                                        <IconButton onClick={() => editHandler(row)}>
                                                            <IconEdit />
                                                        </IconButton>
                                                    </TableCell>

                                                    <TableCell >
                                                        <IconButton onClick={() => setShowDel(true)}>
                                                            <IconTrash />
                                                        </IconButton>
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
            </Box >

    )
}

