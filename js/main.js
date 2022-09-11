
let open_and_close_rules = true;
let side_rules = document.getElementById('rules-side')
let overlay = document.getElementById('overlay');
let r = document.querySelector(':root');
let timeout_rules = 0;

function rules(x){
    if(x == 'open'){
        overlay.style.top = 0 + '%'; 
        clearTimeout(timeout_rules)
        timeout_rules = setTimeout(() => {
            side_rules.style.top= 50 + "%";
        }, 200);
       
    }else{
        side_rules.style.top= -150 + '%';
        clearTimeout(timeout_rules)
        timeout_rules = setTimeout(() => {
            overlay.style.top = -150 + '%'; 
        }, 300);
    }
}

let array_skills = [
    {key:'scissors', background: 'hsl(39, 89%, 49%) , hsl(40, 84%, 53%)', shadow: '#c26b1c'},
    {key:'spock', background: 'hsl(189, 59%, 53%) , hsl(189, 58%, 57%)', shadow: '#3590aa'},
    {key:'paper', background: 'hsl(230, 89%, 62%) , hsl(230, 89%, 65%)', shadow: '#2944c0'},
    {key:'rock', background: 'hsl(349, 71%, 52%) , hsl(349, 70%, 56%)', shadow: '#931e3c'},
    {key:'lizard', background: 'hsl(261, 73%, 60%) , hsl(261, 72%, 63%)', shadow: '#6041a8'}
];

let select = document.getElementById('select');
let battle = document.getElementById('battle');
let icon_skill = document.querySelectorAll('#battle > div > .skills > .containt > img')
let state = document.getElementById('state');
let skip = document.getElementById('skip');
let state_text = document.querySelectorAll('#state > h1')[0];
let state_button = document.querySelectorAll('#state > span')[0];
let skill_win = document.querySelectorAll('#battle > div > .skills');
let score = document.getElementById('score');
let item_score = 0;
function logic(key_player, custom_player, vs_player, key_win_1, key_win_2, key_lose_1, key_lose_2, background_button,background_button_key){
    if(custom_player == key_player){
        if(key_player == vs_player){
            state_text.innerText = 'DRAW';
            skill_win[0].className += ' active_win ';
            skill_win[1].className += ' active_win ';
            state_button.style.backgroundImage = `linear-gradient(to top, ${background_button_key})`;
            setTimeout(() => {
                r.style.setProperty('--size_win', 50 + 'px');
            }, 900);
        }else if(vs_player == key_win_1 || vs_player == key_win_2){
            state_text.innerText = 'YOU WIN';
            skill_win[0].className += ' active_win '; 
            state_button.style.backgroundImage = `linear-gradient(to top, ${background_button_key})`;
            setTimeout(() => {
                r.style.setProperty('--size_win', 50 + 'px');
            }, 900);
            item_score += 1; 
            score.innerText = item_score;
        }else if(vs_player == key_lose_1 || vs_player == key_lose_2){
            state_text.innerText = 'YOU LOSE';
            skill_win[1].className += ' active_win ';
            setTimeout(() => {
                r.style.setProperty('--size_win', 50 + 'px');
            }, 900);
            item_score -= 1; 
            score.innerText = item_score;
            state_button.style.backgroundImage = `linear-gradient(to top, ${background_button})`;
        }
    }
}

function select_skills(x){
    let filter = array_skills.filter(function (el){
       if(el.key == x){
        r.style.setProperty('--background-skip', el.background);
        r.style.setProperty('--background-skill', el.background);
        r.style.setProperty('--shadow_skill', el.shadow);
        r.style.setProperty('--move-skip', 170 + '%');
        setTimeout(() => {
            select.style.opacity = 0;
        }, 500);
        setTimeout(() => {
            select.style.display = 'none';
            battle.style.display = 'grid';
            setTimeout(() => {
                battle.style.opacity = 1;
            }, 300);
        }, 900);
        icon_skill[0].src = `images/icon-${el.key}.svg`;
        return el;
       }
    })

    setTimeout(() => {
        let random_skills = Math.floor(Math.random() * 5)
            r.style.setProperty('--background_skill2', array_skills[random_skills].background);
            r.style.setProperty('--shadow_skill2', array_skills[random_skills].shadow);
            r.style.setProperty('--containt_background', '#efeff1');
            r.style.setProperty('--containt_shadow', '#dbdbdb');
            icon_skill[1].src = `images/icon-${array_skills[random_skills].key}.svg`;
            setTimeout(() => {
                state.style.visibility = 'visible';
                state.style.opacity = 1;
            }, 1500);
            logic(filter[0].key, 'scissors', array_skills[random_skills].key, 'paper', 'lizard', 'spock', 'rock', array_skills[random_skills].background, filter[0].background)
            logic(filter[0].key, 'spock', array_skills[random_skills].key, 'scissors', 'rock', 'lizard', 'paper', array_skills[random_skills].background, filter[0].background)
            logic(filter[0].key, 'paper', array_skills[random_skills].key, 'rock', 'spock', 'scissors', 'lizard', array_skills[random_skills].background, filter[0].background)
            logic(filter[0].key, 'lizard', array_skills[random_skills].key, 'paper', 'spock', 'rock', 'scissors', array_skills[random_skills].background, filter[0].background)
            logic(filter[0].key, 'rock', array_skills[random_skills].key, 'scissors', 'lizard', 'spock', 'paper', array_skills[random_skills].background, filter[0].background)
    }, 3000);


}

function play_again(){
    r.style.setProperty('--move-skip', -160 + '%');
    battle.style.opacity = 0;
    state.style.visibility = 'hidden';
    state.style.opacity = 0;
    r.style.setProperty('--size_win', 0 + 'px');
    setTimeout(() => {
        select.style.display = 'grid';
        battle.style.display = 'none';
        skill_win[0].classList.remove("active_win");
        skill_win[1].classList.remove("active_win");
        setTimeout(() => {
            select.style.opacity = 1;
        }, 300);
    }, 500);
    r.style.setProperty('--background-skill', 'unset');
    r.style.setProperty('--shadow_skill', 'unset');
    r.style.setProperty('--background_skill2', 'unset');
    r.style.setProperty('--shadow_skill2', 'unset');
    r.style.setProperty('--containt_background', '#192845');
    r.style.setProperty('--containt_shadow','unset');
    icon_skill[1].src = ``;
    icon_skill[0].src = ``;
}