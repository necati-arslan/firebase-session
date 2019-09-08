const middleware_log = (req,res,next)=>{
    console.log(`${req.originalUrl}`);
    next();
  }

  module.exports= middleware_log;