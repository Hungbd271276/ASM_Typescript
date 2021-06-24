import Navbar from '../component/navbar';
import { $, reRender } from '../ultil';
export default class playgame {
    async render() {
        let result: string = '';
        const pokemons: number = 20;
        interface PokemonInterface {
            id: number,
            img: string
        }
        let arrPokemon: PokemonInterface[] = [];
        for (let i = 10; i < pokemons; i++) {
            let data: any = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            let pokemon: any = await data.json();
            console.log(pokemon);
            arrPokemon = [...arrPokemon, { id: pokemon.id, img: pokemon.sprites.front_default }];
        }
        const cardPokemon: any = [...arrPokemon,...arrPokemon];
        cardPokemon.sort(() => {
            return Math.random();
        })
        cardPokemon.forEach((item: any, index: number) => {
            result += /*html*/`
            <div class="col-xl-3">
                <article class="flashcard" id="card-${index}">
                <input id="flashcard-${index}" id_pokemon="${item.id}" index="${index}" class="poke" type="checkbox" checked/>
                <label for="flashcard-${index}">
                <section class="front">
                </section>
                <section class="back">
                <img src="${item.img}"  height="150px">
                </section>
                </label>
            </div>
            `
        });
        $('#navbar').innerHTML = await Navbar.render();
        $('.point').innerHTML = "Điểm: 0";
        return /*html*/`
        <div class="container">
        <div class="row">
            ${result}
        </div>
        </div>
        `
       
    };

    async afterRender() {
        setTimeout( () => {
                for (let i = 0; i < 20; i++) {
                    const input = $(`#flashcard-${i}`) as HTMLInputElement;
                    input.checked = false;
                }
            },3000)
        let focusPokemon: HTMLElement[] = [];              
        let count: number = 0;                              
        let totalPoint: number = 0;                        
        let duplicatePokemon: number = 0;                    
        const userName: string = localStorage.getItem('user');   
        const poke: HTMLInputElement[] = $('.poke');          

        poke.forEach((item: HTMLInputElement) => {            
            item.addEventListener('click', () => {          
                focusPokemon = [...focusPokemon, item];    
                count++;                                    
                if (count >= 2) {                           
                    count = 0;                              
                if (focusPokemon[0].getAttribute("id_pokemon") ==           
                    focusPokemon[1].getAttribute("id_pokemon") &&          
                    focusPokemon[0].getAttribute("index") !=                 
                    focusPokemon[1].getAttribute("index")) {
                    
                    focusPokemon.forEach((item: HTMLInputElement) => {         
                        setTimeout(() => {
                            $(`#card-${item.getAttribute("index")}`).style.display = "none";  
                        }, 500)
                    })
                    totalPoint += 100;                          
                    duplicatePokemon += 1;                     
                } else {
                    focusPokemon.forEach((item: HTMLInputElement) => {              
                        const input = $(`#flashcard-${item.getAttribute("index")}`) as HTMLInputElement;
                        setTimeout(() => {
                            input.checked = false;          
                        }, 500)
                    })
                    if (totalPoint > 0) {                       
                        totalPoint -= 50;                        
                     }
                    }
                    focusPokemon = [];                  
                    $('.point').innerHTML = 'Điểm: ' + totalPoint;
                }
                if (duplicatePokemon == 10) {
                    alert(' chúc mừng: ' + userName + ' đã dành chiến thắng với số điểm là: ' + totalPoint + ' chiến thắng ')
                }
            })
        });
 
        const Assignment = new playgame();
        const restartBtn: HTMLElement = $(' .restart');
        restartBtn.addEventListener('click', async function () {
            const quesition =  confirm('bạn có chắc muốn chơi lại không');
            if (quesition) {
                alert('Chơi lại thành công');
                reRender(Assignment, '#content')    
            } else {
                alert("Bạn đã hủy!");
            }     
        })
 
        const logoutBtn: HTMLElement = $('.logout');
        logoutBtn.addEventListener('click', async function () {
            localStorage.removeItem('user');    
            $('#navbar').innerHTML = '';
            window.location.hash = '/';
        })
    }
}