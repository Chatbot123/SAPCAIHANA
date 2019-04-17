const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


const bodyParser = require('body-parser')

const app = express() 

app.use(bodyParser.json()) 

app.post('/', (req, res) => {
  console.log(req.body)

  res.send({
    replies: [{
      type: 'text',
      content: 'Roger that',
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

app.listen(PORT, () => { 
  console.log('Server is running on port 5000') 
})
