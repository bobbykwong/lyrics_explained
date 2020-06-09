const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// this line below, sets a layout look to your express project
// const reactEngine = require('express-react-views').createEngine();
// app.engine('jsx', reactEngine);

// // this tells express where to look for the view files
// app.set('views', __dirname + '/views');

// // this line sets react to be the default view engine
// app.set('view engine', 'jsx');


// app.get('/hello', (request, response) => {
//   console.log('waffles');
//   response.render('hello');
// })

const port = 4000;
app.listen(port, () => {
    console.log("listening to channel 4000");
})