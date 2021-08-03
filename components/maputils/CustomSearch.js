import React from 'react';
import styled from 'styled-components';
import { Chip } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios';
import throttle from 'lodash/throttle';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const useStyles = makeStyles({
    tag: {
        margin: '4px',
        paddingLeft: '4px',
        paddingRight: '1px',
        backgroundColor: '#313335',
        borderRadius: '4px',
        maxWidth: (props) => (props.maxwidth ? props.maxwidth : null),
        color: '#fff',
        '& .MuiChip-deleteIcon': {
            paddingLeft: '2px',
            color: '#fff',
        },
        '&:hover': {
            backgroundColor: 'red',
        },
        '&:focus': {
            backgroundColor: 'purple',
        },
    },
});

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    color: ${(props) => props.inputColor || 'palevioletred'};
    background: papayawhip;
    border: 1px solid;
    border-radius: 3px;
    width: -webkit-fill-available;
    height: 40px;
    transition: all 0.2s ease-in-out 0s;
    font-weight: 400;
    font-family: 'Akrobat', 'Roboto', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    display: block;
    /* &:focus {
         {
            width: 60%;
        }
    } */
`;

const Div = styled.div`
    /* background-color: #fff; */
    width: 600px;
    display: flex;
    flex-direction: ${(props) => (props.isRow ? 'row' : 'column')};
`;

function MyChip(props) {
    const { ...other } = props;
    const classes = useStyles(props);
    return <Chip className={classes.tag} {...other} />;
}

const TagsDiv = styled.div`
    border: 4px dashed;
    border-color: rgba(247, 138, 224, 1);
    height: auto;
    width: ${(props) => (props.isRow ? '200px' : 'auto')};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const SearchDiv = styled.div`
    border: 4px dashed;
    border-color: rgba(102, 56, 240, 1);
    width: ${(props) => (props.isRow ? '400px' : 'auto')};
    position: relative;
`;

function add(arr, obj) {
    let newArr = [];
    newArr.push(...arr);
    const found = arr.some((el) => el._id === obj._id);
    if (!found) newArr.push(obj);
    return newArr;
}

function remove(arrMain, arrReference, key) {
    return arrMain.filter((opt) => {
        return !arrReference.some((obj) => {
            return opt[key] === obj[key];
        });
    });
}

const ResultsDiv = styled.div`
    height: 40px;
    background-color: ${(props) =>
        props.active ? 'rgba(235, 235, 235, 1.00)' : null};
    &:hover {
        background-color: rgba(162, 162, 162, 0.2);
    }
`;

