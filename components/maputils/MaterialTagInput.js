import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import throttle from 'lodash/throttle';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#fff',
        '& .MuiFilledInput-underline:after': {
            borderBottomColor: '#fecd3a',
        },
        '& .MuiFilledInput-root': {
            backgroundColor: '#fff',
        },
        '& label.Mui-focused': {
            color: '#313335',
        },
        '& MuiFilledInput-root.Mui-focused': {
            backgroundColor: '#4af2a1',
        },
    },
    tag: {
        paddingLeft: '8px',
        paddingRight: '8px',
        backgroundColor: '#313335',
        borderRadius: '4px',
        color: '#fff',
        '& .MuiChip-deleteIcon': {
            color: '#fff',
        },
    },
});

export default function Asynchronous({
    selectedOptions,
    setSelectedOptions,
    label,
    api,
}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const loading = open && options.length === 0 && inputValue.length > 0;

    const fetch = React.useMemo(
        () =>
            throttle(async (request, callback) => {
                const { data } = await axios.get(
                    `/api/${api}/${request.input}`
                );
                console.log('data', data);
                console.log(
                    'Object data',
                    Object.keys(data).map((key) => data[key])
                );
                setOptions(Object.keys(data).map((key) => data[key]));
            }, 500),
        []
    );

    React.useEffect(() => {
        let active = true;
        if (inputValue.length === 0) {
            return null;
        }
        fetch({ input: inputValue }, (results) => {});

        return () => {
            active = false;
        };
    }, [fetch, inputValue]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <div style={{ display: 'flex' }}>
            <Autocomplete
                classes={{ root: classes.root, tag: classes.tag }}
                multiple
                id="asynchronous-demo"
                style={{ width: 600 }}
                open={open}
                limitTags={2}
                size="small"
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option._id === value._id}
                onChange={(event, newValue) => {
                    setSelectedOptions(newValue);
                }}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={`Search ${label}`}
                        variant="filled"
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
                renderOption={(option, { inputValue }) => {
                    const matches = match(option.name, inputValue);
                    const parts = parse(option.name, matches);

                    return (
                        <div>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}
                                >
                                    {part.text}
                                </span>
                            ))}
                        </div>
                    );
                }}
            />
        </div>
    );
}
