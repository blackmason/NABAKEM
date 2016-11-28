$(document).ready(function () {
    var menus = [];
    var parent;
    var child;

    $.ajax({
        url: '/Main/GetMenus',
        success: function (data) {
            SetDropdown(data)
            ObjToHtml(menus, $('#navigation'));
        }
    })

    function SetDropdown(obj) {
        $.each(obj, function (i) {
            if (obj[i].ParentCode == '0') {
                parent = {
                    code: obj[i].Code,
                    pCode: obj[i].ParentCode,
                    name: obj[i].Name,
                    url: obj[i].Url,
                    role: obj[i].Role,
                    enabled: obj[i].Enabled,
                    child: []
                }
                menus.push(parent);
            } else {
                child = {
                    code: obj[i].Code,
                    pCode: obj[i].ParentCode,
                    name: obj[i].Name,
                    url: obj[i].Url,
                    role: obj[i].Role,
                    enabled: obj[i].Enabled,
                    child: []
                }

                for (var k = 0; k <= menus.length - 1; k++) {
                    if (menus[k].code == obj[i].ParentCode) {
                        menus[k].child.push(child);
                    }
                }
            }
        })
    }

    function ObjToHtml(obj, target) {
        $.each(obj, function (i) {
            //var li = $('<li>' + this.name + '</li>');
            var li = $('<li><a href="' + this.url + '">' + this.name + '</a></li>');
            //href.appendTo(li);
            li.appendTo(target).trigger('create');

            if (this.child && this.child.length > 0) {
                var ul = $('<ul class="sub-navigation"></ul>');
                ul.appendTo(li);
                ObjToHtml(this.child, ul);
            }
        });
    }
});