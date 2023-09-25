const errorHandler = (err,req,res,next)=>{
  const statusCode = res.statusCode ? res.statusCode : 500;
  if(statusCode === 400)
  res.json({title:"Validation Failed" ,message:err.message, stackTrace:err.stack});
  else if(statusCode === 401)
  res.json({title:"Unauthorised" ,message:err.message, stackTrace:err.stack});
  else if(statusCode === 403)
  res.json({title:"Forbidden" ,message:err.message, stackTrace:err.stack});
  else if(statusCode === 404)
  res.json({title:"Not Found" ,message:err.message, stackTrace:err.stack});
  else if(statusCode === 500)
  res.json({title:"Server Error" ,message:err.message, stackTrace:err.stack});
  else
  console.log("All Ok")
};
export default errorHandler