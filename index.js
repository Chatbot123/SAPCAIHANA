const express = require('express')
const bodyParser = require('body-parser')
//const request = require('request-promise-native')

const app = express() 

app.use(bodyParser.json()) 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));


app.post('/getmeasure-state', (req, res) => {
  console.log(req.body)
  
  var ent_measure = req.body.nlp.entities.ent_measure[0].raw;
  var ent_state_value = req.body.nlp.entities.ent_state_value[0].raw;
  var ent_state = req.body.nlp.entities.ent_state[0].raw;
  var distext = '';
  
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
   
   //-----------------------------------------------------------------------------------
    var request = require('request-promise-native'),
        username = "SANYAM_K",
        password = "Welcome@234",
       // url = "http://74.201.240.43:8000/ChatBot/Sample_chatbot/EFASHION_DEV_TOP.xsjs?&STATE=tx&COMMAND=amountsold&ACTION=0&YR=0&MTH=0&QTR=0&NUM=0&ENT_STATE=state&ENT_MEASURE=sales",
        auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

    request(
    {
        url : xsjs_url
        //method: 'GET',
        headers : {
          //'Content-Type': 'application/json',
            "Authorization" : auth
        }
    }, function(error, response,body) 
      {
           // console.log('error:', error); // Print the error if one occurred
          //  console.log('body:', body);
            // console.log('res:', res);
        console.log("The response: " + body);
        //var result = response.getBody();
            var result = JSON.parse(body);
            //console.log(result);   
            // console.log(result.results[0].AMOUNT);  
           var count = Object.keys(result.results).length;
            //console.log(count);
            

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
	    }
              //----------------------------------------------
        var reply = [{
			type: 'text',
			content: distext
		}];

            res.status(200).json({
			replies: reply,
		    conversation: {
      			memory: { 	ent_measure: ent_measure,
      					  	ent_state_value : ent_state_value,
      						ent_state : ent_state
      					
      			}
    		}
		});
	}, function(error) {
			var errorMessage = "GET to XSJS service failed";
			if(error.code && error.body) {
				errorMessage += " - " + error.code + ": " + error.body
			}
			console.log("Something went wrong with the call");
			console.log(errorMessage);
			// dump the full object to see if you can formulate a better error message.
			console.log(error.body);
			
			//Try to provide a proper error response
			
			var reply = [{
				type: 'text',
				content: "I'm sorry! Something went wrong with the call to the SAP query. Try asking a different question - or type 'reset'."
			}];

			res.status(200).json({
				replies: reply,
				conversation: {
					memory: { 	ent_measure: ent_measure,
      					  	ent_state_value : ent_state_value,
      						ent_state : ent_state
					}
				}
			});			
			
		}
        
        
        
        
        
        
        
        /* res.send({
                       replies: [{
                                    type: 'text',
                                    content: result,
                                }], 
                      conversation: {
                                      memory: { key: 'value' }
                                    }
                      })*/
              
              //----------------------------------------------
              
              
          //  }
                        
    }
 );
  
  
  
  //------------------------------------------------------------------------------------
                
       

})

app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send() 
}) 

