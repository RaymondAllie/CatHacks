var APIurl = 'https://www.superheroapi.com/api.php/'
var token = '897434584441270'
var powerstats = '/powerstats'
var biography = '/biography'
var image = '/image'
var heroes = {
  One_Punch_Man: '502',
  Shang_Chi: '587',
  Moonstone: '471',
  Abin_Sur: '3',
  Plastique: '521',
  Iron_Man: '346',
  Luna: '419',
  Hela: '321',
  Simon_Baz: '600',
  Flash: '263',
  Godzilla: '287',
  Faora: '253',
  Atom_Girl: '52',
  Sobek: '608'
}
var input;
var input_bot;
async function submits() {
  input_1 = document.querySelector('#character').value
  if (input_1 === "Select Your Character") {
    alert('Please select your character!')
  } else {
    if (document.querySelector('#character').value === "Random_") {
      var rand_num = Math.floor(Math.random() * 732)
      if (rand_num === 0) {
        rand_num += 1
      }
      input = rand_num;
      console.log(input)
    } else {
      input = heroes[input_1]
      console.log(input)

    }
    document.querySelector('#sub').onclick = ''
    var a = await generate_card(input, 0)
    rand_bot()
    var b = await generate_card(input_bot, 1)
    document.querySelector('#info').style = 'display: flex;'
    document.querySelector('#fight').style = 'display: block;'
    start_fight()
  }
}
function rand_bot() {
  var rand_num = Math.floor(Math.random() * 732)
  if (rand_num === 0) {
    rand_num += 1
  }
  input_bot = rand_num;
  return rand_num
}
async function generate_card(id, card_type) {
  var char = await get_data(id, powerstats)
  var char_0 = await get_data(id, biography)
  var char_1 = await get_data(id, image)

  while (char.intelligence === 'null' || char.strength === 'null' || char.durability === 'null' || char.combat === 'null' || char.speed === 'null' || char.power === 'null') {
      id += 1
      var char = await get_data(id, powerstats)
      var char_0 = await get_data(id, biography)
      var char_1 = await get_data(id, image)
      if (card_type === 1) {
        input_bot = id
      } else {
        input = id
      }
  }
  console.log(char.name)
  console.log(input_bot)
  console.log(input)

  document.querySelector(`#name_${card_type.toString()}`).innerHTML = char.name;
  document.querySelector(`#img_${card_type.toString()}`).src = char_1.url;
  document.querySelector(`#info_${card_type.toString()}`).innerHTML = `<ul><li>Full-Name: ${char_0['full-name']}</li><li>Alignment: ${char_0['alignment']}</li><li>Intelligence: ${char['intelligence']}</li><li>Strength: ${char['strength']}</li><li>Speed: ${char['speed']}</li><li>Durability: ${char['durability']}</li><li>Power: ${char['power']}</li><li>Combat: ${char['combat']}</li></ul>`;

}

async function create(id) {
  var card_info_values = []
  var char = await get_data(id, powerstats)
  var char_0 = await get_data(id, biography)
  var char_1 = await get_data(id, image)
  var image_src = char_1.url
  card_info_values.push(char_0.alignment)
  card_info_values.push(char_0['full-name'])
  card_info_values.push(char.intelligence)
  card_info_values.push(char.strength)
  card_info_values.push(char.speed)
  card_info_values.push(char.durability)
  card_info_values.push(char.power)
  card_info_values.push(char.combat)
  console.log(card_info_values)
}

async function get_data(character_id, info) {
  var endpoint = APIurl + token + '/' + character_id.toString() + info;
  console.log(endpoint);
  try {
    var data = await fetch(endpoint);
    if (data.ok) {
      var output = await data.json()
      return output
    }
  } catch (error) {
    console.log(error)
  }
}
var attack_power = [];
var char_img=[];
var char_bio=[];
var health=[];
var intelligence=[];
var speed=[];
function show_hp() {
  render(`Player HP: ${health[0]}; Enemy HP: ${health[1]}`)
}
function restart() {
  window.open('index.html', '_self')
}
var count = 0;
function render(text) {
  if (count <= 3) {
    document.querySelector('#terminal_').innerHTML += `<p>${text}</p>`;
    count ++
  } else {
    document.querySelector('#terminal_').innerHTML = `<p>${text}</p>`;
    count = 0
  }

}
async function fight_start(id) {
  var char = await get_data(id, powerstats)
  var char_0 = await get_data(id, biography)
  var char_1 = await get_data(id, image)
  attack_power.push(parseInt(char.power) + parseInt(char.combat) + parseInt(char.strength))
  health.push(parseInt(char.durability) * 15)
  char_img.push(char_1.url)
  intelligence.push(parseInt(char.intelligence))
  speed.push(parseInt(char.speed))
}
async function start_fight() {
  var a = await fight_start(input)
  var b = await fight_start(input_bot)
  console.log(attack_power)
  console.log(speed)
  console.log(health)
}
var speed_manipulation = [1, 1];
var brain_manipulation = [1, 1];
function timed() {
  window.open('winner_page.html', '_self')
}
function time() {
  window.open('loser_page.html', '_self')
}


