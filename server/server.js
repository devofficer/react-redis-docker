const express = require('express');
const axios = require('axios');
const redis = require('redis');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// create and connect redis client to local instance.
const client = redis.createClient(process.env.REDIS_URL);

// Print redis errors to the console
client.on("error", (err) => {
    console.log(err);
})

const exp_mock = [
  {
    "id": "exp1",
    "dateFrom": "2010-01-01",
    "dateTo": "2011-02-24",
    "company": "Some employer",
    "role": "Junior developer",
    "description": "I was in charge of ..."
  },
  {
    "id": "exp2",
    "dateFrom": "2010-01-01",
    "dateTo": "2011-02-24",
    "company": "Some employer",
    "role": "Junior developer",
    "description": "I was in charge of ..."
  },
  {
    "id": "exp3",
    "dateFrom": "2010-01-01",
    "dateTo": "2011-02-24",
    "company": "Some employer",
    "role": "Junior developer",
    "description": "I was in charge of ..."
  },
  {
    "id": "exp4",
    "dateFrom": "2010-01-01",
    "dateTo": "2011-02-24",
    "company": "Some employer",
    "role": "Junior developer",
    "description": "I was in charge of ..."
  },
  {
    "id": "exp5",
    "dateFrom": "2010-01-01",
    "dateTo": "2011-02-24",
    "company": "Some employer",
    "role": "Junior developer",
    "description": "I was in charge of ..."
  },
  {
    "id": "exp6",
    "dateFrom": "2010-01-01",
    "dateTo": "2011-02-24",
    "company": "Some employer",
    "role": "Junior developer",
    "description": "I was in charge of ..."
  },
  {
    "id": "exp7",
    "dateFrom": "2010-01-01",
    "dateTo": "2011-02-24",
    "company": "Some employer",
    "role": "Junior developer",
    "description": "I was in charge of ..."
  }
]

const edu_mock = [
  {
    "id": "edu1",
    "yearFrom": "2012",
    "yearTo": "2015",
    "school": "Hero Academy",
    "skills": [
      "Web Development",
      "Database management",
      "..."
    ]
  },
  {
    "id": "edu2",
    "yearFrom": "2012",
    "yearTo": "2015",
    "school": "Hero Academy",
    "skills": [
      "Web Development",
      "Database management",
      "..."
    ]
  },
  {
    "id": "edu3",
    "yearFrom": "2012",
    "yearTo": "2015",
    "school": "Hero Academy",
    "skills": [
      "Web Development",
      "Database management",
      "..."
    ]
  },
  {
    "id": "edu4",
    "yearFrom": "2012",
    "yearTo": "2015",
    "school": "Hero Academy",
    "skills": [
      "Web Development",
      "Database management",
      "..."
    ]
  },
  {
    "id": "edu5",
    "yearFrom": "2012",
    "yearTo": "2015",
    "school": "Hero Academy",
    "skills": [
      "Web Development",
      "Database management",
      "..."
    ]
  },
  {
    "id": "edu6",
    "yearFrom": "2012",
    "yearTo": "2015",
    "school": "Hero Academy",
    "skills": [
      "Web Development",
      "Database management",
      "..."
    ]
  },
  {
    "id": "edu7",
    "yearFrom": "2012",
    "yearTo": "2015",
    "school": "Hero Academy",
    "skills": [
      "Web Development",
      "Database management",
      "..."
    ]
  },
  {
    "id": "edu8",
    "yearFrom": "2012",
    "yearTo": "2015",
    "school": "Hero Academy",
    "skills": [
      "Web Development",
      "Database management",
      "..."
    ]
  }
]

app.get('/experience', (req, res) => {
  // Save the experience API response in Redis store
  client.setex(`experience`, 3600, JSON.stringify({ source: 'Redis Cache', ...exp_mock, }));
  // Send JSON response to client
  return res.status(200).json(exp_mock);
});

app.get('/education', (req, res) => {
  // Save the experience API response in Redis store
  client.setex(`education`, 3600, JSON.stringify({ source: 'Redis Cache', ...edu_mock, }));
  // Send JSON response to client
  return res.status(200).json(edu_mock);
});

app.get('/randomNumber', (req, res) => {
	const rand = Math.floor( Math.random() * 10 ) % 3;
  // Send JSON response to client
  return res.status(200).json(rand);
});

app.listen(3600, () => {
  console.log('Server listening on port: ', 3600);
});
