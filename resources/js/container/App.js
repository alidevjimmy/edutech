import React , { useState} from 'react'
import ReactDOM from 'react-dom'
import FormComponent from "../components/FormComponent";
import Footer from '../components/Footer'

const App = () => {
    return (
        <>
            <FormComponent />
            <Footer />
        </>
    )
}

if(document.getElementById('app')) {
    ReactDOM.render(<App/> , document.getElementById('app'));
}
