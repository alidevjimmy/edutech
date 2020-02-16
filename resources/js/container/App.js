import React , { useState} from 'react'
import ReactDOM from 'react-dom'
import FormComponent from "../components/FormComponent";

const App = () => {
    return (
        <>
            <FormComponent />
        </>
    )
}

if(document.getElementById('app')) {
    ReactDOM.render(<App/> , document.getElementById('app'));
}