function fight_0() {
  document.querySelector('#terminal').style = 'border-color: red;'
  document.querySelector('#terminal_0').innerHTML = "Enemy's Turn"
  var num = Math.floor(Math.random() * 5)
  var list = ['brain_attack', 'brain_attack', 'speed_attack', 'speed_attack', 'power_attack']
  if (brain_manipulation[1] > 2.5){
    num = 4
  } else if (speed_manipulation[1] > 10) {
    if (brain_manipulation[1] > 3.5) {
      num = 4
    } else {
      num = 0
    }
  }
  console.log(list[num])
  setTimeout(() => {
    fight(list[num], false)
  }, 3000)
}
function fight(type, user_turn) {
  document.querySelector('#terminal').style = 'border-color: blue;'
  document.querySelector('#terminal_0').innerHTML = "Player's Turn"
  if (type === 'brain_attack') {
    if (user_turn) {
      console.log(intelligence)
      if (intelligence[0] > intelligence[1]) {
        brain_manipulation[0] =  brain_manipulation[0] * ((((intelligence[0]/intelligence[1])-1)* .75)+1)
        render(`Congragulations, you outsmarted the enemy, your next attack will do ${brain_manipulation[0]}x on the enemy!`)
      } else {
        render('Your not smarter than your enemy, theres no hope for you using this tactic.')
      }
    } else {
      if (intelligence[1] > intelligence[0]) {
        brain_manipulation[1] =  brain_manipulation[1] * ((((intelligence[1]/intelligence[0])-1)* .75)+1)
        render(`Enemy outsmarted you, his next attack will come with ${brain_manipulation[1]}x more damage.`)

      } else {
        var types = ['power_attack']

        fight(types[0], false)

      }
    }
  } else if (type === 'speed_attack'){
      if (user_turn) {
        if (speed[0] > speed[1]) {
          speed_manipulation[0] =  speed_manipulation[0] * ((((speed[0]/speed[1])-1)* 0.3)+1)
          render(`Congragulations, you are faster than the enemy, their future power attacks will have a ${speed_manipulation[0]}x less chance of hitting you!`)
        } else {
          render('You are not faster than your enemy, theres no hope for you using this tactic.')
        }
      } else {
        if (speed[1] > speed[0]) {
          speed_manipulation[1] =  speed_manipulation[1] * ((((speed[1]/speed[0])-1)* 0.3)+1)
          render(`Enemy is faster than you, your future power attacks will have a ${speed_manipulation[1]}x less chance of hitting the enemy!`)

        } else {
          var types = ['power_attack']

          fight(types[0], false)

        }

      }
  } else if (type === 'power_attack') {
        if (user_turn) {
          if (Math.random() * speed_manipulation[1] < .95) {
          health[1] = health[1] - (attack_power[0] * brain_manipulation[0])
          brain_manipulation[0] = 1
          if (health[1] <= 0) {
            render(`You Have Won!, The Enemy is Dead`)
            setTimeout(timed, 3000)

          } else {
            render(`You hit the enemy, the enemy health is ${health[1]}`)
          }
          } else{
            render('You have missed your attack!')
          }
        } else {
          if (Math.random() * speed_manipulation[0] < .95) {
          health[0] = health[0] - (attack_power[1] * brain_manipulation[1])
          brain_manipulation[1] = 1

          if (health[0] <= 0){
            render(`Enemy has hit there attack. Health is 0, You Have LOST!`)
            setTimeout(time, 3000)
          }else{
          render(`Enemy hit attack on you....your health is ${health[0]}.`)}} else {
            render('The enemy has missed their attack')

          }
        }
  }
}
