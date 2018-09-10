module.exports = function(app, mysql, con, jwt, bcrypt){

    app.post('/login', function(req, res){
        var email = req.body.email;
        var pword = req.body.password;
        var role = req.body.role;

    //role tutor-------
        
    if(role==='tutor'){
        var sql = "select * from tutor where email='"+email+"'";
        var sql2 = "select pword from tutor where email = '"+email+"'";

        con.query(sql, function(err, result){
            if(err) throw err;
            else if(result.length == 0 ){
                res.send({
                    msg: 'Email does not exist'
                });
            }
            else{
                
                var fname = result[0].FirstName;
                var lname = result[0].LastName;
                var location, mobile, subject;

                if(result[0].Location){
                    location = result[0].Location;
                }
                else{
                    location = '';
                }

                if(result[0].Mobile){
                    mobile = result[0].Mobile;
                }
                else{
                    mobile = '';
                }

                if(result[0].Subject){
                    subject = result[0].Subject;
                }
                else{
                    subject = '';
                }
                
                con.query(sql2, function(err, result){
                    if (err) throw err;
                    else{
                            var pass = result[0].pword;
                            bcrypt.compare(pword, pass, function(err, response) {
                            if(err) throw err;
                            else if(response){                                     
                                           const user = {
                                            user_fname: fname,
                                            user_lname: lname,
                                            user_mobile: mobile,
                                            user_subject: subject,
                                            user_location: location                                        
                                        };
    
                                        const token = jwt.sign({ user }, 'secret_key');
                                        console.log(user);
                                        console.log(token);
                                       
                                        res.json({
                                            token: token,
                                        });
                                        }                            
                                else{
                                    res.send({
                                        msg: 'incorrect password'
                                    })
                                }
                                
                            }); 
                        }  
                    });
                    
                }    
            });
       
    }

    //role student------

    if(role==='student'){
        var sql = "select * from student where email='"+email+"'";
        var sql2 = "select pword from student where email = '"+email+"'";
        
        con.query(sql, function(err, result){
            if(err) throw err;
            else if(result.length == 0 ){
                res.send({
                    msg: 'Email does not exist'
                });
            }
            else{
                console.log(result);
                var name = result[0].name;
                var location, mobile;

                if(result[0].location){
                    location = result[0].location;
                }
                else{
                    location = '';
                }

                if(result[0].mobile){
                    mobile = result[0].mobile;
                }
                else{
                    mobile = '';
                }
            
                con.query(sql2, function(err, result){
                    if (err) throw err;
                    else{
                            var pass = result[0].pword;
                            bcrypt.compare(pword, pass, function(err, response) {
                            if(err) throw err;
                            else if(response){                                     
                                           const user = {
                                            user_name: name,
                                            user_mobile: mobile,
                                            user_location: location                                        
                                        };
    
                                        const token = jwt.sign({ user }, 'secret_key');
                                        console.log(user);
                                        console.log(token);
                                       
                                        res.json({
                                            token: token,
                                        });
                                        }                            
                                else{
                                    res.send({
                                        msg: 'incorrect password'
                                    })
                                }
                                
                            }); 
                        }  
                    });
                    
                }    
            }); 
        }
   
    });

}