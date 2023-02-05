let info=Array(Object(localStorage.getItem("Login info")));

const addInfo =(ev)=>{
    console.log(typeof(info))
    ev.preventDefault();
    
    let info2={
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value
    }
    
    info.push(info2);
    document.forms[0].reset();

    console.warn('added',{info2});
    let pre= document.querySelector('#msg pre');
    pre.testContent='\n' + JSON.stringify(info,'\t',2);

    localStorage.setItem("Login info",JSON.stringify(info));
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click',addInfo)
});