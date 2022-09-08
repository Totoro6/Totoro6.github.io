window.onload =function() {
    var oinputs = document.getElementsByTagName("input");
    var btn = document.getElementsByTagName("btn");
    btn.onclick = function() {
        //针对输入内容做一个简单的验证，输入的内容不能为空
        var time = new Date();
        if((!oinputs[0].value||!oinputs[1].value)){
            alert("输入的内容不能为空！");
        }else{
            $ajax({
                method : "post",
                url :"./php/register.php",
                date :{
                    userinfo : oinputs[0].value,
                    password : oinputs[1].value,
                    creat_time :time.getTime()//获取到毫秒数
                },
                success : function(result){

                },
                error : function (mgs) {
                    
                }
            })
        }
        $username = $_POST('username');
        $password = $_POST('password');
        $create_time = $_POST('create_time')
        $link = sqlserver("LAPTOP-KKH48PV1","root","pzptas9q");
        if($link){
            $responddata['code']=0;
            $responddata['message'] = "数据库连接失败";
            exit;
        }
        
    }
}