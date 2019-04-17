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
   
      
                 res.send({
                       replies: [{
                                    type: 'text',
                                    content: xsjs_url,
                                }], 
                      conversation: {
                                      memory: { key: 'value' }
                                    }
                      })
       

})

app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send() 
}) 

