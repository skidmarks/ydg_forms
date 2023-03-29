document.addEventListener('DOMContentLoaded', function() {
    console.log('tester');

    // form layer closing
    const bodyEle = document.querySelector('body');
    const btnCloseFormLayer = document.querySelector('.btn_close_form_layer');
    const layerEventForm = document.querySelector('.evt_form_page');
    const paraPhone = document.querySelector('.phone_para');
    const inputName = document.querySelector('.ipt_name');
    const inputPhone = document.querySelector('.ipt_phone');
    const btnConfName = document.querySelector('.btn_name_conf');
    const btnConfPhone = document.querySelector('.btn_phone_conf');
    const stepPhone = document.querySelector('.step_phone');
    const pmask = document.querySelector('.pmission_mask');
    const pmLayer = document.querySelector('.pmission_wrap');
    const btnAgreePm = document.querySelector('.btn_agree_pm');
    const btnClosePm = document.querySelector('.btn_close_pm');
    const layerCertNumb = document.querySelector('.cert_numb_wrap');
    const personName = document.querySelector('.p_name');
    const phoneTitle = document.querySelector('.tit_phone');
    const nameTitle = document.querySelector('.tit_name');
    const infoTitle = document.querySelector('.info_tit');
    const btnCloseInfo = document.querySelector('.btn_close_info_cert');
    const layerCompleted = document.querySelector('.completed_wrap'); // 참여 성공 레이어
    const layerJoinedYet = document.querySelector('.joined_wrap'); // 이미 참여 레이어
    const certNumTester = document.querySelector('.cert_num'); // 인증번호 입력 레이어
    const btnCloseCompleted = document.querySelector('.btn_close_completed'); // 참여성공 레이어 닫기 버튼
    const btnCloseJoined = document.querySelector('.btn_close_joined'); // 이미참여 레이어 닫기 버튼

    // 상담하기 레이어 전체 닫기
    // 닫기 버튼 시 레이어 초기화(reset)
    btnCloseFormLayer.addEventListener('click', function(e) {
        e.preventDefault();
        // console.log(this.parentElement);
        this.parentElement.classList.remove('shown');
        resetInputText();
        resetInputCheck();
        layerCertNumb.classList.remove('shown');
        stepPhone.style.display = "none";
        paraPhone.style.display = "none";
        btnConfPhone.style.display = "none";
        infoTitle.style.display = "none";
        phoneTitle.style.display = "block";
        nameTitle.style.display = "block";

        window.close();
    });

    // input name Element blur, focus 이벤트 설정
    // 선 색상 변경 blur 회색, focus 블루
    inputName.addEventListener('blur', function(e) {
        console.log(this.parentElement);
        this.parentElement.classList.add('blur');
    });    
    inputName.addEventListener('focus', function(e) {
        console.log(this.parentElement);
        this.parentElement.classList.remove('blur');
    });    

    // 이름 확인 버튼 보이기
    // 상담 대상자 이름 입력값 넣기
    inputName.addEventListener('input', function(e) {
        btnConfName.style.display = "block";
        personName.textContent = e.target.value;
    });

    // 휴대폰번호 입력, 입력값의 길이가 11줄일때 입력자 이름 보이기
    inputPhone.addEventListener('input', function(e) {
        btnConfPhone.style.display = "block";
        if(e.target.value.length == 11) {
            phoneTitle.style.display = "none";
            infoTitle.style.display = "block";
        } else{
            phoneTitle.style.display = "block";
            infoTitle.style.display = "none";          
        }
    });

    // 이름 확인 버튼
    btnConfName.addEventListener('click', function(e) {
        e.preventDefault();
        stepPhone.style.display = "block";
        this.style.display = "none";
        // inputName.disabled = "disabled";
        paraPhone.style.display = "block";
        inputName.classList.add('blur');
        nameTitle.style.display = "none";
    });
    
    // 인증하기 버튼
    // 퍼미션 레이어 열림
    btnConfPhone.addEventListener('click', function(e) {
        e.preventDefault();
        pmask.style.display = "block";
        pmLayer.style.display = "block";
        bodyEle.classList.add('over_hide');
    });


    // 퍼미션 레이어 닫기 버튼
    btnClosePm.addEventListener('click', function(e) {
        e.preventDefault();
        pmask.style.display = "none";
        pmLayer.style.display = "none";
        bodyEle.classList.remove('over_hide');
        resetInputCheck();
    });

    // 퍼미션 레이어 동의하기 버튼
    btnAgreePm.addEventListener('click', function(e) {
        e.preventDefault();
        layerCertNumb.classList.add('shown');
        pmask.style.display = "none";
        pmLayer.style.display = "none";
        bodyEle.classList.remove('over_hide');
    });

    // 인증번호 닫기(뒤로가기 버튼)
    btnCloseInfo.addEventListener('click', function(e) {
        e.preventDefault();
        layerCertNumb.classList.remove('shown');
    });

    // input value 리셋
    function resetInputText() {
        const allFormInputs = layerEventForm.querySelectorAll('input');
        allFormInputs.forEach(function(input) {
            input.value = '';

            // input, input부모 element에 blur className 있는지 확인, 있으면 없앰
            if (input.classList.contains('blur')) {input.classList.remove('blur')};
            if (input.parentElement.classList.contains('blur')) {input.parentElement.classList.remove('blur')};
        });
    }

    // input checked checked 해제하기
    function resetInputCheck() {
        const allPmissionInputs = pmLayer.querySelectorAll('input');
        allPmissionInputs.forEach(function(check) {
            check.checked = false;
        });
    }

    //인증번호 테스트, 
    certNumTester.addEventListener('change', function(e) {
        if(e.target.value.length != 6){
            alert('잘못된 번호입니다.');
        }

        if (inputPhone.value == "01012345678") {
            layerJoinedYet.style.display = "flex";
        }

        if(e.target.value == "123456") {
            layerCompleted.style.display = "flex"
        } else{
            alert('잘못된 번호입니다.');
        }
    });

    btnCloseCompleted.addEventListener('click', function(e) {
        e.preventDefault();
        window.close();
    });
});

