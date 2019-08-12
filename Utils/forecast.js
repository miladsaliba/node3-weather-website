const request= require('request');

const forecast= (latitude,longitude,callback)=>
{
    const url='https://api.darksky.net/forecast/b99a1af4a0d7cb98677f2620afd9c88a/'+latitude+','+longitude;

    request({url:url,json:true},(error,{body})=>
    {

        if(error)
        {
       callback('Unable to connect to forecast!')
        }
        else if(body.error)
        {
            callback("Unable to find Location "+body.error)
        }
        else
        {
            callback(undefined,{
                temperature:body.currently.temperature,
                probability:body.currently.precipProbability
            })
        }

    })
}

module.exports=forecast