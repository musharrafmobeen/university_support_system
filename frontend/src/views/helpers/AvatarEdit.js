import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import Avatar from "react-avatar-edit";
import styles from "../../styles/helpersStyles/AvatarEditStyles";

function AvatarEdit(props) {
    const { classes } = props;

    const { userImg, setUserImg } = props.values;

    const [preview, setPreview] = useState(null);
    let src = userImg;
    const onClose = () => {
        setPreview(null);
    }

    const onCrop = (preview) => {
        setPreview(preview);
        setUserImg(src);
    }

    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 25165824) {
            alert("File is too big!");
            elem.target.value = "";
        };
    }
    return (
        <div
            className={classes.editCanvas}
        >
            <Avatar
                width={390}
                height={295}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
                src={src}
                exportMimeType="image/jpeg"
                exportQuality={0.5}
            />
            <img src={preview} alt="Preview" />
        </div>
    );
}

export default withStyles(styles)(AvatarEdit);