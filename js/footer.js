/**
 * WINIPIC 2.0 Global Footer Script
 */

function renderFooter() {
    // 중복 렌더링 방지
    if (document.querySelector('.w-footer')) return;

    const footerHTML = `
    <footer class="w-footer">
        <div class="w-footer-content">
            <!-- 고객센터 -->
            <div class="w-footer-col">
                <h3>CUSTOMER CENTER</h3>
                <div class="footer-tel">TEL: 010-5507-0520</div>
                <div class="footer-desc">
                    월 ~ 금 9:00 ~ 18:00<br>
                    점심시간 12:30 ~ 13:30<br>
                    주말,공휴일은 휴무입니다.
                </div>
            </div>

            <!-- 계좌 정보 -->
            <div class="w-footer-col">
                <h3>BANK INFO</h3>
                <div class="footer-desc">
                    KB국민은행 850101-00-117728<br>
                    예금주: 주식회사 씨엘로
                </div>
            </div>

            <!-- 상점 정보 -->
            <div class="w-footer-col">
                <h3>SHOP INFO</h3>
                <ul class="footer-links">
                    <li><a href="policy.html">이용약관</a></li>
                </ul>
            </div>

            <!-- 주소 -->
            <div class="w-footer-col">
                <h3>ADDRESS</h3>
                <div class="footer-desc">
                    주소:<br>
                    인천 연수구 송도과학로 80 101동 2205호
                </div>
            </div>
        </div>

        <!-- 저작권 바 -->
        <div class="w-footer-bottom">
            <div class="w-footer-container">
                COMPANY: 주식회사 씨엘로(Cielo Co., Ltd) &nbsp;&nbsp; CEO 대표자: 이슬아 &nbsp;&nbsp; COMPANY LICENSE: 625-81-03523<br>
                E-MAIL: winipic80@naver.com &nbsp;&nbsp; ADDRESS: 인천 연수구 송도과학로 80 101동 2205호<br>
                <span>Copyright (c) 2023 Winipic all rights reserved.</span>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// DOM 준비 완료 시 렌더링
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter);
} else {
    renderFooter();
}
