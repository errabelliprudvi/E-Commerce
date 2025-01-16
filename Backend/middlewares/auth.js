
const isAuthenticated =(req,res,next)=>{

    console.log("Session at athentication:", JSON.stringify(req.session, null, 2)); // View session contents

    if(req.session.userId)
    {
        console.log(req.session.userId)
        return next();
    }
    res.status(401).json({message:'Unauthorized,please login'})
};

module.exports= isAuthenticated