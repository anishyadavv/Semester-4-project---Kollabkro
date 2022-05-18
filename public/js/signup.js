var a;
function show_student() {

    if (a == 1) {
        document.getElementById("studentform").style.display = "inline";
        return a = 0;
    }
    else {
        document.getElementById("studentform").style.display = "none";
        return a = 1;
    }
}

module.exports={
    show_student
}