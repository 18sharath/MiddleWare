const express=require('express')
const app=express()
const path=require('path')
const mongoose=require('mongoose')
const Product = require('./models/product')
const methodOverride=require('method-override')
const AppError=require('./AppError')
app.use(methodOverride('_method')); // because we usinf post method hence in form submission post not put hence we should use this
mongoose.connect('mongodb://localhost:27017/farmStand')
   .then(() => {
      console.log("COnnection open connected to mongo");
   })
   .catch(err => {
      console.log("ohh no error");
      console.log(err);
   });
app.use(express.urlencoded({extended:true})) // this is basically needs for post method
app.set('views',path.join(__dirname,'views'));
// This line sets the directory where your template files (views) are stored.
app.set('view engine','ejs');
/*Look in the views directory (set by app.set('views', ...)) for a file named index.ejs.
Use the EJS engine (set by app.set('view engine', 'ejs')) to render the file.
Send the rendered HTML back as the response.*/
app.get('/products',async(req,res)=>{
    
    const products=await Product.find({})
    // console.log(products);
    res.render('products/index',{products});
})
app.get('/products/New',(req,res)=>{
    // throw new AppError('Not allowed ',401)
    res.render('products/New');

})
app.post('/products', async(req,res,next)=>{
    // console.log(req.body);
    try{
    const newproduct=new Product(req.body);
    console.log(newproduct);
    await newproduct.save(); 
    res.redirect('products');
    }
    catch(e)
    {
        next(e);
    }
})
app.get('/products/:id',async(req,res,next)=>{
    try{
    const {id}=req.params;
     const product =await Product.findById(id);
     if(!product)
     {
        // return next(new AppError('id is wrong',401)); // return is important because 
        throw new AppError('id is wrong',401); // return is important because 
     }
    //  next()
     // if you pass inside next something it will read and redirect to last code if not move to net middleware
    //  console.log(product);
    //  res.send("details of the page is in the console");
    res.render('products/show',{product});
    }catch(e)
    {
        next(e);
    }
})

app.get('/products/:id/edit',wrapAsync(async(req,res,next)=>{
    // try{
    const {id}=req.params;
    const product= await Product.findById(id);
    if(!product)
        {
        //    return next(new AppError('id is wrong',401));
           throw new AppError('id is wrong',401);
        }
    // why await and async becuase mongoose is returning promises and it is asynchronous that'y ,
    //  without this will not wait until fecthing the from database it will render views as earlier than fetching the data
    res.render('products/edit',{product});
    // }catch(e)
    // {
    //     next(e);
    // }  

}))
// put http request used to edit the existing resource
//the PATCH method is used when only partial updates are needed for a resource.
app.delete('/products/:id',async(req,res,next)=>{
    try{
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    res.redirect('/products');
    }catch(e)
    {
        next(e);
    }

})
// put -> updating the product
// instead of doing it try and catch for every functiion we can use utility function so we can call at once
function wrapAsync(fun)
{
    return function(req,res,next){
        fun(req,res,next).catch(e=>next(e));
    }
}
app.put('/products/:id',wrapAsync( async(req,res,next)=>{ 
    // try{
    const {id}=req.params;
    const product= await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    console.log(req.body);
    // res.send('PUT!!!!!')
    res.redirect(`/products/${product._id}`)
    // }
    // catch(e)
    // {
    //     next(e);
    // }
}))
app.use((err,req,res,next)=>{
    const {status=500,message='Somenthing went wrong'}=err;
    res.status(status).send(message);
})
app.listen(3000,()=>{
    console.log("App is listening on port 3000!");
})