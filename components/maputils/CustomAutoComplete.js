import { useState } from 'react';
import useAutocomplete, {
    createFilterOptions,
} from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
    limit: 20,
});

const Label = styled('label')`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
`;

const InputWrapper = styled('div')`
    width: 300px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;

    &:hover {
        border-color: #ea4336;
    }

    &.focused {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }

    & input {
        font-size: 14px;
        height: 30px;
        box-sizing: border-box;
        padding: 4px 6px;
        width: 0;
        min-width: 30px;
        flex-grow: 1;
        border: 0;
        margin: 0;
        outline: 0;
    }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
    <div {...props}>
        <span>{label}</span>
        <HighlightOffIcon onClick={onDelete} />
    </div>
))`
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: #fecd3a;
    border: 1px solid #f9ba01;
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;

    &:focus {
        border-color: #40a9ff;
        background-color: #e6f7ff;
    }

    & span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    & svg {
        font-size: 22px;
        cursor: pointer;
        padding: 4px 4px 4px 8px;
    }
`;

const Listbox = styled('ul')`
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: #fff;
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;

    & li {
        padding: 5px 12px;
        display: flex;

        & span {
            flex-grow: 1;
        }

        & svg {
            color: transparent;
        }
    }

    & li[aria-selected='true'] {
        background-color: #fafafa;
        font-weight: 600;

        & svg {
            color: #1890ff;
        }
    }

    & li[data-focus='true'] {
        background-color: #e6f7ff;
        cursor: pointer;

        & svg {
            color: #000;
        }
    }
`;

export default function CustomAutocomplete({ searchData }) {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'custom-autocomplete',
        multiple: true,
        options: searchData,
        getOptionLabel: (option) => option.title,
        filterOptions,
        onInputChange: (event, newInputValue) => {
            setInputValue(newInputValue);
        },
        onChange: (event, newValue) => {
            setSelectedValues(newValue);
        },
    });
    return (
        <NoSsr>
            <div>
                <div {...getRootProps()}>
                    <Label {...getInputLabelProps()}>Customized hook</Label>
                    <InputWrapper
                        ref={setAnchorEl}
                        className={focused ? 'focused' : ''}
                    >
                        {value.map((option, index) => {
                            return (
                                <Tag
                                    key={index}
                                    label={option.title}
                                    {...getTagProps({ index })}
                                />
                            );
                        })}

                        <input {...getInputProps()} />
                    </InputWrapper>
                </div>
                {groupedOptions.length > 0 && inputValue.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <li
                                key={index}
                                {...getOptionProps({ option, index })}
                            >
                                <span>{option.title}</span>

                                <CheckIcon fontSize="small" />
                            </li>
                        ))}
                    </Listbox>
                ) : null}
            </div>
        </NoSsr>
    );
}
