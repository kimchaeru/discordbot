const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

client.on('ready', () => {
    console.log('켰다.');
    client.user.setPresence({ game: { name: '채루님!.' }, status: 'online' })
  });

let MuteRole = '768430566676496416'
let Cooltime_Mute = 3 * 1000 //밀리세컨드 
// 3초내에 칠 시 뮤트
let User_Mute_Object = {}
client.on('message', async message => {
  if (message.author.bot || !message.guild) return
  MuteRole = message.guild.roles.cache.find(r => r.id == MuteRole)
  const M_Author = message.author
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    let Author_Object = User_Mute_Object[M_Author.id]
    if (!Author_Object) {
      User_Mute_Object[M_Author.id] = {
        time: 0,
        interval: null,
        muted: false
      }
    } else {
      if (Author_Object.interval != null) {
        if (Cooltime_Mute >= Author_Object.time && !Author_Object.muted) {
          message.member.roles.add(MuteRole)
          Author_Object.muted = true
          message.reply(`도배하지 마셈ㅋㅋ 씨발 님 뮤트드셈 전 채팅과의 시간차 ${Author_Object.time}ms`)
        }
        clearInterval(Author_Object.interval)
        Author_Object.interval = null
      } else if (!Author_Object.muted) {
        Author_Object.interval = setInterval(() => {
          Author_Object.time++
        }, 1)
      }
      Author_Object.time = 0
    }
  }
  if (message.member.hasPermission('ADMINISTRATOR') && /!언뮤트 <@!?(\d{17,19})>/g.test(message.content)) {
    const Mention_member = message.mentions.members.first()
    Mention_member.roles.remove(MuteRole)
    User_Mute_Object[Mention_member.id].muted = false
    User_Mute_Object[Mention_member.id].time = 0
    message.channel.send(`${Mention_member}, 해방됨`)
  }else{
    
  }
})

// 욕설 체크
let msg = message.content;
for(fw of forbiddenWord) {
    if(msg.indexOf(bot.prefix+fw) != -1) { // ㅗ 같이. 명령어와 섞일 수 있기 때문에 추가한 부분
        continue;
    } else if(msg.indexOf(fw) != -1) {
        message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
        if(messageTime == forbiddenWordTime) {
            message.reply(`첫 채팅이 욕이냐. 이 개새끼야. Mute 먹어라.\n\`\`사용한 욕: ${fw}\`\`   \`\`전 채팅과의 간격 ${messageTime - forbiddenWordTime}ms\`\`\n\n${apology_channel}`);
        } else {
            message.reply(`욕 하지마라 이 개새끼야. 씨발. 님 Mute 드셈.\n\`\`사용한 욕: ${fw}\`\`   \`\`전 채팅과의 간격 ${messageTime - forbiddenWordTime}ms\`\`\n\n${apology_channel}`);
        }
        bot.authors.set(message.author.id, messageTime);
        return true;
    }
}

client.on('message', message => {
    
  let foods = ["라면", "피자", "치킨", "굶어" ,"나도몰라 개x야","채루" ,"설빙소주"]
  if(message.content.startsWith("!야식골라")) {
      let rand = Math.floor(Math.random() * foods.length)
    message.channel.send(`${foods[rand]} 어떠시나요?`)
  }
});
    
client.on('messageDelete', async message => {
  
    message.channel.send(`<@!${message.author.id}> 님이 \`${message.content}\` 삭제하셨습니다.`)       //삭제
  })
  
  client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content) return // 임베드로 인한 수정같은 경우 
    oldMessage.channel.send(`<@!${oldMessage.author.id}> 님이 \`${oldMessage.content}\` 를 \`${newMessage.content}\` 로 수정했습니다.`)
  })


client.login(token);