;(function ($) {

    // 퍼미션 동의 버튼
    $(function(){

        var $btnToggle = $('.btn_details');
        var $allAgrBox = $('.prm_wrap');
        var $chkAllAgr01 = $('.chk_all');
        var $check = $('.chk');	
        var $checkOpt = $('.chk.opt');	
        var $checkReq = $('.chk.req');
        var $required = $('.required');

        $allAgrBox.hide();


        // 동의 상세 열고 닫는 토글
        var agreeToggle = function(e) {
            var $that = $(this);
            var $eachBox = $that.parent().find("+.prm_wrap");
            var $eachToggle = $that.siblings(".btn_details");

            $eachToggle.show();


            // this가 checkbox인지 아닌지
            if (!$that.is(':checkbox')) {
                e.preventDefault();		

                if ($eachBox.is(':hidden')) {
                    $eachBox.removeClass("fix_h").show();
                    $that.text('닫기');
                }else {
                    $eachBox.hide();
                    $that.text('보기');
                }
            }else {
                if ($eachBox.is(':hidden')) {
                    $eachBox.removeClass("fix_h").show();
                    $that.text('닫기');
                }else {
                    $eachBox.hide();
                    $that.text('보기');
                }				
            }	
        };

        // 버튼 클릭 시
        $btnToggle.each(function () {		
            var $this = $(this);
            $this.on("click", agreeToggle);
        });

        // 전체동의
        $chkAllAgr01.change(function () {
            $required.show().addClass("fix_h");
            $checkOpt.prop('checked', $(this).prop("checked"));
            $checkReq.prop('checked', $(this).prop("checked"));
        //			$(".btn_opt").trigger("click");
        });

    });

})(jQuery);        