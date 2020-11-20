(function(){
    
	ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    

    testTool = window.testTool;
    

    document.getElementById('join_meeting').addEventListener('click', function(e){
        e.preventDefault();
        var meetConfig = {
            userName: sessionStorage.getItem("user_id"),
            leaveUrl: "https://mentor.codeasylums.com/dashboard",
            
        };


        

        axios.post('http://localhost:3000/sig1', {
            zid : sessionStorage.getItem("schedule_id")
        })
        .then(function(response) {
            
            ZoomMtg.init({
                leaveUrl: 'https://mentor.codeasylums.com/dashboard',
                isSupportAV: true,
                success: function () {
                    ZoomMtg.join(
                        {
                            meetingNumber: response.data.meetingNumber,
                            userName: meetConfig.userName,
                            signature: response.data.signature,
                            apiKey: response.data.apiKey,
                            passWord: response.data.passwd,
                            success: function(res){
                                // $('#nav-tool').hide();
                                console.log('join meeting success');
                                ZoomMtg.record({
                                    record: true
                                });
                            },
                            error: function(res) {
                                console.log(res);
                            }
                        }
                    );
                },
                error: function(res) {
                    console.log(res);
                }
            });
            
            
           
        })
        .catch(function(error) {
             console.log(error);
        });




    

        

    });

})();
