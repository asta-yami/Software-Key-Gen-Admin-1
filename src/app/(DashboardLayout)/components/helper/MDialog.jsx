import Type from '@/helpers/Type'
import { Label } from '@mui/icons-material'
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputLabel, Stack, Switch, TextField, Typography } from '@mui/material'
import { IconX } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'

export const DialogHeading = ({ title, setShowAddDialog }) => {
    return (
        <Stack direction="row" justifyContent='space-between'>
            <Typography variant="h6" gutterBottom>{title}</Typography>

            <Stack justifyContent={'flex-end'}>
                <IconButton sx={{ padding: 0, margin: 0 }} onClick={() => setShowAddDialog(false)}>
                    <IconX width={20} />
                </IconButton>

            </Stack>
        </Stack>
    )
}

export const DeleteDialog = ({ showDel, setShowDel, onSuccess, row }) => {
    return (
        <Dialog
            open={showDel}
            onClose={() => setShowDel(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            title="Hello"
        >


            <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {'You will not be able to recover this imaginary file!'}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setShowDel(false)}>Cancel</Button>
                <Button onClick={() => {
                    onSuccess(row.id);
                    setShowDel(false);
                }} autoFocus>
                    {'Delete'}
                </Button>
            </DialogActions>

        </Dialog>
    )
}

const getName = (field) => {
    return String(field).charAt(0).toUpperCase() + String(field).slice(1);
}

export const AddDialog = ({ extraData = {}, showAddDialog, setShowAddDialog, addDataFunc, parId, isImg, name: title, engineId, extraField = {}, isName = true }) => {
    const [name, setName] = useState('');
    const [extraFeldStore, setExtraFieldStore] = useState({});
    const [img, setImg] = useState('');
    const lg = Object.keys(extraField).length > 1 ? 6 : 12;

    useEffect(() => {
        for (let field in extraField) {
            setExtraFieldStore({ ...extraFeldStore, [field]: '' })
        }
    }, [extraField])


    const extraFieldHandler = (field, value) => {

        // if(value == 'on'){
        //     value = true;
        // }else if(value == 'off'){
        //     value = false;
        // }
        setExtraFieldStore({ ...extraFeldStore, [field]: value })
    }




    return (
        <>
            <Dialog
                open={showAddDialog}
                onClose={() => setShowAddDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent className="testdialog" style={{ width: (Object.keys(extraField).length > 1 ? 480 : 300) + 'px' }}>

                    <DialogHeading title={"Add " + title} setShowAddDialog={setShowAddDialog} />


                    <Grid container columnSpacing={2} >
                        {isName &&
                            <Grid item xs={12} sm={12} lg={lg}>
                                <InputLabel htmlFor="name" sx={{ mt: 2, mb: 1 }}>Name</InputLabel>
                                <TextField
                                    id="name"
                                    placeholder="Enter text"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />


                            </Grid>
                        }

                        {
                            Object.keys(extraField).map((field, index) => (
                                <>
                                    {Type.getType(extraField[field]) == 'switch' ?
                                        <Grid item xs={12} sm={12} lg={lg} key={field}>
                                            <InputLabel htmlFor="name" sx={{ mt: 2, mb: 1 }}>{getName(field)}</InputLabel>
                                            <Switch inputProps={{ 'aria-label': 'Switch demo' }} checked={extraFeldStore[field]} onChange={(e) => extraFieldHandler(field, e.target.checked)} />
                                        </Grid>
                                        :
                                        <Grid item xs={12} sm={12} lg={lg} key={field}>
                                            <InputLabel htmlFor="name" sx={{ mt: 2, mb: 1 }}>{getName(field)}</InputLabel>
                                            <TextField
                                                id="name"
                                                placeholder={`Enter ${getName(field)}`}
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                value={extraFeldStore[field]}
                                                type={Type.getType(extraField[field])}
                                                onChange={(e) => extraFieldHandler(field, e.target.value)}
                                            />
                                        </Grid>
                                    }

                                </>
                            ))
                        }

                        {/* 
                        {isImg &&
                            (<Grid item xs={12} sm={12} lg={12}>
                                <InputLabel htmlFor="name" sx={{ mt: 2 }}>Image</CustomFormLabel>
                                <MuiFileInput
                                    id="name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    value={img}
                                    onChange={(value) => setImg(value)}
                                />
                            </Grid>
                            )} */}


                    </Grid>

                    <Stack direction="row-reverse" spacing={1} sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={async () => {
                                const formData = new FormData();
                                formData.append('img', img);
                                formData.append('name', name);
                                const obj = { ...extraData };

                                if (isName) obj.name = name;

                                for (const key in extraFeldStore) {
                                    if (extraField[key] == Type.Int) {
                                        obj[key] = parseInt(extraFeldStore[key]);
                                    } else if (extraField[key] == Type.Swicth) {
                                        obj[key] = extraFeldStore[key]
                                    } else {
                                        obj[key] = extraFeldStore[key];
                                    }
                                }

                                if (parId) {
                                    obj.parId = parId;
                                }

                                if (engineId) formData.append('engineId', engineId);

                                let data = null;



                                if (parId) {
                                    formData.append('parId', parId);
                                    if (isImg) {
                                        data = await addDataFunc(name, parId, formData);
                                    } else {
                                        data = await addDataFunc(name, parId, obj);
                                    }
                                } else {
                                    data = await addDataFunc(name, obj);
                                }


                                setShowAddDialog(false)
                            }}
                        >
                            Add
                        </Button>
                        <Button variant="outlined" onClick={() => {
                            setShowAddDialog(false)
                            setName('');
                        }} >
                            Cancel
                        </Button>

                    </Stack>

                </DialogContent>
            </Dialog>
        </>
    )
}

export const EditDialog = ({ extraData = {}, isName = true, showEditDialog, setShowEditDialog, updateDataFunc, row, name: title, isImg = false, extraField = [] }) => {
    const [name, setName] = useState(row?.name);
    const [img, setImg] = useState('');
    const [extraFeldStore, setExtraFieldStore] = useState({});
    const lg = Object.keys(extraField).length > 1 ? 6 : 12;

    useEffect(() => {
        for (let field in extraField) {
            setExtraFieldStore({ ...extraFeldStore, [field]: '' })
        }
    }, [extraField])


    const extraFieldHandler = (field, value) => {
        setExtraFieldStore({ ...extraFeldStore, [field]: value })
    }


    useEffect(() => {
        setName(row?.name)

        if (row && extraField) {
            for (let field in extraField) {
                if (field != 'password') {
                    setExtraFieldStore({ ...extraFeldStore, [field]: row[field] })
                }
            }
        }

    }, [row, extraField])

    return (
        <Dialog
            open={showEditDialog}
            onClose={() => setShowEditDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className="testdialog" style={{ width: '300px' }}>

                <DialogHeading title={'Update ' + title} setShowAddDialog={setShowEditDialog} />

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} lg={12}>
                        <InputLabel htmlFor="name" sx={{ mt: 2, mb: 1 }}>Name</InputLabel>
                        <TextField
                            id="name"
                            placeholder="Enter text"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>


                    <Grid item xs={12} sm={12} lg={12}>
                        {
                            Object.keys(extraField).map((field, index) => (
                                <>
                                    <Box key={field}>
                                        <InputLabel htmlFor="name" sx={{ mt: 2, mb: 1 }}>{getName(field)}</InputLabel>
                                        <TextField
                                            id="name"
                                            placeholder={`Enter ${getName(field)}`}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            value={extraFeldStore[field]}
                                            type={Type.getType(extraField[field])}
                                            onChange={(e) => extraFieldHandler(field, e.target.value)}
                                        />
                                    </Box>

                                </>
                            ))
                        }
                    </Grid>
                </Grid>



                <Stack direction="row-reverse" spacing={1} sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            setShowEditDialog(false);
                            const formData = new FormData();
                            formData.append('img', img);
                            formData.append('name', name);
                            formData.append('id', row.id);

                            const obj = { ...extraData };

                            if (isName) obj.name = name;

                            for (const key in extraFeldStore) {
                                if (extraField[key] == Type.Int) {
                                    obj[key] = parseInt(extraFeldStore[key]);
                                } else {
                                    obj[key] = extraFeldStore[key];
                                }
                            }

                            // if (parId) {
                            //     obj.parId = parId;
                            // }



                            if (isImg) {
                                updateDataFunc(name, row.id, formData)
                            } else {
                                updateDataFunc(name, row.id, obj)
                            }

                        }}
                    >
                        Update
                    </Button>
                    <Button variant="outlined" onClick={() => setShowEditDialog(false)} >
                        Cancel
                    </Button>
                </Stack>

            </DialogContent>


        </Dialog>
    )
}