import { $ } from '../ultil';
export default class login {
    async render() {
        $('.point').style.visibility = "hidden";
        return /*html*/`
                <div class="container-fluid" style="height: 700px;">
                    <div class="container">
                    <div class="row">
                        <div class="col-xl-2"></div>
                        <div class="col-xl-8">
                            <form id="form-submit">
                                <h2 style = "text-align:center">Memory Game</h2>
                                <label for="">Nhập tên của bạn:</label>
                                <input type="text" class="form-control" id="userName" aria-describedby="emailHelp"><br>
                                <button type="submit" class="btn btn-primary">Submit</button> 
                            </form>                  
                        </div>
                            
                    </div>
                    </div>
                </div>
        `
    };
    async afterRender() {
        $('#form-submit').addEventListener('submit', e => {
            e.preventDefault();
            if ($('#userName').value == "") {
               alert('Bạn chưa nhập tên');
               $('#userName').focus();
            } else {
                const userName = $('#userName').value;
                localStorage.setItem('user', userName);
                window.location.hash = '/games';
            }
        })
    }
}