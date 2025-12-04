const express = require('express');
const app = express();

const port = 4000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "home page"
    })
})

// app.use((req, res) => {
//     res.status(501).json({ message: "not built" });
// });


app.listen(port,()=>{
    console.log(`server is started at http://localhost:${port}`)
})