import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import UserInfo from './UserInfo.js';


const UserEntryForm = props => {
    const [ourUsers, setOurUsers] = useState([]);

    useEffect(() => {
        if(props.status){
            setOurUsers([...ourUsers, props.status]);
        }
    }, [props.status]);


    return (
        <div>
            <Form>
                <Field type="text" name="userName" placeholder="Name"/>
                 {props.touched.userName && props.errors.userName && (
                     <p className="error">{props.errors.userName}</p>
                 )}
                 <Field type="text" name="email" placeholder="Email"/>
                 {props.touched.email && props.errors.email && (
                     <p className="error">{props.errors.email}</p>
                 )}
                 <Field type="text" name="password" placeholder="Password"/>
                 {props.touched.password && props.errors.password && (
                     <p className="error">{props.errors.password}</p>
                 )}
                 <label className="checkbox-container">
                    <Field type="checkbox" name="serviceTerms" checked={props.values.serviceTerms} />
                       
                        Terms of Service
                    <span className="checkmark" />
                </label>

                <button type="submit">Submit</button>

            </Form>
            <UserInfo users={ourUsers}/>
        </div>
        
    );
};

const myMapPropsToValues = props => {
    //console.log(props.userName);
    const formObj = {
        userName: props.userName || "",
        email: props.email || "",
        password: props.password || "",
        serviceTerms: props.serviceTerms || false
    };
    return formObj;
};

const myHandleSubmit = (values, {setStatus}) => {
    console.log("submit worked");
    //console.log(values);
    async function sendUser (){
        try{
            const userData = await axios.post('https://reqres.in/api/users',values);
            //console.log(userData);
            //console.log(userData.data);
            setStatus(userData.data);
        }catch(err){
            console.log(err);
        }
    }
    sendUser();
}



const yupSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter your name"),
    email: Yup.string().required("Please enter your email"),
    password: Yup.string().required("Please enter a password")
});


const formikObj = {
    mapPropsToValues: myMapPropsToValues,
    handleSubmit: myHandleSubmit,
    validationSchema: yupSchema
};


const EnhancedFormHOC = withFormik(formikObj);
const EnhancedUserForm = EnhancedFormHOC(UserEntryForm);

export default EnhancedUserForm;