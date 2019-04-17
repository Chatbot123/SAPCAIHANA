const express = require('express')
const bodyParser = require('body-parser')

const app = express() 

app.use(bodyParser.json()) 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));


app.post('/getmeasure-state', (req, res) => {
  console.log(req.body)
  
   const ent_measure = req.body.entities.ent_measure[0].raw;
  const ent_state_value = req.body.entities.ent_state_value[0].raw;
  const ent_state = req.body.entities.ent_state[0].raw;
  
var content_text = ent_measure ;//+ " " + ent_state_value + " " + ent_state;
//`${content_text}`
  res.send({
    replies: [{
      type: 'text',
      content: `${content_text}`
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

