require('dotenv').config(); //initialize dotenv
//require moment.js
const moment = require('moment');
const { Client, Intents } = require('discord.js');

const TOKEN = ""; //put discord bot token here

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//the discord ids of who you want the bot to send messages to eventually I want to have users click a reaction to be added to the list
const Hunter = '';
const Scott ='';



const fs = require('fs');
const { date } = require('zod');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//open quotes.txt

const quotes = fs.readFileSync('quotes.txt', 'utf8');
const quoteList = quotes.split('\n');
//send a random quote from quotes.txt
client.on('message', msg => {
    if (msg.content === '!quote') {
        const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
        msg.channel.send(randomQuote);
    }
  
});
//create a function that is always running if the time is 12:30  EST dm a user
function time() {
        
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentSecond = currentTime.getSeconds();
        let date_ob = new Date();
        //create a user list
        const userList = []
        userList.push(Hunter);
        userList.push(Scott);
      
        
        if (currentHour === 9 && currentMinute === 00 && currentSecond === 00) {
            const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
            //send a message to the multiple users
         //iterate through the user list 
            for (let i = 0; i < userList.length; i++) {
                try {
                    client.users.fetch(userList[i]).then(user => {;
                   
                    //send the date
                    user.send("Hello, "+ user.username  +", Todays Uncle Iroh Quote of the Day: " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + "\n" + randomQuote);
                    //send a new line
                    //user.send("\n");
                    console.log( " Quote: "+ randomQuote +  " \n Was sent to "  +  user.username + " at " + currentHour + ":" + currentMinute + ":" + currentSecond + " EST" + " on " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " \n");  
                        //log to log.txt
                        fs.appendFile('logs.txt', "Quote: "+ randomQuote +  " was sent to "  +  user.username + " at " + currentHour + ":" + currentMinute + ":" + currentSecond + " EST" + " on " +  moment().format("dddd, MMMM Do YYYY, h:mm:ss a") 
                        + "\n", function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                        });
                    });
                } catch (err){
                    console.log("err")
                }
            
            };
    }
}

  
//always run time function every second
setInterval(time, 1000);




//check to see if the current time is 10:20 PM est and if so, send a message to the #general channel


//make sure this line is the last line
client.login(TOKEN); //login bot using token
