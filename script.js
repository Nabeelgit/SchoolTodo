const form_sub = document.getElementById('submit_form');
const inp = document.getElementById('add_inp');
const opts = document.getElementById('options');
function createKey(){
    let randomString = Math.random().toString(36).substring(3);
    while(localStorage.getItem(randomString) !== null){
        randomString = Math.random().toString(36).substring(3);
    }
    return "todo_"+randomString;
}
function createItem(val, option, key){
    let list = document.getElementById('lst_'+option);
    let div = document.querySelector('.'+option);
    let li = document.createElement('li');
    li.innerText = val;
    li.classList.add('lst_opt');
    li.addEventListener('click', function(){
        this.remove();
        localStorage.removeItem(key)
    });
    div.appendChild(li);
}
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if(key.startsWith('todo_')){
        const value = localStorage.getItem(key);
        let json = JSON.parse(value);
        let val = json.value.trim();
        if(val !== ''){
            let option = json.opt;
            createItem(val, option, key);
        }
    }
  }
form_sub.addEventListener('submit', function(e){
    e.preventDefault();
    let val = inp.value.trim();
    if(val !== ''){
        let option = opts.value;
        let key = createKey();
        createItem(val, option, key);
        localStorage.setItem(key, JSON.stringify({opt: option, value: val}));
        inp.value = '';
    }
})