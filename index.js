const express = require('express')
const bodyParser = require('body-parser')

const app = express() 

app.use(bodyParser.json()) 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));


app.post('/getmeasure-state', (req, res) => {
  console.log(req.body)
  
  var v_ent_measure = req.body.nlp.entities.ent_measure[0].raw;
  var v_ent_state_value = req.body.nlp.entities.ent_state_value[0].raw;
  var v_ent_state = req.body.nlp.entities.ent_state[0].raw;
  
var content_text = v_ent_measure + " " + v_ent_state_value + " " + v_ent_state;
//`${content_text}`
  res.send({
    replies: [{
      type: 'text',
      content: content_text,
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

