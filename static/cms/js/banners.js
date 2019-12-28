$(function () {
    $("#save-banner-btn").click(function (event) {
        event.preventDefault();
        var self = $(this);
        var dialog = $("#banner-dialog");
        var nameInput = $("input[name='name']");
        var imageInput = $("input[name='image_url']");
        var linkInput = $("input[name='link_url']");
        var priorityInput = $("input[name='priority']");


        var name = nameInput.val();
        var image_url = imageInput.val();
        var link_url = linkInput.val();
        var priority = priorityInput.val();
        var submitType = self.attr('data-type');
        var bannerId = self.attr("data-id");

        if (!name || !image_url || !link_url || !priority) {
            zlalert.alertInfoToast('请输入完整的轮播图数据！');
            return;
        }

        var url = '';
        if (submitType == 'update') {
            url = '/cms/ubanner/';
        } else {
            url = '/cms/abanner/';
        }

        zlajax.post({
            "url": url,
            'data': {
                'name': name,
                'image_url': image_url,
                'link_url': link_url,
                'priority': priority,
                'banner_id': bannerId
            },
            'success': function (data) {
                dialog.modal("hide");
                if (data['code'] == 200) {
                    // 重新加载这个页面
                    window.location.reload();
                } else {
                    zlalert.alertInfo(data['message']);
                }
            },
            'fail': function () {
                zlalert.alertNetworkError();
            }
        });
    });
});


// 这里需要注意一下:以点开头的为class名字，这里的 .edit-banner-btn
$(function () {
    $(".edit-banner-btn").click(function (event) {
        var self = $(this);
        //以#开头的是利用id来找的
        var dialog = $("#banner-dialog");
        dialog.modal("show");

        //拿到tr标签，首先获得button的父标签-->td,再获取td的标签--->tr
        var tr = self.parent().parent();
        var name = tr.attr("data-name");
        var image_url = tr.attr("data-image");
        var link_url = tr.attr("data-link");
        var priority = tr.attr("data-priority");

        var nameInput = dialog.find("input[name='name']");
        var imageInput = dialog.find("input[name='image_url']");
        var linkInput = dialog.find("input[name='link_url']");
        var priorityInput = dialog.find("input[name='priority']");
        var saveBtn = dialog.find("#save-banner-btn");

        nameInput.val(name);
        imageInput.val(image_url);
        linkInput.val(link_url);
        priorityInput.val(priority);
        saveBtn.attr("data-type", 'update');
        saveBtn.attr('data-id', tr.attr('data-id'));
    });
});


$(function () {
    $(".delete-banner-btn").click(function (event) {
        var self = $(this);
        var tr = self.parent().parent();
        var banner_id = tr.attr('data-id');
        zlalert.alertConfirm({
            "msg": "您确定要删除这个轮播图吗？",
            'confirmCallback': function () {
                zlajax.post({
                    'url': '/cms/dbanner/',
                    'data': {
                        'banner_id': banner_id
                    },
                    'success': function (data) {
                        if (data['code'] == 200) {
                            window.location.reload();
                        } else {
                            zlalert.alertInfo(data['message']);
                        }
                    }
                })
            }
        });
    });
});


$(function () {
    zlqiniu.setUp({
        // {#这里的域名为自己申请的账号所拥有的那个测试域名,注意，这里的域名结尾斜杠不能少，否则会出bug#}
        'domain': 'http://q35lhq667.bkt.clouddn.com/',
        'browse_btn': 'upload-btn',
        'uptoken_url': '/common/uptoken/',
        'success': function (up, file, info) {
            //     console.log(file);
            //     var image_url = file.name;
            //     var imageInput = document.getElementById('image-input');
            //     imageInput.value = image_url;
            //
            //     var img = document.getElementById('img');
            //     img.setAttribute('src', image_url);
            var imageInput = $("input[name='image_url']");
            imageInput.val(file.name);
        }
    });

});