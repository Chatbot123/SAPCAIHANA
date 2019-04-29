const express = require('express');
const bodyParser = require('body-parser');
//const recastai = require('recastai').default;
const requestify = require('requestify');
const request = new recastai.request('f6f1cfd675c26656fef9a2367f62c4a4');

const app = express() 

app.use(bodyParser.json()) 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));


app.post('/getmeasure-state', (req, res) => 
{
		  console.log(req.body);
		  
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
		
		username = "SANYAM_K",
		password = "Welcome@234",
		// url = "http://74.201.240.43:8000/ChatBot/Sample_chatbot/EFASHION_DEV_TOP.xsjs?&STATE=tx&COMMAND=amountsold&ACTION=0&YR=0&MTH=0&QTR=0&NUM=0&ENT_STATE=state&ENT_MEASURE=sales",
		auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

		requestify.request
		(
			{
				url : xsjs_url,
				method: "GET",
				headers : {
					 	 //'Content-Type': 'application/json',
						"Authorization" : auth
					}
		}, function(response) 
		{
					 
						  //----------------------------------------------
					var reply = [{
						type: 'text',
						content: xsjs_url
					}];

						res.status(200).json({
						replies: reply,
						conversation: {
							memory: { 	        ent_measure: ent_measure,
										ent_state_value : ent_state_value,
										ent_state : ent_state
									
							}
						}
					});
				}, function(error) 
				{
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
			
		  );
		  
		  
		
			   

});

app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send() 
}) 

