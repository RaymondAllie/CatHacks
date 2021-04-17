
const url = 'https://superheroapi.com/api/';
const characterid = '414/';
const access = '897434584441270/'
const item = 'powerstats'

function render(item) {
  if (item.length <= 0) {
    console.log('Finished search')
  } else {
    console.log(item)}

}


async function fun() {
  /* const wordQuery = document.querySelector('#in').value;  { mode: 'no-cors'} */

  const endpoint = url + access + characterid + item;
  console.log(endpoint)
  try {
    const response = await fetch(endpoint, {cache:'no-cache'});
    console.log('hello')
    if (response.ok) {
      const jsonResponse = await response.json()
      render(jsonResponse)
    }
  } catch(error){
    console.log(error)
  }
}