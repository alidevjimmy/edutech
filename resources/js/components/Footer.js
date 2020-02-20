import React, {useState} from 'react'
import {KeyboardArrowUp, KeyboardArrowDown, Place, Phone, Close} from "@material-ui/icons";
import {IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import {Container, Col, Row} from 'react-bootstrap'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const Footer = () => {
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    return (
        <>
            <div style={{width: '100%', height: 'auto', textAlign: 'center', position: 'absolute', bottom: '0px'}}>
                {!open ? <>
                    <IconButton onClick={() => setOpen(!open)}>
                        <KeyboardArrowUp style={{color: 'white', fontSize: '62px'}}/>
                    </IconButton>
                </> : <>
                    <IconButton onClick={() => setOpen(!open)}>
                        <KeyboardArrowDown style={{color: 'white', fontSize: '62px'}}/>
                    </IconButton>
                </>}
            </div>
            <div className={`${open ? 'footer' : null}`} style={open ? {
                backgroundColor: '#281047',
                width: '100%',
                height: 'auto',
                position: 'absolute',
                bottom: '0',
                transition: '1s all',
                paddingBottom: '36px',
            } : {
                backgroundColor: '#281047',
                width: '100%',
                height: 'auto',
                position: 'absolute',
                bottom: '-100%',
                transition: '1s all',
                paddingBottom: '36px',
                display: 'none'
            }}>
                <Container style={{ textAlign : 'right' }}>
                    {open ? <>
                        <br/>
                        <IconButton style={{color: 'white'}} color='inherit' onClick={() => setOpen(!open)}>
                            <Close className={'cancleFooter'}/>
                        </IconButton></> : null}
                </Container>
                <Container style={{color: 'white', textAlign: 'right', display: 'flex'}}>
                    <div className={'col'}>
                        <br/>
                        <Place/>
                        <span>    </span>
                        <span>
                        همدان، خیابان طالقانی خیابان فرهنگ، مرکز رشد دانشگاه بوعلی
                    </span>
                        <br/>
                        <br/>
                        <Phone/>
                        <span>    </span>
                        <span>
                        081-38267981
                    </span>
                    </div>
                    <div className={'col'}>
                        <br/>
                        <a target='_blank' href="http://khishavere.com"><img src="/images/khishavere.png" className={'logo'}  alt='خیشاوره'/></a>
                        <a target='_blank' href="http://roshd.basu.ac.ir/"><img src="/images/MR.logo.png" className={'logo'} alt='http://roshd.basu.ac.ir/'/></a>
                        <a target='_blank' href="http://www.edutech.co/"><img src="/images/edutech.logo.png" className={'logo'} alt='اجوتک'/></a>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer
