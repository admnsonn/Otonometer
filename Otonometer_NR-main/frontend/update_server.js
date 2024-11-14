const express = require('express')
const app = express()
const port = 3330
const { exec } = require("child_process")

app.get('/', (req, res) => {
    exec("rm -R build", (error, stdout, stderr) => {
        if(error){
            res.send(`error: ${error.message}`);
            return;
        }
        if(stderr){
            res.send(`stderr: ${stderr}`)
            return;
        }
        exec("unzip build.zip", (err, dout, derr)=> {
            if(err){
                res.send(`error: ${err.message}`);
                return;
            }
            if(derr){
                res.send(`stderr: ${derr}`);
                return;
            }
            res.send('updated!')
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
