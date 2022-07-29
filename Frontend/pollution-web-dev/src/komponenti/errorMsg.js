import React from "react";
import style from './errorMsgStyle.module.css'

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';



class SidePanel extends React.Component {

    componentDidMount() {
        setTimeout( this.props.closeErrDiv,4000)
    }


    render() {
        return (
            <div className={style.container}>
                <ErrorOutlineIcon className={style.errIcon} />
                <center><h3>{this.props.errorMessage}</h3></center>

            </div>
        )
    }

}

export default SidePanel