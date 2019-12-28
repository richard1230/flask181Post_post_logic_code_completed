//  /**
//  * Created by hynev on 2017/12/31.
//  */
//

// $(function () {
//
//     var ue = UE.getEditor("editor",{
//         "serverUrl": '/ueditor/upload/'
//     });
// })


$(function () {
    var ue = UE.getEditor("editor",{
        "serverUrl": '/ueditor/upload/'
    });

    $("#submit-btn").click(function (event) {
        event.preventDefault();
     // 获取input标签
        var titleInput = $('input[name="title"]');
        var boardSelect = $("select[name='board_id']");
     // 获取input标签的值
        var title = titleInput.val();
        var board_id = boardSelect.val();
        //获取用户写的内容
        var content = ue.getContent();

        zlajax.post({
            'url': '/apost/',
            'data': {
                'title': title,
                'content':content,
                'board_id': board_id
            },
            'success': function (data) {
                if(data['code'] == 200){
                    zlalert.alertConfirm({
                        'msg': '恭喜！帖子发表成功！',
                        'cancelText': '回到首页',
                        'confirmText': '再发一篇',
                        'cancelCallback': function () {
                            window.location = '/';
                        },//回到首页
                        'confirmCallback': function () {
                            titleInput.val("");
                            ue.setContent("");
                        }
                    });
                }else{
                    zlalert.alertInfo(data['message']);
                }
            }
        });
    });
});