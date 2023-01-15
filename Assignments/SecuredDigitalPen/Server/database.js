
var axios = require('axios');

var myvar;

// ----------------- get func ------------------------------
function getDb()
{


    var mydata = JSON.stringify({
        "dataSource": "RohitAkurdekar",
        "database": "TestDB",
        "collection": "TestCollection",
        "projection": {
        //   "document":{"_id":3}
        }
    });
                
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-qfawu/endpoint/data/v1/action/find',            // findOne
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'f6NOXo00Voi8xzMNtEJ1AYpadd4VkqStBJAl5HgstDHHCYETjj6OrwDsWAnRX0gy',
        },
        data: mydata
    };
                
    axios(config)
        .then(function (response) {
            console.log(response.data);
            myvar = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        
        console.log("in: ",myvar);
        return myvar;

}



// ----------- Insert func -----------------------------

function insertDb( uname,passwd,penId,topic)
{

    var mydata = JSON.stringify({
        "dataSource": "RohitAkurdekar",
        "database": "TestDB",
        "collection": "TestCollection",
        "document": {
        "_id":uname,
        "passwd": passwd,
        "PenId":penId,
        "topic":topic

        }
    });
                
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-qfawu/endpoint/data/v1/action/insertOne',
        headers: {
        'Content-Type': 'application/ejson',
        'Access-Control-Request-Headers': '*',
        'api-key': 'f6NOXo00Voi8xzMNtEJ1AYpadd4VkqStBJAl5HgstDHHCYETjj6OrwDsWAnRX0gy',
        },
        data: mydata
    };
                
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}

module.exports = {
    getDb : getDb,
    insertDb : insertDb
}