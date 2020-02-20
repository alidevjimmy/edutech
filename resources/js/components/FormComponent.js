import React, {useState, useEffect} from 'react'
import style from '../styles/app.css'
import {Form} from 'react-bootstrap'
import {KeyboardBackspace, KeyboardArrowRight, Check} from '@material-ui/icons'
import {IconButton, Button, makeStyles} from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import {green} from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: 'rgb(255, 242, 0)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    typography: {
        fontFamily: [
            'IRANSans',
        ].join(','),
    }
}));


const FormComponent = () => {
    const [state, setState] = useState(1);
    const [name, setName] = useState('')
    const [family, setFamily] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [nameE, setNameE] = useState(0)
    const [familyE, setFamilyE] = useState(0)
    const [phoneE, setPhoneE] = useState(0)
    const [descriptionE, setDescriptionE] = useState(0)
    const [lable, setLable] = useState('نام')
    const backLbale = ['نام', 'نام خانوادگی', 'شماره تماس', 'توضیحات']
    const inputLable = ['name', 'family', 'phone', 'description']
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [submitLoading, setSubmitLoading] = useState(false)
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const [variant, setVariant] = useState('');
    const [message, setMessage] = useState('')
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        switch (state - 1) {
            case 0 :
                setLable('نام')
                break;
            case 1 :
                setLable('نام خانوادگی')
                break;
            case 2 :
                setLable('شماره تماس')
                break;
            case 3 :
                setLable('توضیحات')
                break;
        }
    })

    const goNext = () => {
        if (state <= 4) {
            switch (state) {
                case 1 :
                    if (name != '') {
                        setState(state + 1)
                    } else {
                        setNameE(1)
                    }
                    break;
                case 2 :
                    if (family != '') {
                        setState(state + 1)
                    } else {
                        setFamilyE(1)
                    }
                    break;
                case 3 :
                    if (phone != '') {
                        setState(state + 1)
                    } else {
                        setPhoneE(1)
                    }
                    break;
                case 4 :
                    if (description != '') {
                        setState(state + 1)
                    } else {
                        setDescriptionE(1)
                    }
                    break;
            }
        }
    }

    const goBack = () => {
        if (state >= 2) {
            setState(state - 1)
        }
    }

    const onChange = (e) => {
        // e.preventDefault();
        switch (state) {
            case 1 :
                setName(e.target.value)
                if (name == '' || name == null) {
                    setNameE(1)
                } else {
                    setNameE(0)
                }
                break;
            case 2 :

                setFamily(e.target.value)
                if (family == '' || family == null) {
                    setFamilyE(1)
                } else {
                    setFamilyE(0)
                }
                break;
            case 3 :

                setPhone(e.target.value)
                if (phone == '' || phone == null) {
                    setPhoneE(1)
                } else {
                    setPhoneE(0)
                }
                break;
            case 4 :

                setDescription(e.target.value)
                if (description == '' || description == null) {
                    setDescriptionE(1)
                } else {
                    setDescriptionE(0)
                }
                break;
        }
    }

    const submit = (e) => {
        // e.preventDefault();
        if (description == '' || description == null) {
            setDescriptionE(1);
        }
        if (name != '' && family != '' && phone != '' && description != '') {
            setSubmitLoading(true)
            const data = {
                name,
                family,
                phone,
                description
            }
            axios.post('http://hamedan-founders.ir/api/store', data)
                .then(res => {
                    setVariant('success')
                    setMessage('اطلاعات با موفقیت ثبت شد')
                    setSubmitLoading(false)
                    setSuccess(true);
                })
                .catch(err => {
                    setVariant('error')
                    setMessage('خطا در برقراری با سرور ، دوباره تلاش کنید')
                    setSubmitLoading(false)
                    setSuccess(false);
                })
        }
    }

    return (
        <div className='background_color_body form'>
            {variant != '' && variant != null ? <>
                <Alert variant="filled" severity="success">
                    {message}
                </Alert><br/></> : null}
            <div style={{width: '100%', padding: '0px 23px 28px 10px', textAlign: 'right'}}>

                <div style={{cursor: 'pointer', display: 'contents'}} onClick={goBack}>

                    <KeyboardArrowRight style={{color: 'white'}} className='links'/>
                    <span style={{color: '#fff', fontSize: '12px'}}
                          className='links'> بازگشت {state != 1 ? ` به ${backLbale[state - 2]}` : null}</span>
                </div>
            </div>
            <Form>
                <Form.Group controlId="formBasicEmail" style={{margin: '0 30px'}}>
                    <Form.Label
                        style={{float: 'right', color: 'white', fontSize: '13px', fontWeight: 'bold'}}>
                        {lable}
                    </Form.Label>
                    {state == 1 ? <Form.Control type="text" name={inputLable[state - 1]}
                                                onChange={onChange}
                                                value={name}
                                                onKeyPress={(ev) => {
                                                    if (ev.key === 'Enter') {
                                                        goNext()
                                                    }
                                                }}
                                                autoFocus
                                                placeholder={state != 4 ? `${lable} خود را وارد کنید ` : null}

                                                style={nameE ?
                                                    {
                                                        border: '2px solid rgb(244, 67, 54)',
                                                        borderRadius: '0', backgroundColor: '#160031',
                                                        // border: 'none',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        paddingLeft: '46px',
                                                    } : {
                                                        backgroundColor: '#160031',
                                                        border: 'none',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        paddingLeft: '46px',
                                                    }}/> : null}
                    {
                        state == 2 ? <Form.Control type="text" name={inputLable[state - 1]}
                                                   onChange={onChange}
                                                   value={family}
                                                   onKeyPress={(ev) => {
                                                       if (ev.key === 'Enter') {
                                                           goNext()
                                                       }
                                                   }}
                                                   autoFocus
                                                   placeholder={state != 4 ? `${lable} خود را وارد کنید ` : null}
                                                   style={familyE ?
                                                       {
                                                           border: '2px solid rgb(244, 67, 54)',
                                                           borderRadius: '0', backgroundColor: '#160031',
                                                           // border: 'none',
                                                           color: 'white',
                                                           fontSize: '14px',
                                                           paddingLeft: '46px'
                                                       } : {
                                                           backgroundColor: '#160031',
                                                           border: 'none',
                                                           color: 'white',
                                                           fontSize: '14px',
                                                           paddingLeft: '46px'
                                                       }}/> : null
                    }
                    {
                        state == 3 ? <Form.Control type="text" name={inputLable[state - 1]}
                                                   onChange={onChange}
                                                   value={phone}
                                                   onKeyPress={(ev) => {
                                                       if (ev.key === 'Enter') {
                                                           goNext()
                                                       }
                                                   }}
                                                   autoFocus
                                                   placeholder={state != 4 ? `${lable} خود را وارد کنید ` : null}
                                                   style={phoneE ?
                                                       {
                                                           border: '2px solid rgb(244, 67, 54)',
                                                           borderRadius: '0', backgroundColor: '#160031',
                                                           // border: 'none',
                                                           color: 'white',
                                                           fontSize: '14px',
                                                           paddingLeft: '46px'
                                                       } : {
                                                           backgroundColor: '#160031',
                                                           border: 'none',
                                                           color: 'white',
                                                           fontSize: '14px',
                                                           paddingLeft: '46px'
                                                       }}/> : null
                    }
                    {
                        state == 4 ? <Form.Control type="text" name={inputLable[state - 1]}
                                                   onChange={onChange}
                                                   value={description}
                                                   as="textarea" rows="3"
                                                   onKeyPress={(ev) => {
                                                       if (ev.key === 'Enter') {
                                                           submit()
                                                       }
                                                   }}
                                                   autoFocus
                                                   placeholder='چرا میخواهید با شتابدهنده همکاری کنید؟'
                                                   style={descriptionE ?
                                                       {
                                                           border: '2px solid rgb(244, 67, 54)',
                                                           borderRadius: '0', backgroundColor: '#160031',
                                                           // border: 'none',
                                                           color: 'white',
                                                           fontSize: '14px',
                                                           paddingLeft: '46px'
                                                       } : {
                                                           backgroundColor: '#160031',
                                                           border: 'none',
                                                           color: 'white',
                                                           fontSize: '14px',
                                                           paddingLeft: '46px'
                                                       }}/> : null
                    }
                    <div style={{
                        width: `${25 * state}%`,
                        height: '4px',
                        backgroundColor: `${state == 4 && name != '' && family != '' && phone != '' && description != '' ? '#fff200' : '#fff200'}`,
                        transition: '0.5s all'
                    }}></div>
                    {state != 4 ? <IconButton style={{position: 'relative', top: '-45px'}} onClick={goNext}>
                        <KeyboardBackspace style={{color: 'white'}}/>
                    </IconButton> : <div className={classes.wrapper} style={{padding: '0', margin: '0'}}>
                        {
                            !success ? <><Button
                                    variant="contained"
                                    color="primary"
                                    className={buttonClassname}
                                    disabled={submitLoading}
                                    onClick={submit}
                                    style={{
                                        fontFamily: 'IRANSans',
                                        backgroundColor: '#160031',
                                        marginTop: '10px',
                                        width: '118px'
                                    }}

                                >
                                    <div style={submitLoading ? {color: '#281047'} : {color: 'white'}}>
                                        ثبت اطلاعات
                                    </div>
                                </Button>
                                    {submitLoading &&
                                    <CircularProgress size={24} style={{left: '57px', top: '29px', position: 'absolute'}}
                                                      className={classes.buttonProgress}/>}</>
                                : <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={buttonClassname}
                                        disabled
                                        style={{
                                            fontFamily: 'IRANSans',
                                            backgroundColor: '#4caf50',
                                            marginTop: '10px',
                                            width: '118px'
                                        }}
                                    >
                                        <Check size={24} style={{color: 'white'}}/>
                                    </Button>
                                </>
                        }
                    </div>}

                </Form.Group>
            </Form>
        </div>
    )
}

export default FormComponent
