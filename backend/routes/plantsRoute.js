import express from "express";
import { Plant } from "../models/plantModel.js";
import fs from "fs";
import multer from "multer";
import {v4 as uuidv4} from 'uuid';
import path from "path";
import mongodb from "mongodb";
import upload from "../middleware/upload.js";
import dotenv from "dotenv";
import gridfsbucket from "multer-gridfs-storage";

// const URL = process.env.BROWSER_URL

// const baseURL = "http://localhost:2700/plants/";

// dotenv.config({path:'../setup.env'});

// const mongoClient = new mongoClient(url);

const router = express.Router();

router.route("/").post(async (req, res) => {
    console.log(req.body)
    // let image = await fs.readFile(req.body.picture)
    try {
        // if(req.body.picture) {
        //     obj = await upload(req.file, res)
        // }
        if(!req.body.name || !req.body.age) {
            return res.status(400).send({
                message: "Make sure that you send all required fields"
            });
        }
        
        const newPlant = {
            picture: req.body.picture,
            name: req.body.name,
            age: req.body.age
        }
        // console.log(newPlant)
        const plant = await Plant.create(newPlant);
        // plant.save()
        // .catch(err => res.status(400).json('Error: ' + err));

        return res.status(201).send(plant)
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message});
    };
});

router.get("/", async (req, res) => {
    try {
        const plants = await Plant.find({});

        return res.status(200).json({
            total: plants.length,
            data: plants
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const requestedPlant = await Plant.findById(id);

        return res.status(200).json(requestedPlant);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message});
    }
})

router.put("/:id", async (req, res) => {
    try {
        if(!req.body.name || !req.body.age) {
            return res.status(400).send({ message: "Please make sure no fields are empty." });
        }
        const { id } = req.params; 
        const updatedPlant = await Plant.findByIdAndUpdate(id, req.body);
        // if it doesn't exist in the first place, don't update it
        if(!updatedPlant) {
            return res.status(404).json({ message: "Plant not found" });
        }
        return res.status(200).send({ message: "Plant updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedPlant = await Plant.findByIdAndDelete(id, req.body);
        if(!deletedPlant) {
            return res.status(404).json({ message: "Plant not found" });
        }
        res.status(200).send({ message: "Plant deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message});
    }
});

export default router;
