document.getElementById('customer-section').style.display = "none";
document.getElementById('item-section').style.display = "none";
document.getElementById("order-section").style.display = "none";
// document.getElementById("loginDiv").style.display = "none";


document.getElementById("dashboard-nav").addEventListener('click',function (){
    document.getElementById("dashboard-section").style.display = "block";
    document.getElementById("customer-section").style.display = "none";
    document.getElementById("item-section").style.display = "none";
    document.getElementById("order-section").style.display = "none";
    // document.getElementById("loginDiv").style.display = "none";
});

document.getElementById("customer-nav").addEventListener('click',function (){
    document.getElementById("customer-section").style.display = "block";
    document.getElementById("item-section").style.display = "none";
    document.getElementById("order-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "none";
    // document.getElementById("loginDiv").style.display = "none";
})

document.getElementById("item-nav").addEventListener('click',function (){
    document.getElementById('item-section').style.display = "block";
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("customer-section").style.display ="none";
    document.getElementById("order-section").style.display = "none";
    // document.getElementById("loginDiv").style.display = "none";
});


document.getElementById("order-nav").addEventListener("click",function (){
    document.getElementById('order-section').style.display = "block";
    document.getElementById("customer-section").style.display = "none";
    document.getElementById("item-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "none";
    // document.getElementById("loginDiv").style.display = "none";
});
// document.getElementById("sign-up-nav").addEventListener("click",function (){
//     document.getElementById('order-section').style.display = "none";
//     document.getElementById("customer-section").style.display = "none";
//     document.getElementById("item-section").style.display = "none";
//     document.getElementById("dashboard-section").style.display = "none";
//     document.getElementById("loginDiv").style.display = "block";
// });




