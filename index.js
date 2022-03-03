var express = require('express');
var app = express();

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

app.get('/con', function (req, res) {
  // res.sendFile( __dirname + "/" + "connect.js" );

  // var mysql = require('mysql');

  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "agendaco_dentistas",
  //   password: "fW2~q1y%qeZK",
  //   database: "agendaco_dentistas"
  // });

  // con.connect(function(err) {
  //   // if (err) throw err;
  //   console.log("Connected!");
  //   // con.query('SELECT 1 + 1 AS adm_leads', function (error, results, fields) {
  //   //   // if (error) throw error;
  //   //   console.log('The solution is: ', results);
  //   // });
     
    
  // });

  // con.query('SELECT * FROM session', (err, rows) => {
  //   // if (err){ throw err;}

  //   // console.log('Leads: ', rows[0], '\n')

  //   rows.forEach(row => {
  //     console.log(`${row.id}`)
  //   });
  // });

// con.end();


var mysql = require('mysql');
  
// create a connection variable with the required details
var con = mysql.createConnection({
  host: 'localhost',
  port: "3306",
  user: "agendaco_dentistas",
  password: "fW2~q1y%qeZK",
  database: "agendaco_dentistas"
});
  
// make to connection to the database.

con.connect();

  // if connection is successful
  con.query("SELECT * FROM session", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    // iterate for all the rows in result
    Object.keys(result).forEach(function(key) {
      var row = result[key];
      console.log(row.name)
    });
  });

  con.end();


});

app.get('/index', function (req, res) {
    // whatsapp();
    whatsapp2();
    // whatsapp3();
    res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/mais', function (req, res) {
  res.sendFile( __dirname + "/" + "mais.html" );
});

var porta = process.env.PORT || 8081;
app.listen(porta, function () {
//    var host = server.address().address
//    var port = server.address().port
   
   console.log("Example app listening at http://%s:%s");
})


function venom(){

    const venom = require('venom-bot');

    venom
      .create(
        //session
        'vandeilson', //Pass the name of the client you want to start the bot
        //catchQR
        (base64Qrimg, asciiQR, attempts, urlCode) => {
          console.log('Number of attempts to read the qrcode: ', attempts);
          console.log('Terminal qrcode: ', asciiQR);
          console.log('base64 image string qrcode: ', base64Qrimg);
          console.log('urlCode (data-ref): ', urlCode);
        },
        // statusFind
        (statusSession, session) => {
          console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
          //Create session wss return "serverClose" case server for close
          console.log('Session name: ', session);
        },
        // options
        {
          multidevice: false, // for version not multidevice use false.(default: true)
          folderNameToken: 'tokens', //folder name when saving tokens
          mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
          headless: true, // Headless chrome
          devtools: false, // Open devtools by default
          useChrome: true, // If false will use Chromium instance
          debug: false, // Opens a debug session
          logQR: true, // Logs QR automatically in terminal
          browserWS: '', // If u want to use browserWSEndpoint
          browserArgs: [''], //Original parameters  ---Parameters to be added into the chrome browser instance
          puppeteerOptions: {}, // Will be passed to puppeteer.launch
          disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
          disableWelcome: true, // Will disable the welcoming message which appears in the beginning
          updatesLog: true, // Logs info updates automatically in terminal
          autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
          createPathFileToken: false, // creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
          chromiumVersion: '818858', // Version of the browser that will be used. Revision strings can be obtained from omahaproxy.appspot.com.
          addProxy: [''], // Add proxy server exemple : [e1.p.webshare.io:01, e1.p.webshare.io:01]
          userProxy: '', // Proxy login username
          userPass: '' // Proxy password
        },
        // BrowserSessionToken
        // To receive the client's token use the function await clinet.getSessionTokenBrowser()
        {
          WABrowserId: '"UnXjH....."',
          WASecretBundle:
            '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
          WAToken1: '"0i8...."',
          WAToken2: '"1@lPpzwC...."'
        },
        // BrowserInstance
        (browser, waPage) => {
          console.log('Browser PID:', browser.process().pid);
          waPage.screenshot({ path: 'screenshot.png' });
        }
      )
      .then((client) => {
        start(client);
      })
      .catch((erro) => {
        console.log(erro);
      });
}


