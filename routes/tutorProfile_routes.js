module.exports = function(app, mysql, con){

    app.put('/editProfile', function(req, res){

        var role = req.body.role;
        var email = req.body.email;

        if(role === 'tutor'){
            var fname = req.body.fname;
            var lname = req.body.lname;
            var mobile =  req.body.mobile;
            var subject = req.body.subject;
            var location = req.body.location;
        
            var sql = "update tutor set FirstName='"+fname+"', LastName='"+lname+"', Mobile='"+mobile+"', Subject='"+subject+"', location='"+location+"' where email='"+email+"'";

            con.query(sql, function(err, result){
                if (err){
                    res.status(404).send({
                        msg: 'An error occurred'
                    });
                }
                else {
                    console.log(result);
                    res.send({
                        msg: 'update successful'
                    });
                }
            });
        
        }

        if(role === 'student'){
            var name = req.body.name;
            var mobile = req.body.mobile;
            var location = req.body.location;

            var sql = "update student set name='"+name+"', mobile='"+mobile+"', location='"+location+"' where email='"+email+"'";

            con.query(sql, function(err, result){
                if (err){
                    res.status(404).send({
                        msg: 'An error occurred'
                    });
                }
                else{
                    console.log(result);
                    res.send({
                        msg: 'update successful'
                    });
                }
            });
        }
        

    });
}