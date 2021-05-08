const tambolaonlinemodel = require('../model/TAmbolaonline');
const tambolahandeler = require('./tambolaonlinehandeler')
const Stringgenerator = require('password-generator');
const tambolacontroller =  ()=>{
    return {
        async twoplayeronline(roomtype, name ){
            try{
                const gameawailable = await tambolaonlinemodel.find({roomtype: 2, roomstatus : "active"});
                if(gameawailable){
                    // 
                    const  checkforposition = await tambolacontroller.find({roomttype: 2 , roomstatus : "active" , })
                     
                }
                else{
                    // create room
                    const newroomid = Stringgenerator(8,  false, "[\w]");
                     
                    
                    
                }
            
            }
            catch(err){
                if(err) console.log(err);
                return {err: 1, message:"Internal server error"}
            } 


        },
        async fourplayeronline(){

        }

    }
}
module.exports = tambolacontroller;