import { Badge, Button, IconButton, InputAdornment, Switch, Typography } from '@material-ui/core';
import {
    Avatar, InputLabel, Select, TextField, FormControl, MenuItem,
    withStyles, FormControlLabel, RadioGroup, FormLabel, Radio, Divider,
    Dialog, DialogTitle, DialogActions, DialogContent,
    OutlinedInput
} from '@material-ui/core';
import { ExpandLess, ExpandMore, Visibility, VisibilityOff } from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';
import useToggle from '../../hooks/useToggleState';

import styles from '../../styles/helpersStyles/UserProfileFormStyles';
// import CustomizedDateInput from '../helpers/CustomizedDateInput';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import AvatarEdit from '../helpers/AvatarEdit';

function UserProfileForm(props) {
    const { classes } = props;
    const {
        userName,
        setName,
        userPass,
        setPassword,
        userMail,
        setEmail,
        isEdit,
        passVisible,
        togglePassVision,
        userType,
        isAvailable,
        setAvailable,
    } = props.values;
    // const [dateOfBirth, setDateOfBirth] = useState(moment());
    // const [genderValue, setGender] = React.useState("male");
    // const [value, setValue] = React.useState("");
    const [isFormExpanded, toggleExpansion] = useToggle(false);
    const [isDialogOpen, toggleDialog] = useToggle(false);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleMailChange = e => {
        setEmail(e.target.value);
    };
    const handlePassChange = e => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <div className={classes.profileCredentials}>
                <div
                    className={classes.avatarContainer}
                >
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            <AddRoundedIcon
                                fontSize="large"
                                className={classes.badgeIcon}
                                onClick={() => toggleDialog()}
                            />
                        }
                    >
                        <Avatar
                            className={classes.avatar}
                        />
                    </Badge>
                </div>
                <div>
                    <form
                        className={classes.profileInfoForm}
                    >
                        <TextField
                            className={classes.margin}
                            fullWidth
                            label="Full Name"
                            required
                            variant="outlined"
                            value={userName}
                            onChange={handleNameChange}
                        />
                        <TextField
                            className={classes.margin}
                            fullWidth
                            label="E-Mail"
                            required
                            variant="outlined"
                            value={userMail}
                            onChange={handleMailChange}
                            disabled
                        />
                        {
                            userType === "Staff" && <div>
                                <div className={classes.toggleSwitch}>
                                    <Typography className={classes.switchText}>{isAvailable ? "In Office" : "Out of Office"}</Typography>
                                    <Switch
                                        checked={isAvailable}
                                        name="isAvailable"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        onClick={
                                            () => {
                                                setAvailable(isAvailable => !isAvailable);
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
            <div className={classes.accountCredentials}>
                <div
                    className={classes.lowerDivHeader}
                    onClick={() => toggleExpansion()}
                >
                    <Typography className={classes.lowerDivHeading}>Account Info</Typography>
                    {isFormExpanded ? <ExpandLess /> :
                        <ExpandMore />}
                </div>
                {
                    isFormExpanded ?
                        <div
                            className={classes.accountInfoFields}
                            style={!isFormExpanded ? {
                                display: "none",
                            }
                                :
                                {
                                    display: "flex",
                                }
                            }
                        >
                            <FormControl
                            >
                                <TextField
                                    className={classes.margin}
                                    fullWidth
                                    type="text"
                                    label="E-MAil"
                                    variant="outlined"
                                    required
                                    value={userMail}
                                    onChange={handleMailChange}
                                    disabled
                                />
                            </FormControl>
                            <FormControl
                                required
                                variant="outlined"
                                className={classes.margin}
                            >
                                <InputLabel htmlFor='password'>Password</InputLabel>
                                <OutlinedInput
                                    id="password"

                                    type={passVisible ? "text" : "password"}
                                    label="Password"
                                    value={userPass}
                                    onChange={handlePassChange}
                                    placeholder={isEdit ? "Unchanged" : ''}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={togglePassVision}
                                                edge="end"
                                            >
                                                {passVisible ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        : ''
                }
            </div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="md"
                fullWidth
                open={isDialogOpen}
            >
                <DialogTitle>
                    <Typography>Edit avatar</Typography>
                </DialogTitle>
                <DialogContent>
                    {/* <AvatarEdit /> */}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => toggleDialog()}
                    >
                        Back Page
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(UserProfileForm);