import express from 'express'
import  serveStatic from  '@suntower/serve-static2'
import path from 'path'
import  cors from 'cors';
import {diff} from 'jsondiffpatch'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

import  bodyParser from 'body-parser'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 现在，你可以在 ES 模块中使用 __dirname 变量了



const app = express()

app.use(cors());
app.use(serveStatic(path.join(__dirname, 'dist'), { tryFile: '/index.html' }))


app.use(bodyParser.json({limit : '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/json_diff",(req,res)=>{
    const {left,right} = req.body;
    if(left && right){
        try{
        res.json(
            {ok:true,data:diff(left,right)})
        }catch(e){
            res.json({ok:false,error:e})
        }

    }else{
        res.json({ok:false,error:"left and right are required"})
    }
})

const port = process.env.PORT || 5000
app.listen(port)
