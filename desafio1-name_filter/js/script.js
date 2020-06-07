let allUsers = [];
let tabUsers = null;
let tabStatistics = null;
let input = null;
let filteredUser = [];
let titleUsers = null;
let titleStatistics = null;
let loading = null;


window.addEventListener('load', () => {
  tabUsers = document.querySelector('#tabUsers');
  tabStatistics = document.querySelector('#tabStatistics');
  input = document.querySelector('#input');
  titleUsers = document.querySelector('#titleUsers');
  titleStatistics = document.querySelector('#titleStatistics');
  loading = document.querySelector('#loading');
  loadingPage();
  fetchUsers();
  runFilter();
})

//div loading
function loadingPage(){
  setTimeout(() => {
    loading.innerHTML = '<img id="gif" src="/loading.gif">'
  }, 50);
  
  setTimeout(() => {
    loading.innerHTML = ' '
    document.getElementById('input').disabled = false;
  }, 2000);
}

//users
async function fetchUsers(){
  const res = await fetch ('/users.json');
  const json = await res.json();

  allUsers = json.results.map(user => {
    const { name, picture, dob, gender } = user;
    return {
      name: name.first + ' ' + name.last,
      picture: picture.thumbnail,
      age: dob.age,
      gender: gender
    }
  });
  console.group('allUsers: ');
  console.log(allUsers); 
  console.groupEnd()
}

function runFilter(){
//filtra os usuários de acordo com o que foi digitado
  function handleTyping(event) {
    /* console.log(event) */
    const inputContent = event.target.value;
    const filteredUser = allUsers.filter(user => {
      return user.name.toLowerCase().includes(inputContent.toLowerCase());
    });
    console.group('content and users:')
    console.log(inputContent);
    console.log(filteredUser);
    console.groupEnd()

//preenche a div users
    let usersHTML = "<div>"

    filteredUser.forEach(user => {
      const { name, picture, age, gender } = user;
      const userHTML = `
      <div class="user">
        <div>
          <img src="${picture}">
        </div>
        <div>
          ${name}, ${age}
        </div>
      </div>
      `;

      usersHTML += userHTML
    });
    usersHTML += "</div>";

    const totalFiltered = filteredUser.length;

    tabUsers.innerHTML = usersHTML;
    titleUsers.innerHTML = `${totalFiltered} usuário(s) encontrado(s)`;

//preenche a div estatísticas
    const totalMen = filteredUser.filter(user => {
      return user.gender == 'male';
    });
    const totalWomen = filteredUser.filter(user => {
      return user.gender == 'female';
    });
    const totalAges = filteredUser.reduce((acc, cur) => {
      return acc + cur.age;
    }, 0)
    tabStatistics.innerHTML = `
      <p>Sexo Masculino: ${totalMen.length}</p>
      <p>Sexo Feminino: ${totalWomen.length}</p>
      <p>Soma das idades: ${totalAges} </p>
      <p>Média das idades: ${totalAges/totalFiltered}</p>
    `;
    titleStatistics.innerHTML = `Estatísticas`;

//se nada digitado, limpa as divs
    if (inputContent == ''){
      tabUsers.innerHTML = '';
      titleUsers.innerHTML = 'Nenhum usuário filtrado';
      tabStatistics.innerHTML = '';
      titleStatistics.innerHTML = 'Nada a ser exibido';
    }
  }
    input.addEventListener('keyup', handleTyping);
    //input.focus();    
}