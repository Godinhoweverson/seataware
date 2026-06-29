const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");


//Register API
const register = async(req, res) =>{
    const {full_name, email, password } = req.body;

    if(!full_name || !email || !password){
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    try{
        //Check if email already exist

        const checkUser = "SELECT * FROM users WHERE email = ?";

        db.query(checkUser, [email], async(err, result) =>{

            if(err){
                return res.status(500).json(err);
            }

            if(result.length > 0){
                return res.status(400).json({
                    message: "Email already exists."
                })
            }

             //Hash password

            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `INSERT INTO users (full_name, email, password_hash) VALUES (?,?,?)`;

            db.query(sql, [full_name, email, hashedPassword],
                (err) =>{

                    if(err){
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: "User registered successfully"
                    });
                }
            );
        });  
    } catch(error){
        res.status(500).json.error();
    }
};

//Login API
const login = (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async(err, results) =>{
        if(err){
            return res.status(500).json({
                message: "Database error",
            });
        }

        if(results.length == 0){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(
                password,
                user.password_hash
            );

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign({
            user_id: user.user_id,
            email: user.email,
            role: user.role,
        },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
            },
        });
    });
}

module.exports = { register, login };