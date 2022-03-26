import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import useStyles from "./style";
import { CircularProgress } from "@material-ui/core";

export default function Dropdown(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const loading = open && options.length === 0;

    let { control, errors } = props;
    let { fieldProps } = props;
    let { title, editValue, name, optionLable, width, optionUrl } = fieldProps;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }
        (async () => {
            const response = await fetch(optionUrl);
            const res = await response.json();
            const countries = res.content;
            if (active) {
                setOptions(countries);
            }
        })();
        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Controller
            render={(props) => (
                <Autocomplete
                    style={{ flexBasis: !!width ? width : "100%" }}
                    {...props}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    loading={loading}
                    options={options}
                    getOptionLabel={(option) => option[optionLable]}
                    renderOption={(option) => <span>{option.title}</span>}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={title}
                            className={classes.input}
                            helperText={
                                errors[name] && `${name} is a required field`
                            }
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                    onChange={(_, data) => props.onChange(data)}
                />
            )}
            name={name}
            control={control}
            defaultValue={editValue ? editValue : ""}
        />
    );
}
