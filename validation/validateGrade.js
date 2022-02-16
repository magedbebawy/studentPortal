module.exports = {
    validate: (data) => {
        let errors = [];
        
        if(!data.assignment || data.assignment.length === 0) {
            errors.push("Assignment is required");
        }
        if(!data.grade || data.grade.length === 0) {
            errors.push("Grade is required");
        }
        if(errors.length > 0){
            return errors;
        }else{
            return null;
        }
        
    }
}