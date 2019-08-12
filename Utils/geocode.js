
const request= require('request');

const geocode = (adresse,callback)=>
{
   const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(adresse)+'.json?access_token=pk.eyJ1IjoibWlsYWRzIiwiYSI6ImNqeXBtN2oxajBiY2IzbHVmZDgwOHlkeXQifQ.IBPQxfWoIy9jQDkBymE_wQ&limit=1';
   request({url,json:true},(error,{body})=>
{
  if(error)
  {
 callback('Unable to connect!')
  }
  else if (body.features.length===0)
  {
   callback('unable to find location');
  }
  else{
      callback(undefined,{
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
    });

}
})

}
module.exports=geocode