'use strict';

addEventListener("load", function () {
    setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
    window.scrollTo(0, 1);
}

$(function () {
    var queryString = Qs.parse(location.search.slice(1));
    console.log(queryString);

    var langs = ['en', 'zh'],
        langCode = queryString.lang;

    if (langs.indexOf(langCode) !== -1) $.getJSON('lang/' + langCode + '.json', translate);else $.getJSON('lang/en.json', translate);

    function translate(jsonData) {
        $('#TJ_IMScript').attr("data-token", jsonData.token);
        $('[key]').each(function () {
            var str = jsonData[$(this).attr('key')];
            $(this).html(str);
        });
        $('#name').attr("placeholder", jsonData.name);
    }

    $('#name').val(queryString.name);
    $(':radio[name="gender"][value="' + queryString.gender + '"]').attr("checked", true);
    $('#email').val(queryString.email);

    function initFormData() {
        formValidation();
    }

    initFormData();

    function validateEmail(email) {
        var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        return re.test(email);
    }

    function formValidation() {
        var $emailError = $('#emailError'),
            $submit = $('button[type="submit"]'),
            $name = $('#name').val(),
            $gender = $('input[name="gender"]:checked').val(),
            $email = $('#email').val();

        if ($name != '' && $gender != undefined && (validateEmail($email) || $email == '')) {
            $submit.attr('disabled', false);
        } else {
            $submit.attr('disabled', true);
        }

        if (validateEmail($email) || $email == '') {
            $emailError.css({
                'display': 'none'
            });
        } else {
            $emailError.css({
                'display': 'block'
            });
        }
    }

    $('#name').keyup(function () {
        console.log($('#name').val());
        formValidation();
    });

    $('input[name="gender"]').change(function () {
        console.log($('input[name="gender"]:checked').val());
        formValidation();
    });

    $('#email').keyup(function () {
        console.log($('#email').val());
        formValidation();
    });

    $('#connect').on('click', function () {
        var $uid = queryString.uid,
            $appId = queryString.appId,
            $lang = queryString.lang,
            $name = $('#name').val(),
            $gender = $(':radio[name="gender"]:checked').val(),
            $email = $('#email').val();

        if (!$uid) $uid = 'unknown';
        if (!$appId) $appId = 'global_website';

        var tjName = {
            en: {
                appId: 'APP ID',
                gender: 'Gender',
                email: 'Email'
            },
            zh: {
                appId: 'APP编号',
                gender: '性别',
                email: '邮件'
            }
        };

        var appId = '',
            gender = '',
            email = '';

        if ($lang == 'zh') {
            appId = tjName.zh.appId;
            gender = tjName.zh.gender;
            email = tjName.zh.email;
        } else {
            appId = tjName.en.appId;
            gender = tjName.en.gender;
            email = tjName.en.email;
        }

        console.log('appId, gender, email', appId, gender, email);

        console.log($appId, $uid, $name, $gender, $email);

        TJ_IM.config({
            uid: $uid, //客户ID（用户号=註冊號），必填
            name: $name, //客户名称（姓名），必填
            data: [//其他数据，数据属性有三个key，name，value				
            {
                key: 'appId', //属性字段名
                name: appId, //客服工作台显示的属性名称
                value: $appId //显示的属性值
            }, {
                key: 'gender',
                name: gender,
                value: $gender
            }, {
                key: 'email',
                name: email,
                value: $email
            }]
        });
    });
});
//# sourceMappingURL=script.js.map