export default function CustomSearch({ api }) {
    const [searchParam, setSearchParam] = React.useState([]);
    const [allTags, setAllTags] = React.useState(false);
    const [isRow, setIsRow] = React.useState(true);
    const [options, setOptions] = React.useState([]);
    const [selectedOption, setSelectedOption] = React.useState([]);
    const [cursor, setCursor] = React.useState(0);
    const nodeRef = React.useRef();
    const [mouse, setMouse] = React.useState(false);

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const handleClick2 = () => {
        console.info('You clicked the Chip.');
    };

    // function to handle selection of options
    const handleSelect = () => {
        for (let i = 0; i < options.length; i++) {
            if (i === cursor) {
                // Ensure no duplicates in selectedOptions list
                const result = add(selectedOption, options[i]);
                setSelectedOption(result);
            }
        }
    };

    // remove options from options list if it was selected and added to the selectedOption list
    React.useEffect(() => {
        const resultDiffer = options.filter((opt) => {
            return !selectedOption.some((selOpt) => {
                return opt._id === selOpt._id;
            });
        });
        setOptions(resultDiffer);
    }, [selectedOption]);

    // function to allow navigating with up / down arrow keys
    const handleKeyDown = (e) => {
        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && cursor > 0) {
            setCursor(cursor - 1);
            return;
        } else if (e.keyCode === 40 && cursor < options.length - 1) {
            setCursor(cursor + 1);
            return;
        } else if (e.key === 'Enter') {
            handleSelect();
        } else {
            return null;
        }
    };

    // function to handle the deletion of the tags
    const handleDeleteSelectedOption = (tagToDelete) => {
        setSelectedOption((tags) =>
            tags.filter((tag) => tag._id !== tagToDelete._id)
        );
    };

    // Register when clicking outside of the Input / search component
    const handleClick = (e) => {
        if (nodeRef.current?.contains(e.target)) {
            // inside click
            return;
        }

        // outside click
        setAllTags(false);
        setIsRow(true);
    };
    // Effect to activate and deactivate the click listners for 'handleclick' function
    React.useEffect(() => {
        //add when mounted
        document.addEventListener('mousedown', handleClick);

        //return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    // Function for the live api search
    const fetch = React.useMemo(
        () =>
            throttle(async (request, callback) => {
                const { data } = await axios.get(
                    `/api/${api}/${request.input}`
                );
                const cleanedData = remove(data, selectedOption, '_id');

                setOptions(cleanedData);
            }, 500),
        [selectedOption, api]
    );

    // live api search on DB backend
    React.useEffect(() => {
        let active = true;
        if (searchParam.length === 0) {
            setOptions([]);
            return null;
        }
        fetch({ input: searchParam }, (results) => {});

        return () => {
            active = false;
        };
    }, [fetch, searchParam]);

    return (
        <Div isRow={isRow} ref={nodeRef}>
            <TagsDiv isRow={isRow}>
                {allTags ? (
                    selectedOption.map((option, i) => (
                        <div key={i}>
                            <span>
                                <MyChip
                                    label={option.name}
                                    clickable
                                    onDelete={() =>
                                        handleDeleteSelectedOption(option)
                                    }
                                />
                            </span>
                        </div>
                    ))
                ) : selectedOption.length > 0 ? (
                    <>
                        <div key={1}>
                            <span>
                                <MyChip
                                    maxwidth="128px"
                                    label={selectedOption[0].name}
                                    clickable
                                    onDelete={() =>
                                        handleDeleteSelectedOption(
                                            selectedOption[0]
                                        )
                                    }
                                />
                            </span>
                            {selectedOption.length > 1 ? (
                                <span>
                                    <MyChip
                                        label={selectedOption.length - 1 + ' +'}
                                        clickable
                                    />
                                </span>
                            ) : null}
                        </div>
                    </>
                ) : null}
            </TagsDiv>
            <SearchDiv isRow={isRow}>
                <svg
                    width="30"
                    height="20"
                    fill="currentColor"
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '2%',
                        marginRight: '10px',
                        paddingLeft: '10px',
                    }}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                </svg>
                <Input
                    placeholder="Name"
                    onClick={() => {
                        setAllTags(true);
                        setIsRow(false);
                    }}
                    onChange={(e) => setSearchParam(e.target.value)}
                    autoComplete="off"
                    id="Name"
                    style={{ paddingLeft: '40px' }}
                    onKeyDown={handleKeyDown}
                />
            </SearchDiv>

            {!isRow ? (
                <div
                    style={{
                        backgroundColor: '#fff',
                        border: '2px solid #fff',
                        borderRadius: '5px',
                        padding: '2px',
                    }}
                >
                    {options.map((option, i) => {
                        const matches = match(option.name, searchParam);
                        const parts = parse(option.name, matches);

                        return (
                            <ResultsDiv
                                key={option._id}
                                onMouseEnter={() => setMouse(true)}
                                onMouseLeave={() => setMouse(false)}
                                active={mouse ? null : i === cursor}
                                onClick={() => {
                                    const result = add(selectedOption, option);
                                    setSelectedOption(result);
                                }}
                            >
                                {parts.map((part, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontWeight: part.highlight
                                                ? 700
                                                : 400,
                                        }}
                                    >
                                        {part.text}
                                    </span>
                                ))}
                            </ResultsDiv>
                        );
                    })}
                </div>
            ) : null}
        </Div>
    );
}
