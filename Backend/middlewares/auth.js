
const isAuthenticated =(req,res,next)=>{

    console.log("Session at athentication:", JSON.stringify(req.session, null, 2)); // View session contents

    if(req.session.user.id)
    {
        console.log(req.session.user.id)
        return next();
    }
    res.status(401).json({message:'Unauthorized,please login'})
};

module.exports= isAuthenticated