//페이지가 로드될 때 실행할 코드 정의
$(document).ready(function() {
    encodeURIComponent();

    const IMP = window.IMP; // 생략 가능
    IMP.init("imp68438770"); // 예: imp00000000a

    // console.log(IMP);
    let token = "";


    $('#login-form').submit(function(e) {
    // form 제출 이벤트 캐치
    //이벤트의 기본 동작을 취소하는 메소드. 여기서는 
        e.preventDefault();
        
        // 이메일과 패스워드 값 가져오기
        const email = $('#email').val();
        const password = $('#password').val();
        
        // POST 요청을 위한 데이터를 설정
        const postData = {
            email: email,
            passwd: password
        };
        
        // data 잘 받았는지 체크
        console.log(postData);

        var xhr = new XMLHttpRequest();


        // AJAX POST 요청
        $.ajax({
        
            url:    'http://192.168.0.122:8080/member/login',

            type:   'POST', 

            data: JSON.stringify(postData),
            
            beforeSend: function (xhr) {
                //헤더 이름, 헤더 값
                xhr.setRequestHeader("Content-type","application/json");
            },
            success: function(response) {
                // 요청이 성공할 경우 실행되는 콜백 함수
                console.log(response);
                console.log(response.accessToken);
                token = response.accessToken;
            },
            error: function(error) {
                // 요청이 실패할 경우 실행되는 콜백 함수
                console.log(error);
            }
        });
    });


    $('#point-form').submit(function(e) {
        var xhr2 = new XMLHttpRequest();

        e.preventDefault();
        console.log(token);

        $.ajax({
            url: 'http://192.168.0.122:8080/reservation/ready?memberId=1062',
            type: 'GET',

            // headers: {
            //     'Authorization': `Bearer ${token}`
            // },
        
            beforeSend: function (xhr2) {
                //헤더 이름, 헤더 값
                xhr2.setRequestHeader("Authorization",`Bearer ${token}`);
            },
            success: function(response) {
                // 요청이 성공할 경우 실행되는 콜백 함수
                console.log(response);
            },
            error: function(error) {
                // 요청이 실패할 경우 실행되는 콜백 함수
                console.log(error);
            }
          });
    });

    $('#requestPay-form').submit(function(e) {
        // function requestPay() {
        //     IMP.request_pay({
        //       pg: "kcp.iamporttest_3",
        //       pay_method: "card",
        //       merchant_uid: "ORD20180131-0000011",   // 주문번호
        //       name: "노르웨이 회전 의자",
        //       amount: 64900,                         // 숫자 타입
        //       buyer_email: "gildong@gmail.com",
        //       buyer_name: "홍길동",
        //       buyer_tel: "010-4242-4242",
        //       buyer_addr: "서울특별시 강남구 신사동",
        //       buyer_postcode: "01181"
        //     }, function (rsp) { // callback
        //       if (rsp.success) {
        //         // 결제 성공 시 로직
        //       } else {
        //         // 결제 실패 시 로직
        //       }
        //     });
        // }
    });

    const payButton = document.querySelector('#pay')

    payButton.addEventListener('click',()=>{
        
            IMP.request_pay({
              pg: "kcp.iamporttest_3",
              pay_method: "card",
              merchant_uid: "ORD20180131-0000011",   // 주문번호
              name: "노르웨이 회전 의자",
              amount: 64900,                         // 숫자 타입
              buyer_email: "gildong@gmail.com",
              buyer_name: "홍길동",
              buyer_tel: "010-4242-4242",
              buyer_addr: "서울특별시 강남구 신사동",
              buyer_postcode: "01181"
            }, function (rsp) { // callback
              if (rsp.success) {
                // 결제 성공 시 로직
              } else {
                // 결제 실패 시 로직
              }
            });
    });

});