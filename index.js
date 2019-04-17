const express = require('express')
const path = require('path')
const request = require('request-promise-native')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express() 
app.use(bodyParser.json()) 

//load routes
app.post('/getmeasure-state', getMeasureState);
app.post('/errors', function (req, res) {
  console.error(req.body);
  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));



function getMeasureState(req, res) {
  const ent_measure = req.body.conversation.memory.ent_measure.raw;
  const ent_state_value = req.body.conversation.memory.ent_state_value.raw;
  const ent_state = req.body.conversation.memory.ent_state.raw;
  var xsjs_url = "http://74.201.240.43:8000/ChatBot/Sample_chatbot/Efashion_azure.xsjs?";
  
   if(ent_state)
   {
        ent_state=ent_state.split(" ").join("");
        xsjs_url = xsjs_url + '&ENT_STATE=' + ent_state;
   }
  if(ent_measure)
  {
      ent_measure=ent_measure.split(" ").join("");
      xsjs_url = xsjs_url  + '&ENT_MEASURE=' + ent_measure;
  }
   if(ent_state_value)
  {
      ent_state_value=ent_state_value.split(" ").join("");
      xsjs_url= xsjs_url + '&STATE=' + ent_state_value;
  }
  
  //call xsjs function
  getXSJSresult(xsjs_url,res);
 
}


//xsjs call
function getXSJSresult(xsjs_url,res) {
  var request = require('request-promise-native'),
        username = "SANYAM_K",
        password = "Welcome@234",
        auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

    request(
    {
        url : xsjs_url,
        headers : {
            "Authorization" : auth
        }
    }, 
 
    function(error, res, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('body:', body);
         var result = JSON.parse(body);
        var count = Object.keys(result.results).length;
        console.log(count);
        var distext = '';
               
        for(var i = 0; i<count; i++)
        {
            
             if(result.results[i].AMOUNT_SOLD)
            {
                var sale_amount = result.results[i].AMOUNT_SOLD;
                distext = 'Sales worth of $' + sale_amount;
            }
             if(result.results[i].MARGIN)
            {
                var profit_amount = result.results[i].MARGIN;
                distext = 'Profit worth of $' + profit_amount;
            }
            
              if(result.results[i].QUANTITY_SOLD)
            {
                var qty_sold = result.results[i].QUANTITY_SOLD;
                distext = qty_sold+' Products sold ';
            }
            if(result.results[i].STATE)
            {
                var v_state = result.results[i].STATE;
                distext = distext + ' in state ' + v_state;
            }
            if(result.results[i].CITY)
            {
                var v_city = result.results[i].CITY;
                distext = distext + ' in city ' + v_city;
            }
            if(result.results[i].SHOP_NAME)
            {
                var v_shop = result.results[i].SHOP_NAME;
                distext = distext + ' for shop ' + v_shop;
            }
             if(result.results[i].FAMILY_NAME)
            {
                var v_family = result.results[i].FAMILY_NAME;
                distext = distext + ' for product family ' + v_family;
            } 
            
              if(result.results[i].YR)
            {
                var v_yr = result.results[i].YR;
                distext = distext + ' for year ' + v_yr;
            } 
            
              if(result.results[i].QTR)
            {
                var v_qtr = result.results[i].QTR;
                distext = distext + ' for qtr ' + v_qtr;
            } 
            
                if(result.results[i].MTH)
            {
                var v_mth = result.results[i].MTH;
                distext = distext + ' for month ' + v_mth;
            } 
            
            res.json({
            replies:  [
                         { type: 'text', content: `🔎${distext}` },
                       ],
                    });
     }
  });//request close
};
//-------------------------------------------------------

  
    
 



