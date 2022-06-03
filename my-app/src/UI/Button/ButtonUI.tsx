import React, {FC} from 'react';

import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

interface Props {
    onClick: () => void
    disabled: any
    title: string
}

const ButtonUI: FC<Props> = ({onClick, disabled, title}) => {
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        display: 'flex',
        fontSize: 16,
        padding: '12px 12px',
        lineHeight: 1.5,
        backgroundColor: 'rgba(127, 143, 166,1.0)',
        width: '100%',
        '&:hover': {
            backgroundColor: '#a4b0be',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'rgba(64, 115, 158,1.0)',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });
    return (
        <>
            <BootstrapButton
                type="submit"
                onClick={onClick}
                disabled={disabled}
                variant="contained"
                disableRipple
            >
                {title}
            </BootstrapButton>
        </>
    );
};

export default ButtonUI;