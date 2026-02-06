"use client";

import { Fragment, useRef, useState, Children, ReactElement } from "react";
import Button from "@mui/material/Button";
import { ButtonProps } from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


type SplitDropdownButtonProps = {
    children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
};

export function SplitDropdownButton({ children }: SplitDropdownButtonProps) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    const buttons = Children.toArray(children) as ReactElement<ButtonProps>[];
    const [first, ...rest] = buttons;

    if (!first) return null;

    return (
        <Fragment>
            <ButtonGroup
                ref={anchorRef}
                variant="contained"
                sx={{ borderRadius: 1, overflow: "hidden" }}
            >
                {/* Primary action */}
                <Button
                    {...first.props}
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        ...first.props.sx
                    }}
                />

                {/* Dropdown toggle */}
                {rest.length > 0 && (
                    <Button
                        size="small"
                        onClick={() => setOpen(prev => !prev)}
                        sx={{
                            minWidth: 36,
                            borderLeft: "1px solid rgba(0,0,0,0.2)"
                        }}
                    >
                        <ExpandMoreIcon
                            sx={{
                                transition: "transform 0.2s ease",
                                transform: open ? "rotate(180deg)" : "rotate(0deg)"
                            }}
                        />
                    </Button>
                )}
            </ButtonGroup>

            <Menu
                open={open}
                anchorEl={anchorRef.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: anchorRef.current?.offsetWidth
                        }
                    }
                }}
            >
                <Stack direction="column" spacing={0.5}>
                    {rest.map((item, index) => (
                        <Button
                            key={index}
                            {...item.props}
                            fullWidth
                            onClick={(e) => {
                                item.props.onClick?.(e);
                                setOpen(false);
                            }}
                            sx={{
                                justifyContent: "flex-start",
                                textTransform: "none",
                                ...item.props.sx
                            }}
                        />
                    ))}
                </Stack>
            </Menu>
        </Fragment>
    );
};
