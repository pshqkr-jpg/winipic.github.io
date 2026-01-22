/**
 * WINIPIC 2.0 Global Footer Script
 */

function renderFooter() {
    // 중복 렌더링 방지
    if (document.querySelector('.w-footer')) return;

    const footerHTML = `
    <footer class="w-footer">
        <div class="w-footer-content" style="display: flex; justify-content: space-between; padding-bottom: 60px;">
                <!-- 고객센터 -->
                <div style="flex: 1.2;">
                    <h3 style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 20px; opacity: 0.8;">CUSTOMER CENTER</h3>
                    <div style="font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 12px;">TEL: 010-5507-0520</div>
                    <div style="font-size: 13px; color: #888; line-height: 1.6;">
                        월 ~ 금 9:00 ~ 18:00<br>
                            점심시간 12:30 ~ 13:30<br>
                                주말,공휴일은 휴무입니다.
                            </div>
                    </div>

                    <!-- 계좌 정보 -->
                    <div style="flex: 1;">
                        <h3 style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 20px; opacity: 0.8;">BANK INFO</h3>
                        <div style="font-size: 13px; color: #888; line-height: 1.8;">
                            KB국민은행 850101-00-117728<br>
                                예금주: 주식회사 씨엘로
                        </div>
                    </div>

                    <!-- 상점 정보 -->
                    <div style="flex: 0.5;">
                        <h3 style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 20px; opacity: 0.8;">SHOP INFO</h3>
                        <ul style="font-size: 13px; color: #888; line-height: 2;">
                            <li><a href="policy.html">이용약관</a></li>
                        </ul>
                    </div>

                    <!-- 주소 -->
                    <div style="flex: 1;">
                        <h3 style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 20px; opacity: 0.8;">ADDRESS</h3>
                        <div style="font-size: 13px; color: #888; line-height: 1.6;">
                            주소:<br>
                                인천 연수구 송도과학로 80 101동 2205호
                        </div>
                    </div>
                </div>

                <!-- 저작권 바 -->
                <div style="border-top: 1px solid #222; padding: 24px 0; text-align: center; font-size: 12px; color: #555; line-height: 1.6;">
                    <div style="max-width: 1440px; margin: 0 auto;">
                        COMPANY: 주식회사 씨엘로(Cielo Co., Ltd) &nbsp;&nbsp; CEO 대표자: 이슬아 &nbsp;&nbsp; COMPANY LICENSE: 625-81-03523<br>
                            E-MAIL: winipic80@naver.com &nbsp;&nbsp; ADDRESS: 인천 연수구 송도과학로 80 101동 2205호<br>
                                <span style="display:block; margin-top:10px;">Copyright (c) 2023 Winipic all rights reserved.</span>
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
