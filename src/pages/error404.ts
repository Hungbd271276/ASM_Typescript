import { $ } from '../ultil'
export default class error404 {
    render(){
        $('.point').style.visibility = "hidden";
        return /*html*/`
        <img src="images/404page.jpg" height="400px" width = "600px">
        `
    }
}