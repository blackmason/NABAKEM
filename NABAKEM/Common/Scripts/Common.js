$(document).ready(function () {
    var code;
    var key;

    $('.tbl_list .data_tr').click(function () {
        code = $(this).data('code');
        key = $(this).data('key');

        if ('menu' == key) {
            GetMenus(code);
        }
        else if ('menuType' == key) {
            GetMenuGroup(code);
        }

    });

    FindParents();

    $('#btn-cancel').click(function () {
        EmptyForms();
    });

    $('#btn-update').click(function () {
        var btnVal = $('#btn-update').val();

        // 메뉴/메뉴그룹에 따라 다르게 적용되게 수정 해야됨
        if ('menuUpdate' == btnVal) {
            SubmitForms('menuUpdate');
        } else {
            SubmitForms('menuGroupUpdate');
        }
        
    })
    $('#btn-add').click(function () {
        SubmitForms('add');
    })
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
    $('.tbl_menu_info input').each(function () {
        $(this).val('');
    })
}

/*
    추가버튼/수정버튼
    텍스트 박스 내용으로 메뉴 생성/메뉴 수정
*/
function SubmitForms(btnGb) {
    var value = [];
    var json = {};

    $('.tbl_menu_info .form_data').each(function (i, v) {
        value[i] = $(this).val();
    })

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

    if (btnGb == 'update') {
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
    else {
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