function whatsapp() {
    const qrcode = require('qrcode-terminal');

    const { Client } = require('whatsapp-web.js');
    const client = new Client();

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});

        console.log( qr)
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.initialize();
}

function whatsapp2(){

  const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false }
});

client.initialize();

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});

  console.log( qr)
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});


client.on('ready', () => {
  console.log('Client is ready!');
 
   // Number where you want to send the message.
  const number = "+559870299001";
 
   // Your message.
  const text = "Olá, como vai? \n Você gostaria de agenda um consulta ?";
 
   // Getting chatId from the number.
   // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number.substring(1) + "@c.us";
 
  // Sending message.
  client.sendMessage(chatId, text);
 });

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body === 'Sim' || msg.body === 'exato' || msg.body === 'Exato' || msg.body === 'sim' || msg.body === 'sim' || msg.body === 's' || msg.body === 'ss') {
        // Send a new message as a reply to the current one
        msg.reply('Qual a data vc gostaria de agenda sua conulta \n Datas disponiveis: \n (1) 01/01/01 \n (2) 02/02/02 \n (3) 03/03/03');


    }else if (msg.body === '1') {
      // Send a new message as a reply to the current one
      msg.reply('Escolha um medico: \n (1) Dr. 1 \n (2) Dr. 2 \n (3) Dr. 3');

    }else if (msg.body === '2') {
      // Send a new message as a reply to the current one
      msg.reply('Consulta marcada para o dia 01/01/01 com o Dr. 2 na MedicMais! Ficamos no seu aguardo.');


  }else if (msg.body === '!ping') {
      // Send a new message to the same chat
        client.sendMessage(msg.from, 'pong');


    } else if (msg.body === '!ping') {
        // Send a new message to the same chat
        client.sendMessage(msg.from, 'pong');

    } else if (msg.body.startsWith('!sendto ')) {
        // Direct send a new message to specific id
        let number = msg.body.split(' ')[1];
        let messageIndex = msg.body.indexOf(number) + number.length;
        let message = msg.body.slice(messageIndex, msg.body.length);
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        let chat = await msg.getChat();
        chat.sendSeen();
        client.sendMessage(number, message);

    } else if (msg.body.startsWith('!subject ')) {
        // Change the group subject
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newSubject = msg.body.slice(9);
            chat.setSubject(newSubject);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body.startsWith('!echo ')) {
        // Replies with the same message
        msg.reply(msg.body.slice(6));
    } else if (msg.body.startsWith('!desc ')) {
        // Change the group description
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newDescription = msg.body.slice(6);
            chat.setDescription(newDescription);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body === '!leave') {
        // Leave the group
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body.startsWith('!join ')) {
        const inviteCode = msg.body.split(' ')[1];
        try {
            await client.acceptInvite(inviteCode);
            msg.reply('Joined the group!');
        } catch (e) {
            msg.reply('That invite code seems to be invalid.');
        }
    } else if (msg.body === '!groupinfo') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            msg.reply(`
                *Group Details*
                Name: ${chat.name}
                Description: ${chat.description}
                Created At: ${chat.createdAt.toString()}
                Created By: ${chat.owner.user}
                Participant count: ${chat.participants.length}
            `);
        } else {
            msg.reply('This command can only be used in a group!');
        }
    } else if (msg.body === '!chats') {
        const chats = await client.getChats();
        client.sendMessage(msg.from, `The bot has ${chats.length} chats open.`);
    } else if (msg.body === '!info') {
        let info = client.info;
        client.sendMessage(msg.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `);
    } else if (msg.body === '!mediainfo' && msg.hasMedia) {
        const attachmentData = await msg.downloadMedia();
        msg.reply(`
            *Media info*
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Data (length): ${attachmentData.data.length}
        `);
    } else if (msg.body === '!quoteinfo' && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();

        quotedMsg.reply(`
            ID: ${quotedMsg.id._serialized}
            Type: ${quotedMsg.type}
            Author: ${quotedMsg.author || quotedMsg.from}
            Timestamp: ${quotedMsg.timestamp}
            Has Media? ${quotedMsg.hasMedia}
        `);
    } else if (msg.body === '!resendmedia' && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            const attachmentData = await quotedMsg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, { caption: 'Here\'s your requested media.' });
        }
    } else if (msg.body === '!location') {
        msg.reply(new Location(37.422, -122.084, 'Googleplex\nGoogle Headquarters'));
    } else if (msg.location) {
        msg.reply(msg.location);
    } else if (msg.body.startsWith('!status ')) {
        const newStatus = msg.body.split(' ')[1];
        await client.setStatus(newStatus);
        msg.reply(`Status was updated to *${newStatus}*`);
    } else if (msg.body === '!mention') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`Hi @${contact.number}!`, {
            mentions: [contact]
        });
    } else if (msg.body === '!delete') {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.fromMe) {
                quotedMsg.delete(true);
            } else {
                msg.reply('I can only delete my own messages');
            }
        }
    } else if (msg.body === '!pin') {
        const chat = await msg.getChat();
        await chat.pin();
    } else if (msg.body === '!archive') {
        const chat = await msg.getChat();
        await chat.archive();
    } else if (msg.body === '!mute') {
        const chat = await msg.getChat();
        // mute the chat for 20 seconds
        const unmuteDate = new Date();
        unmuteDate.setSeconds(unmuteDate.getSeconds() + 20);
        await chat.mute(unmuteDate);
    } else if (msg.body === '!typing') {
        const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
    } else if (msg.body === '!recording') {
        const chat = await msg.getChat();
        // simulates recording audio in the chat
        chat.sendStateRecording();
    } else if (msg.body === '!clearstate') {
        const chat = await msg.getChat();
        // stops typing or recording in the chat
        chat.clearState();
    } else if (msg.body === '!jumpto') {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            client.interface.openChatWindowAt(quotedMsg.id._serialized);
        }
    } else if (msg.body === '!buttons') {
        let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
        client.sendMessage(msg.from, button);
    } else if (msg.body === '!list') {
        let sections = [{title:'sectionTitle',rows:[{title:'ListItem1', description: 'desc'},{title:'ListItem2'}]}];
        let list = new List('List body','btnText',sections,'Title','footer');
        client.sendMessage(msg.from, list);
    }
});

// client.on('message_create', (msg) => {
//     // Fired on all message creations, including your own
//     if (msg.fromMe) {
//         // do stuff here
//     }
// });

// client.on('message_revoke_everyone', async (after, before) => {
//     // Fired whenever a message is deleted by anyone (including you)
//     console.log(after); // message after it was deleted.
//     if (before) {
//         console.log(before); // message before it was deleted.
//     }
// });

// client.on('message_revoke_me', async (msg) => {
//     // Fired whenever a message is only deleted in your own view.
//     console.log(msg.body); // message before it was deleted.
// });

client.on('message_ack', (msg, ack) => {
    /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */

    if(ack == 3) {
        // The message was read
    }
});

// client.on('group_join', (notification) => {
//     // User has joined or been added to the group.
//     console.log('join', notification);
//     notification.reply('User joined.');
// });

// client.on('group_leave', (notification) => {
//     // User has left or been kicked from the group.
//     console.log('leave', notification);
//     notification.reply('User left.');
// });

// client.on('group_update', (notification) => {
//     // Group picture, subject or description has been updated.
//     console.log('update', notification);
// });

// client.on('change_state', state => {
//     console.log('CHANGE STATE', state );
// });

// client.on('disconnected', (reason) => {
//     console.log('Client was logged out', reason);
// });


}



function whatsapp3(){
  const whatsAppClient = require('@green-api/whatsapp-api-client')

  const restAPI = whatsAppClient.restAPI(({
      idInstance: "D2D09883B6C2E6D395A29B359D967E77",
      apiTokenInstance: "YOUR_API_TOKEN_INSTANCE"
  }))

  restAPI.message.sendMessage(null, 55987029901, "hello world")
  .then((data) => {
      console.log(data);
}) ;
}