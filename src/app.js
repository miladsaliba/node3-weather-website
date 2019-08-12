
const path=require('path');
const express= require('express');
const hbs=require('hbs');
const app=express()
const geocode =require("../Utils/geocode");
const forecast=require("../Utils/forecast")

//a
//define paths for Express config 
const viewPath=path.join(__dirname,'../templates/views');
const publicPath=path.join(__dirname,'../public');
const partials=path.join(__dirname,'../templates/partials');

//handlebars engines and views location

console.log("partials "+partials);
app.set('view engine','hbs');
app.set('views',viewPath)
hbs.registerPartials(partials);

//static directory to serve
app.use(express.static(publicPath));

app.get('', (req,res)=>
{
    res.render('index',{
        title:"Weather",
        name:"Milad"
    });
    
})


app.get('/about', (req,res)=>
{
    res.render('about',{
        title:"About",
        name:"Milad"
    });
    
})

app.get('/help', (req,res)=>
{
    res.render('help',{
        title:"Help",
        content:"Here is your help",
        name:"Milad"
    });
    
});

app.get('/products', (req,res)=>
{
    if(!req.query.search)
    {
      return res.send({
     error:'You must insert a search term'
       
      });
      
    }
    console.log(req.query);
    res.send({
        products:[]
    })
  
})


             
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
       

                
            
    



app.get('/help/*', (req,res)=>
{
    res.render('404Page',{
        title:"404 Page",
        content:"Such help page do not exist",
        name:"Milad"
    });
    
})




app.get('/*', (req,res)=>
{
    res.render('404Page',{
        title:"404 Page",
        content:"Such page do not exist",
        name:"Milad"
    });
    
});




app.listen(3000,()=>
{
    console.log("server is up");
});