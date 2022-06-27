const errhandling = (err)=>{
   switch (err.message){
    case "You are not Authorized" :
        err.status = 409
        return err
    case "user not found":
        err.status = 404
        return err
        default :
        err.status = 400;
      err.message = "An error occured";
      return err;
   }
}

module.exports = {errhandling}