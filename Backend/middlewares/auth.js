
const isAuthenticated =(req,res,next)=>{
    if(req.session.userId)
    {
        console.log(req.session.userId)
        return next();
    }
    res.status(401).json({message:'Unauthorized,please login'})
};


module.exports= isAuthenticated