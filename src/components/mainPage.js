import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { urlSatu, urlDua } from '../utils/url';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DialogForm from "./dialog";
import Slide from "@material-ui/core/Slide";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
    container: {},
    top: {
        marginTop: "50px",
    },
    button: {
        display: "flex",
        justifyContent: "flex-end",
    },
    tambah: {
        marginBottom: "25px",
    },
    deletebutton: {
        marginLeft: "20px",
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialData = {
    nip: '',
    nama: '',
    handphone: '',
    provinsi: {},
    kabupaten: {},
}

const MainPage = () => {
    const classes = useStyles();
    const dataProvinsi = useSelector((state) => state.data);

    const [change, setChange] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [id, setId] = useState('');
    const [dataInput, setDataInput] = useState(initialData);
    const [dataPegawai, setDataPegawai] = useState([]);
    const [provinsi, setProvinsi] = useState('');
    const [dataKelurahan, setDataKelurahan] = useState([]);

    useEffect(() => {
        fetch(`${urlDua}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                const dataFilter = data.filter((dat) => dat.nip);
                setDataPegawai(dataFilter);
            });
    }, [change]);

    useEffect(() => {
        fetch(`${urlSatu}/kota?id_provinsi=${provinsi}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setDataKelurahan(data.kota_kabupaten));

    }, [provinsi]);

    const handleChange = (event) => {
        const val = event.target.value;
        const name = event.target.name;
        setDataInput(prev => ({
            ...prev,
            [name]: val,
        }));
    }

    const handleChangeAutocomplete = (name, value) => {
        let data = {}
        if (value) {
            data = value;
            if (name === 'provinsi') {
                setProvinsi(value.id);
            }
        }

        setDataInput(prev => ({
            ...prev,
            [name]: data
        }));
    }

    const handleOpen = (val) => {
        setOpen(val);
        if (!val) {
            setDataInput(initialData);
            setId('');
            setEditMode(false);
            setDataKelurahan([]);
        } else {
            setEditMode(false);
        }
    }

    const onEdit = (data) => {
        setDataInput({
            nip: data.nip,
            nama: data.nama,
            handphone: data.handphone,
            provinsi: { ...data.provinsi },
            kabupaten: { ...data.kabupaten },
        });
        setProvinsi(data.provinsi.id);
        setId(data.id);
        setOpen(true);
        setEditMode(true);
    }

    const handleSubmit = () => {
        fetch(`${urlDua}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataInput),
        })
            .then(response => response.json())
            .then(data => {
                setChange(prev => !prev);
                handleOpen(false);
            });
    }

    const handleEdit = () => {
        fetch(`${urlDua}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataInput),
        })
            .then(response => response.json())
            .then(data => {
                setChange(prev => !prev);
                handleOpen(false);
            });
    }

    const handleDelete = (id, nama) => {
        const confirm = window.confirm(`Hapus data ${nama} dari daftar pegawai?`);
        if (confirm) {
            fetch(`${urlDua}/${id}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    setChange(prev => !prev);
                });
        }
    }

    const columns = [
        { field: "nip", headerName: "NIP", width: 130 },
        { field: "nama", headerName: "Nama", width: 200 },
        { field: "handphone", headerName: "Nomor Handphone", width: 200 },
        { field: "provinsi", headerName: "Provinsi", renderCell: params => params?.row?.provinsi?.nama, width: 200 },
        { field: "kabupaten", headerName: "Kabupaten", renderCell: params => params?.row?.kabupaten?.nama, width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 300,
            renderCell: (params) => {
                return (
                    <div className={classes.button}>
                        <Button variant="outlined" color="primary" onClick={() => onEdit(params.row)}>
                            Edit</Button>{" "}
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.deletebutton}
                            onClick={() => handleDelete(params.row.id, params.row.nama)}
                        >
                            Delete</Button>
                    </div>
                );
            }
        }
    ];

    return (
        <Container fluid className={classes.container}>
            <div className={classes.top}>
                <Typography variant="h5">Data Pegawai</Typography>
                <div className={classes.button}>
                    <Button
                        className={classes.tambah}
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpen(true)}
                    >
                        Tambah Data</Button>
                </div>
                <DataGrid
                    rows={dataPegawai}
                    columns={columns}
                    autoHeight={true}
                    disableExtendRowFullWidth={true} />
            </div>

            <DialogForm
                open={open}
                TransitionComponent={Transition}
                onClose={() => handleOpen(false)}
                onClick={() => handleOpen(false)}
                dataProvinsi={dataProvinsi}
                onChange={handleChange}
                onChangeAutocomplete={handleChangeAutocomplete}
                dataKelurahan={dataKelurahan}
                data={dataInput}
                onSubmit={editMode ? handleEdit : handleSubmit}
            />
        </Container>
    );
};

export default MainPage;