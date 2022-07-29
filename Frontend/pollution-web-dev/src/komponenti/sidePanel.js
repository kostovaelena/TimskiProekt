import React from "react";
import Collapse from 'react-bootstrap/Collapse'
import disiKvalitetnoLogo from  "./logo/disiKvalitetno_Logo.png"
import inteligentaLogo from './logo/logo-inteligenta_dark.png'
import finkiLogo from './logo/logo_finki_dark.png'
import androidApp from './logo/download-android.svg'
import iosApp from './logo/download-apple.svg'
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import ShareIcon from '@material-ui/icons/Share';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';



import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    InstapaperShareButton,
    InstapaperIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    ViberShareButton,
    ViberIcon,
} from "react-share";

import style from './sidePanelStyle.module.css'
import {Link} from "react-router-dom";

class SidePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            aboutIsOpen:false,
            shareIsOpen:false
        }
    }


    render() {
        let iconSize = 50;
        let url = window.location.href;

        return(
            <div className={style.containerDiv}>

                <div className={style.pmAlarmLogoDiv}>
                    <img className={style.pmAlarmLogoImage} src={disiKvalitetnoLogo} />
                </div>
                {/*About System*/}
                <div className={style.aboutSystemButtonDiv} onClick={() =>this.setState({aboutIsOpen:!this.state.aboutIsOpen})} >

                    <div className={style.aboutSystemButtonImageDiv}>
                        <FilterDramaIcon className={style.aboutSystemButtonImage}/>
                    </div>
                    <div className={style.aboutSystemButtonTitleDiv}>
                        <h4 className={style.aboutSystemButtonTitle}>За системот</h4>
                    </div>

                </div>
                <Collapse in={this.state.aboutIsOpen}>
                    <div className={style.aboutSystemTextDiv}>
                        <h5 className={style.aboutSystemTextTitle}>Прогноза на квалитет на воздух</h5>
                        <p className={style.aboutSystemText}>
                            Податоците во апликацијата се резултат на нумерички систем за атмосферско - хемиска симулација за прогноза на квалитетот на воздухот.
                            Проценка на квалитетот на воздухот се прави за квадратни површини (региони) со димензии од 5км и со часовна прогноза за следни 4 дена.
                            Податоците се добиваат со симулациски методи и можни се несогласувања со измерените вредности, особено затоа што мерењата од мерните станици се однесуваат на локални услови,
                            а симулацијата дава просек на ниво на регион.<br/><br/>

                            Системот за прогноза е развиен од страна на тимот научници од ФИНКИ – УКИМ, Македонија, Техничкиот универзитет во Виена, Австрија и Универзитетот во Сао Паоло, Бразил.
                            Симулациите се извршуваат на процесирачките капацитети на ФИНКИ. Апликацијата е развиена од страна на ИНТЕЛИГЕНТА ДОО.</p>
                    </div>
                </Collapse>

                {/*Privacy policy*/}
                <div className={style.shareButtonDiv} onClick={() =>this.setState({shareIsOpen:!this.state.shareIsOpen})} >

                    <div className={style.shareButtonImageDiv}>
                        <ShareIcon className={style.shareButtonImage}/>
                    </div>
                    <div className={style.shareButtonTitleDiv}>
                        <h4 className={style.shareButtonTitle}>Сподели</h4>
                    </div>

                </div>
                <Collapse in={this.state.shareIsOpen}>
                    <div className={style.sharePopupDiv}>
                        <h5 className={style.shareTextTitle}>Сподели на:</h5>
                        <div className={style.shareIcons}>
                            <FacebookShareButton url={url}>
                                <FacebookIcon className={style.shareIcon} size={iconSize} />
                            </FacebookShareButton>
                            <TwitterShareButton url={url}>
                                <TwitterIcon className={style.shareIcon} size={iconSize}/>
                            </TwitterShareButton>
                            <ViberShareButton url={url}>
                                <ViberIcon className={style.shareIcon} size={iconSize}/>
                            </ViberShareButton>
                            <LinkedinShareButton url={url}>
                                <LinkedinIcon className={style.shareIcon} size={iconSize}/>
                            </LinkedinShareButton>
                            <EmailShareButton url={url}>
                                <EmailIcon className={style.shareIcon} size={iconSize}/>
                            </EmailShareButton>
                        </div>
                    </div>
                </Collapse>

                <div className={style.iosAndroidLogoDiv}>
                    <a target="_blank" href="https://play.google.com/store/apps/details?id=mk.inteligenta.pmalarm">
                        <img src={androidApp} className={style.androidAppLogo}/>
                    </a>
                    <a target="_blank" href="https://apps.apple.com/us/app/%D0%BF%D0%BC-%D0%B0%D0%BB%D0%B0%D1%80%D0%BC-pm-alarm/id1495148911?ls=1">
                        <img src={iosApp} className={style.iosAppLogo}/>
                    </a>
                </div>

                <div className={style.inteligentaFinkiLogoDiv}>
                    <a target="_blank" href="https://inteligenta.io/">
                            <img src={inteligentaLogo} className={style.inteligentaLogo}/>
                    </a>
                    <a target="_blank" href="https://finki.ukim.mk/">
                            <img src={finkiLogo} className={style.finkiLogo}/>
                    </a>
                </div>

                {/*Close*/}
                <div className={style.closeButtonDiv} onClick={this.props.sidePanelvisible} >
                        <ExpandLessIcon className={style.closeButtonImage}/>
                </div>


            </div>
        )
    }
}
export default SidePanel