const Professor = require('../models/Professor');
const validateProfessor = require('../validation/validateProfeesor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    registerProfessor: async (req, res) => {
        try {
            let output = {};
            // Validate req.body
            const validated = validateProfessor.validateRegister(req.body);
            if(validated != null){
                res.status(400).json(validated);
            }else{
                const { name, email, password } = req.body;

                // Check if professor already exist
                const professorExist = await Professor.find({email});
                if(professorExist.length > 0){
                    res.status(400).json("Professor already exist");
                }else{
                    // Create new professor object
                    const newProfessor = new Professor({
                        name,
                        email,
                        password
                    });

                    // Encrypt the password
                    const salt = await bcrypt.genSalt(10);
                    newProfessor.password = await bcrypt.hash(password, salt);

                    // Save professor to DB
                    const professor = await newProfessor.save();

                    // Create payload for jwt
                    const payload = {
                        professor: {
                            id: professor.id
                        }
                    }

                    // Create jwt
                    jwt.sign(payload, config.get("jwt.secret"), {
                        expiresIn: 3600
                    }, (err, token) => {
                        if(err) {
                            throw err;
                        }else{
                            output.message = "Professor created successfully";
                            output.token = token;
                            res.status(200).json(output);
                        }
                    });
                    
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Error registering professor");
        }

    },
    signIn: async (req, res) => {
        try {
            let output = {};
            // Validate req.body
            const validated = validateProfessor.validateSignIn(req.body);
            if(validated != null){
                res.status(400).json(validated);
            }else{
                const { email, password } = req.body;

                const professor = await Professor.findOne({email});

                if(!professor){
                    res.status(400).json("User doesn't exist");
                }else{
                    // Compare passwords
                    const isMatch = await bcrypt.compare(password, professor.password);
                    if(!isMatch){
                        res.status(400).json("Invalid password");
                    }else{
                        // Create payload for jwt
                    const payload = {
                        professor: {
                            id: professor.id
                        }
                    }

                    // Create jwt
                    jwt.sign(payload, config.get("jwt.secret"), {
                        expiresIn: 3600
                    }, (err, token) => {
                        if(err) {
                            throw err;
                        }else{
                            output.message = "Professor logged in successfully";
                            output.token = token;
                            res.status(200).json(output);
                        }
                    });
                    }
                }
            
            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Error loging in");
        }
    }
}
