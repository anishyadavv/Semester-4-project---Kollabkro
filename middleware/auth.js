const islogin = async(req , res ,next)=>{
    try{
        if(req.session.user_id ){}
        else if(req.session.mentor_id){}
        else{
          return   res.redirect('/login');
        }
        next();
    }catch(error){
        console.log(error.message);
    }
}


const islogout = async(req , res,next)=>{
    try{
        if(req.session.user_id){
            res.redirect('/home2');
        }
        next();

    }catch(error){
        console.log(error.message);
    }
}

module.exports ={
    islogin,
    islogout
}