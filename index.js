const express=require('express');
const app=express();
const morgan=require('morgan'); 
const AppError=require('./async Error/Mongodb-Express/AppError');

// app.use(()=>{
//     console.log('Heyy Heyy Heyy'); // this will print everytime when i call any request
// })
// app.use(morgan('common'));
// app.use((req,res,next)=>{
//     console.log(req.method.toUpperCase());
//     next(); 
// })

// app.use((req,res,next)=>{
//     console.log('this is my first middleware');
//     next(); // it tells that go for next middleWare dont stop here
//     console.log('this my first middle after calling Next()')

// })
// app.use((req,res,next)=>{
//     console.log('this is my second middleware');
//     next();
// })

// app.use((req,res,next)=>{
//     const {password}=req.query;
//     if(password==='hello'){
//         next();
//     }
//     res.send('Sorry you need a password');
// })

const verifypassword=(req,res,next)=>{
        const {password}=req.query;
        if(password==='hello'){
            next();
        }
        // res.status(401);
        // res.send('Sorry you need a password');
        // throw new Error('password required');

        throw new AppError('password required',401);
        
    }

app.get('/error',(req,res)=>{
    hello.fly();
})
app.get('/',(req,res)=>{
    res.send("home page");
})
app.get('/dog',(req,res)=>{
    res.send("Dog page");
})
app.get('/secret',verifypassword,(req,res)=>{
    res.send('My scret Is:somethime I wear headphones in public so i dont')
})
// app.use((err,req,res,next)=>{
//     console.log("*****************************");
//     console.log("*********Error***************");
//     console.log("*****************************");
//     // res.status(500).send("ohh boy we got an error")
//     next();
    
    
// })
app.listen(3000,()=>{
    console.log('App is running on the local Host :3000')
})