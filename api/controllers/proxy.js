import axios from "axios";
import User from "../models/User.js"
const base_url = "https://nsocks.network";

// search for a proxies
export const searchProxy = async(req, res) => {
    if(!req.body.COUNTRY) return res.status(400).json("country field required");
    const data = {...req.body, API_KEY: process.env.NSOCKS_API_KEY}
    try {
        const result = await axios.post(`${base_url}/api/search`, data);
        res.status(200).json(result.data);
    }catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

// buy a proxy
export const buyProxy = async(req, res) => {
    const { USERNAME, PASSWORD, ID } = req.body;
    if(!USERNAME || !PASSWORD || !ID) return res.status(400).json("All fields are required");
    
    const data = {...req.body, API_KEY: process.env.NSOCKS_API_KEY}

    try {
        const result = await axios.post(`${base_url}/api/buy`, data);
        await User.findByIdAndUpdate(user.id, {
            $push: { 
                proxyIds: result.data.DATA.PROXY.ID
            }
        })
        res.status(200).json(result.data);
    }catch(err) {
        res.status(500).json(err);
    }
}

// get details of a proxy by id
export const getProxyInfoById = async(req, res) => {
    const { ID } = req.body;
    if(!ID) return res.status(400).json("All fields are required");
    
    const data = {...req.body, API_KEY: process.env.NSOCKS_API_KEY}

    try {
        const result = await axios.post(`${base_url}/api/proxy`, data);
        res.status(200).json(result.data);
    }catch(err) {
        res.status(500).json(err);
    }
}

// get account balance
export const getAccountBalance = async(req, res) => {
    const data = {...req.body, API_KEY: process.env.NSOCKS_API_KEY}

    try {
        const result = await axios.post(`${base_url}/api/balance`, data);
        res.status(200).json(result.data);
    }catch(err) {
        res.status(500).json(err);
    }
}

// get bought proxy history
export const getBoughtProxyHistory = async(req, res) => {
  
    const data = {...req.body, API_KEY: process.env.NSOCKS_API_KEY}

    try {
        const result = await axios.post(`${base_url}/api/history`, data);
        res.status(200).json(result.data);
    }catch(err) {
        res.status(500).json(err);
    }
}

// get bought proxy history
export const getProxiesByCountry = async(req, res) => {
  
    const data = {...req.body, API_KEY: process.env.NSOCKS_API_KEY}

    try {
        const result = await axios.post(`${base_url}/api/countries`, data);
        res.status(200).json(result.data);
    }catch(err) {
        res.status(500).json(err);
    }
}
