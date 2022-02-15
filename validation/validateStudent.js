module.exports = {
    validate: (data) => {
        let errors = [];
        
        if(!data.name || data.name.length === 0) {
            errors.push("Name is required");
        }
        if(!data.email || data.email.length === 0 || !isEmail(data.email)) {
            errors.push("A valid email is required");
        }
        if(errors.length > 0){
            return errors;
        }else{
            return null;
        }
        
    },
    validateEmail: (data) => {
        if(!data.email || data.email.length === 0 || !isEmail(data.email)) {
            errors.push("A valid email is required");
            return errors;
        }else{
            return null;
        }
    }
}

const isEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.match(regex)){
        return true;
    }
        return (false);
}