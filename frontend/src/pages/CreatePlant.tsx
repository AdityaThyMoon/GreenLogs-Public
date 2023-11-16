import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const CreatePlant = () => {
    // const [name, submitName] = useState("");
    // const [age, submitAge] = useState("");
    // const [picture, submitPicture] = useState("");
    const [newUser, setNewUser] = useState(
        {
            name: '',
            age: ''
        }
    );
    const [picture, setPicture] = useState<File>();
    // const formData = new FormData();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [e.currentTarget.name]: e.currentTarget.value});
    }

        // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //     // const files = e.target.files;
        //     // // console.log(files)
        //     // if (!files) return console.log('none');
        //     // setPicture(files[0])
        //     // formData.append("picture", files[0]);
        // };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var formData = new FormData();
        var imagefile = document.querySelector('#picture');
        formData.append("picture", imagefile.files[0]);
        // base64
        formData.append('age', newUser.age);
        formData.append('name', newUser.name); 

        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        setLoading(true)
        // alert("S")
        axios('upload_file', {
            method: "post",
            url: "http://localhost:2700/plants",
            data: formData,
            // headers: { "Content-Type": "application/json" },
        })
        // axios.post("http://localhost:2700/plants", formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     transformRequest: formData => formData,
        //   })
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false);
                alert("Plant creation failed. Please check console for error.");
                if (error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    //do something
                    
                    }else if(error.request){
                        console.log("B")
                    //do something else
                    
                    }else if(error.message){
                        console.log("C")
                    //do something other than the other two
                    
                    }
            });
    };
    return (
//<form id="uploadForm" action='upload_file' role="form" method="post" encType="multipart/form-data"  onSubmit = {handleSubmit}>
        <form onSubmit = {handleSubmit} encType = "enctype='multipart/form-data">
            <label>Title</label>
            <input type = "text" value = {newUser.name} name = "name" onChange = {handleChange}/>
            <br/>
            <label>Age</label>
            <input type = "text" value = {newUser.age} name = "age" onChange = {handleChange}/>
            <br/>
            <label>Image (optional)</label>
            <input 
                type = "file"
                // accept = ".png .jpg .jpeg .webm"
                name = "picture" 
                id = "picture"
                // value = {newUser.picture}
                // onChange = {handleImageChange}
                />
            <br/>
            {/* <button onClick = {handleSubmit}>Submit</button> */}
            <input type = "submit"/>
        </form>
  )
}

export default CreatePlant
