$(document).ready(function () {
    var code;
    var pageKey = $('#page-key').val();

    $('.data_tr').click(function () {
        code = $(this).data('code');
        

        if ('menu' == pageKey) {
            GetMenus(code);
        }
        else if ('menuGroup' == pageKey) {
            GetMenuGroup(code);
        }
    });

    FindParents();

    $('#btn-cancel').click(function () {
        EmptyForms();
    });

    $('#btn-update').click(function () {
        if ('menu' == pageKey) {
            SubmitForms('menu','update');
        } else if ('menuGroup' == pageKey) {
            SubmitForms('menuGroup','update');
        }
    });

    $('#btn-add').click(function () {
        if ('menu' == pageKey) {
            SubmitForms('menu','add');
        } else if ('menuGroup' == pageKey) {
            SubmitForms('menuGroup','add');
        }
    });
});

/*
    메뉴 가져오는 ajax
*/
function GetMenus(code) {
    $.ajax({
        url: '/Admin/GetMenu',
        data: { code: code },
        success: function (data) {
            $('#menu-name').val(data.Name);
            $('#menu-code').val(data.Code);

            $('#menu-group').val(data.TypeCode);

            GetParentName(data.ParentCode);
            $('#parent-code').val(data.ParentCode);

            if (data.Url == '') {
                $('#menu-url').val('없음');
            }
            else {
                $('#menu-url').val(data.Url);
            }

            $('#menu-comment').val(data.Comment);
            $('#menu-isuse').val(data.IsUse);
            $('#menu-ordering').val(data.Ordering);
        },
        error: function (xhr, error, status) {
            alert(xhr + ":" + error + ":" + status + ":" + typeof (code));
        }
    });
}

/*
    메뉴그룹 가져오는 ajax
*/
function GetMenuGroup(code) {
    $.ajax({
        url: '/Admin/GetMenuGroup',
        data: { code: code },
        success: function (result) {
            $('#group-code').val(result.Code);
            $('#group-name').val(result.Name);
            $('#group-isuse').val(result.IsUse);
            $('#group-auth').val(result.AuthLevel)
            $('#group-ordering').val(result.Ordering);
            $('#group-comment').val(result.Comment);
        },
        error: function (xhr, error, status) {
            alert(xhr + ":" + error + ":" + status + ":" + typeof (code));
        }
    });
}

/*
    선택 메뉴의 상위메뉴
    선택한 메뉴의 상위메뉴를 가져와 셀렉트박스에 설정
*/
function GetParentName(parentCode) {
    if ('0' == parentCode) {
        $('#parent-name').val('최상위');
    }
    else {
        $.ajax({
            url: '/Admin/GetMenu',
            data: { code: parentCode },
            success: function (parent) {
                $('#menu-parent').val(parent.Code);
            }
        });
    }
}

/*
    상위메뉴 찾기
    상위 메뉴 코드가 '0' 인 메뉴를 셀렉트박스에 세팅
*/
function FindParents() {
    $.ajax({
        url: '/Admin/GetParentMenus',
        success: function (data) {
            $.each(data, function (i) {
                $('#menu-parent').append('<option value="' + data[i].Code + '">' + data[i].Name + '</option>');
            });

        },
        error: function (request, status, error) {
            alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}

/*
    취소버튼
    텍스트박스 클리어
*/
function EmptyForms() {
    $('.tbl_form input').each(function () {
        $(this).val('');
    })
}

/*
    추가버튼/수정버튼
    텍스트 박스 내용으로 메뉴 생성/메뉴 수정
*/
function SubmitForms(btnGb, command) {
    var value = [];
    var json = {};

    if ("menuGroup" == btnGb) {
        $('.tbl_menu_group_info .form_data').each(function (i, v) {
            value[i] = $(this).val();
        });

        json = {
            Code: value[0],
            Name: value[1],
            IsUse: value[2],
            AuthLevel: value[3],
            Ordering: value[4],
            Comment: value[5]
        }
    }
    else {
        $('.tbl_menu_info .form_data').each(function (i, v) {
            value[i] = $(this).val();
        });

        json = {
            Code: value[0],
            Name: value[1],
            TypeCode: value[2],
            ParentCode: value[3],
            Url: value[4],
            IsUse: value[5],
            Ordering: value[6],
            Comment: value[7],
        }
    }

    // Submit 커맨드가 update 일때
    if ('update' == command) {
        if ('menuGroup' == btnGb) {
            $.ajax({
                url: '/Admin/UpdateMenuGroup',
                data: json,
                success: function (data) {
                    alert("메뉴수정이 완료되었습니다.");
                    location.reload();
                },
                error: function (request, status, error) {
                    alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });
        }
        else if ('menu' == btnGb) {
            $.ajax({
                url: '/Admin/UpdateMenu',
                data: json,
                success: function (data) {
                    alert("메뉴수정이 완료되었습니다.");
                    location.reload();
                },
                error: function (request, status, error) {
                    alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });
        }
    }
    // Submit 커맨드가 add 일때
    else {
        if ('menuGroup' == btnGb) {
            $.ajax({
                url: '/Admin/AddMenuGroup',
                data: json,
                success: function (data) {
                    alert("메뉴추가가 완료되었습니다.");
                    location.reload();
                },
                error: function (request, status, error) {
                    alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });
        }
        else if ('menu' == btnGb) {
            $.ajax({
                url: '/Admin/AddMenu',
                data: json,
                success: function (data) {
                    alert("메뉴추가가 완료되었습니다.");
                    location.reload();
                },
                error: function (request, status, error) {
                    alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                }
            });
        }
    }
}