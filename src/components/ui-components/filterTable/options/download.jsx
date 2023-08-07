import React from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Download({ dataStage }) {

    const [open, setOpen] = React.useState(false)

    const handleMenu = () => {
        setOpen(true)
    };

    retun(
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpen}
            >
                <DownloadIcon />
            </Button>
        </div>
    )
}