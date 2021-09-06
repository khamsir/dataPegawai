import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: "30px",
    },
    textfield: {
        marginTop: "10px",
    },
    action: {
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
    },
    button: {
        marginLeft: "20px",
        marginRight: "20px",
    },
}));

const DialogForm = (props) => {
    const classes = useStyles();
    const {
        open,
        TransitionComponent,
        onClose,
        onClick,
        onChange,
        onSubmit,
        data,
        dataProvinsi,
        onChangeAutocomplete,
        dataKelurahan,
    } = props;

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={TransitionComponent}
                keepMounted
                onClose={onClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {`Form Pegawai`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container justifyContent="center">
                            <Grid container xs={12} spacing={5} direction="row">
                                <Grid item xs={6} direction="column" container >
                                    <div className={classes.form}>
                                        <label htmlFor="NIP">NIP</label>
                                        <TextField
                                            id="NIP"
                                            name="nip"
                                            variant="outlined"
                                            className={classes.textfield}
                                            onChange={(e) => onChange(e)}
                                            value={data.nip}
                                        />
                                    </div>
                                    <div className={classes.form}>
                                        <label htmlFor="nama">Nama</label>
                                        <TextField
                                            id="nama"
                                            name="nama"
                                            variant="outlined"
                                            className={classes.textfield}
                                            onChange={(e) => onChange(e)}
                                            value={data.nama}
                                        />
                                    </div>
                                    <div className={classes.form}>
                                        <label htmlFor="handphone">Handphone</label>
                                        <TextField
                                            id="handphone"
                                            name="handphone"
                                            variant="outlined"
                                            className={classes.textfield}
                                            onChange={(e) => onChange(e)}
                                            value={data.handphone}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6} direction="column" container>
                                    <div className={classes.form}>
                                        <label htmlFor="provinsi">Provinsi</label>
                                        <br></br>
                                        <Autocomplete
                                            value={data.provinsi}
                                            id="provinsi"
                                            options={dataProvinsi}
                                            getOptionLabel={(option) => option.nama}
                                            onChange={(event, optVal) => onChangeAutocomplete('provinsi', optVal)}
                                            renderInput={(params) => <TextField {...params} variant="outlined" className={classes.textfield} />}
                                        />
                                    </div>
                                    <div className={classes.form}>
                                        <label htmlFor="kabupaten">Kabupaten</label>
                                        <Autocomplete
                                            disabled={dataKelurahan.length === 0}
                                            value={data.kabupaten}
                                            id="kabupaten"
                                            options={dataKelurahan}
                                            getOptionLabel={(option) => option.nama}
                                            onChange={(event, optVal) => onChangeAutocomplete('kabupaten', optVal)}
                                            renderInput={(params) => <TextField {...params} variant="outlined" className={classes.textfield} />}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid className={classes.action} xs={12}>
                        <div>
                            <Button onClick={onClick} variant="contained">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                className={classes.button}
                                onClick={() => onSubmit()}
                            >
                                Submit
                            </Button>
                        </div>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default DialogForm;
