import { useTheme } from '@material-ui/core';
import React,{useContext} from 'react';
import {ThemeModeContext} from '../../contexts/ThemeModeContext';
function PageContent(props) {
    const {isDarkMode} = useContext(ThemeModeContext);
    const bgColor = props.bgColor;
    const theme = useTheme();
    const styles = {
        backgroundColor:bgColor?bgColor:`${theme.mainBgColor}`,
        minHeight:"100vh",
        height: "100%",
        width: "100%",
    }
    return (
        <div style={styles}>
            {/* {console.log(theme)}
            {console.log(isDarkMode)} */}
            {props.children}
        </div>
    );
}

export default PageContent;