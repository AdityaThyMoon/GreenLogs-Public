import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';
import CreatePlant from './CreatePlant';
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import FileBase64 from 'react-file-base64';

const Homepage = () => {
    const [loading, setLoading] = useState(false);
    const [plants, setPlants] = useState([]);

    const handleImageInput = (e: React.FormEvent<HTMLInputElement>) => {
        return setPlants({...plants, [e.currentTarget.name]: base64})
    }

  useEffect(() => {
    setLoading(true);
    axios
        .get("http://localhost:2700/plants")
        .then((res) => {
            setPlants(res.data.data);
            setLoading(false);
            // plants.map((plant) => (
            //     console.log(plant)
            //     )
            // )
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
  })
  return (
    <div>
        <div className = "flex justify-between">
            <h2>Plants</h2>
            <Link to = "/plants/create">
                <MdOutlineAddBox/>
            </Link>
        </div>
        <table>
            <thead>
            <tr>
                <th>Name</th>   
                <th>Age</th>
                <th>Picture</th>   
                <th>Operations</th>
            </tr>
            </thead>
            <tbody>
            {plants.map((plant) => (
                    <tr>
                        <th>{plant.name}</th>
                        <td>{plant.age}</td>
                        {/* <td>{plant._id}</td> */}
                        {/* <td><FileBase64 name = "picture" multiple = {false} onDone = {({base64: any}) => handleImageInput(base64, e)}/></td> */}
                        <td>{plant.picture}</td>
                    </tr>
                )
            )}
            </tbody>
        </table>
    </div>
  )
}

export default Homepage