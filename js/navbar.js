/**
 * WINIPIC 네비게이션 바 및 모달 스크립트
 * - 동적 메뉴 렌더링 (드롭다운 포함)
 * - 적립금 모달 기능
 */

const navConfig = {
    topMenu: [
        {
            label: '여성의류',
            id: 'women',
            href: 'product_list.html?cat=women&sub=아우터',
            mode: 'horizontal',
            children: [
                '아우터', '상의', '니트', '세트',
                '스커트&원피스', '팬츠', '홈웨어',
                '가방', '신발', '기타악세사리'
            ]
        },
        {
            label: '남성의류',
            id: 'men',
            href: 'product_list.html?cat=men&sub=아우터',
            mode: 'horizontal',
            children: [
                '아우터', '상의', '니트', '세트',
                '팬츠', '가방', '신발'
            ]
        },
        { label: 'My Products', id: 'my', href: 'product_list.html?cat=my&sub=전체' }
    ]
};

// 모달 HTML 템플릿
// 모달 HTML 템플릿들
const pointsModalHTML = `
<div id="pointsModal" class="w-modal-backdrop">
    <div class="w-modal">
        <div class="w-modal-header">
            <div style="display:flex; align-items:center; gap: 12px;">
                <div class="w-modal-title">적립금 사용명세표</div>
                <button onclick="toggleChargeModal(true)" style="background:#111; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-size:14px; font-weight:700; cursor:pointer;">
                    + 적립금 충전
                </button>
            </div>
            <div class="w-modal-close" onclick="togglePointsModal(false)">
                <i class="ph ph-x" style="font-size: 20px;"></i>
            </div>
        </div>
        <div class="w-modal-body">
            <!-- 필터 영역 -->
            <div class="points-filter">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:13px; font-weight:600;">시작일자:</span>
                    <input type="date" class="date-input" value="2025-10-19">
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:13px; font-weight:600;">종료일자:</span>
                    <input type="date" class="date-input" value="2026-01-19">
                </div>
                <button class="btn-search">
                    <i class="ph ph-magnifying-glass"></i>
                </button>
            </div>

            <!-- 데이터 테이블 -->
            <div style="max-height: 400px; overflow-y: auto;">
                <table class="points-table">
                    <thead>
                        <tr>
                            <th>적립일자</th>
                            <th style="text-align:right;">추가적립금</th>
                            <th style="text-align:right;">사용적립금</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="points-row row-highlight">
                            <td style="font-weight:700;">사입진행중</td>
                            <td style="text-align:right;">0</td>
                            <td style="text-align:right;" class="text-use">-1,976,920</td>
                        </tr>
                        <tr class="points-row">
                            <td>2025-10-20</td>
                            <td style="text-align:right;">0</td>
                            <td style="text-align:right;" class="text-use">-2,671,350</td>
                        </tr>
                        <tr class="points-row">
                            <td>2025-10-20</td>
                            <td style="text-align:right;" class="text-earn">+4,000,000</td>
                            <td style="text-align:right;">0</td>
                        </tr>
                        <tr class="points-row">
                            <td>2025-10-20</td>
                            <td style="text-align:right;">0</td>
                            <td style="text-align:right;" class="text-use">-2,337,280</td>
                        </tr>
                        <tr class="points-row">
                            <td>2025-10-21</td>
                            <td style="text-align:right;">0</td>
                            <td style="text-align:right;" class="text-use">-914,760</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
`;

const chargeModalHTML = `
<div id="chargeModal" class="w-modal-backdrop" style="z-index: 10001;">
    <div class="w-modal" style="width: 520px;">
        <div class="w-modal-header">
            <div class="w-modal-title">충전 요청</div>
            <button class="w-modal-close" onclick="toggleChargeModal(false)">
                <i class="ph ph-x" style="font-size: 20px;"></i>
            </button>
        </div>
        <div class="w-modal-body" style="padding: 24px;">
            <div style="margin-bottom: 20px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#444;">입금계좌</label>
                <select style="width:100%; height:40px; padding:0 12px; border:1px solid #ddd; border-radius:6px; font-size:14px; outline:none;">
                    <option>KB국민은행 850101-00-117728 주식회사 씨엘로</option>
                </select>
            </div>
            
            <div style="display:flex; gap:12px; margin-bottom:20px;">
                <div style="flex:1;">
                    <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#444;">송금은행</label>
                    <input type="text" style="width:100%; height:40px; padding:0 12px; border:1px solid #ddd; border-radius:6px; font-size:14px; outline:none;" placeholder="은행명 입력">
                </div>
                <div style="flex:1;">
                    <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#444;">보내는분</label>
                    <input type="text" style="width:100%; height:40px; padding:0 12px; border:1px solid #ddd; border-radius:6px; font-size:14px; outline:none;" value="위니픽">
                </div>
            </div>

            <div style="margin-bottom:20px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#444;">충전금액</label>
                <div style="position:relative; display:flex; align-items:center;">
                    <input id="chargeAmountInput" type="text" style="width:100%; height:40px; padding:0 40px 0 12px; border:1px solid #ddd; border-radius:6px; font-size:14px; outline:none; text-align:right;" placeholder="0">
                    <span style="position:absolute; right:12px; font-size:14px; color:#666; pointer-events:none;">원</span>
                </div>
            </div>

            <div style="margin-bottom:24px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#444;">비고</label>
                <input type="text" style="width:100%; height:40px; padding:0 12px; border:1px solid #ddd; border-radius:6px; font-size:14px; outline:none;" placeholder="">
            </div>

            <div style="background:#fffbeb; border:1px solid #fcd34d; border-radius:8px; padding:16px;">
                <div style="font-size:13px; line-height:1.5; color:#b45309; margin-bottom:6px; display:flex; gap:6px;">
                    <span style="font-weight:700;">1.</span>
                    <span>충전 신청 시 입력한 <strong style="color:#2563eb;">보내는 분 성함과 금액이 실제 입금 정보와 일치</strong>해야 자동 승인됩니다.</span>
                </div>
                <div style="font-size:13px; line-height:1.5; color:#b45309; margin-bottom:6px; display:flex; gap:6px;">
                    <span style="font-weight:700;">2.</span>
                    <span>입금은 충전 신청 후 <strong style="color:#2563eb;">1시간 이내</strong>에 진행해주셔야 하며, 이후 입금 건은 자동 처리되지 않으니 재신청 후 입금바랍니다.</span>
                </div>
                <div style="font-size:13px; line-height:1.5; color:#b45309; display:flex; gap:6px;">
                    <span style="font-weight:700;">3.</span>
                    <span>입금 후 <strong style="color:#2563eb;">5분 이내</strong> 자동 충전되며 완료되지 않을 경우 카카오톡으로 문의해주세요.</span>
                </div>
            </div>
        </div>
        <div style="padding:16px 24px; background:#f9fafb; border-top:1px solid #eee; display:flex; justify-content:center; gap:8px; border-bottom-left-radius:12px; border-bottom-right-radius:12px;">
            <button style="padding:0 20px; height:40px; border-radius:6px; font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; background:#111; color:#fff; border:none;">
                <i class="ph-bold ph-floppy-disk"></i> 저장
            </button>
            <button onclick="toggleChargeModal(false)" style="padding:0 20px; height:40px; border-radius:6px; font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; background:#fff; border:1px solid #ddd; color:#333;">
                <i class="ph-bold ph-x"></i> 취소
            </button>
        </div>
    </div>
</div>
`;

const lackBalanceModalHTML = `
<div id="lackBalanceModal" class="w-modal-backdrop" style="z-index: 10002;">
    <div class="w-modal" style="width: 320px; text-align: center; overflow:hidden;">
        <div style="padding: 16px; background: #f8f9fa; border-bottom: 1px solid #eee; font-weight: 700; color: #333;">
            위니픽
        </div>
        <div style="padding: 30px 20px;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #111;">
                잔액이 부족합니다.
            </div>

            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px;">
                <div style="width: 40px; height: 40px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <i class="ph-fill ph-warning" style="font-size: 24px; color: #ef4444;"></i>
                </div>
                <div style="text-align: left; font-size: 14px; line-height: 1.6;">
                    <div style="color: #555;">신규주문: <span style="font-weight: 700; color: #2563eb;">41,580 원</span></div>
                    <div style="color: #555;">배송중: <span style="font-weight: 700; color: #2563eb;">0 원</span></div>
                </div>
            </div>

            <div style="background: #fdfdfd; border: 1px solid #eee; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                    <span style="color: #666;">현재잔액:</span>
                    <span style="font-weight: 700; color: #ef4444;">31,000 원</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px;">
                    <span style="color: #666;">부족잔액:</span>
                    <span style="font-weight: 700; color: #ef4444;">-10,580 원</span>
                </div>
            </div>

            <button onclick="toggleChargeModal(true, 10580); toggleLackBalanceModal(false);" 
                style="width: 100%; height: 44px; background: #ef4444; color: #fff; border: none; border-radius: 6px; font-weight: 700; font-size: 14px; cursor: pointer; margin-bottom: 8px;">
                부족금액 충전하기
            </button>
            <button onclick="toggleLackBalanceModal(false)" 
                style="width: 100%; height: 44px; background: #fff; border: 1px solid #ddd; color: #333; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer;">
                확인
            </button>
        </div>
    </div>
</div>
`;

function renderNavbar() {
    const header = document.querySelector('.w-header');
    if (!header) return;

    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // 네비게이션 아이템 생성
    const navItemsHTML = navConfig.topMenu.map(item => {
        let dropdownHTML = '';
        if (item.children) {
            const dropdownClass = item.mode === 'horizontal' ? 'w-dropdown horizontal' : 'w-dropdown';
            dropdownHTML = `
                <div class="${dropdownClass}">
                    ${item.children.map(child => `<a href="product_list.html?cat=${item.id}&sub=${child}" class="w-dropdown-item">${child}</a>`).join('')}
                </div>
            `;
        }

        return `
            <div class="w-nav-item" onclick="location.href='${item.href}'">
                ${item.label}
                ${dropdownHTML}
            </div>
        `;
    }).join('');

    // 우측 도구 영역 생성 (로그인 상태에 따라 분기)
    let toolsHTML = '';
    if (isLoggedIn) {
        toolsHTML = `
            <div class="w-tools">
                <!-- 적립금 배지 -->
                <div class="w-points-badge" onclick="togglePointsModal(true)">
                    <i class="ph-fill ph-coins" style="font-size: 16px;"></i>
                    <span class="desktop-text">적립금 : 32,500원</span>
                    <span class="mobile-text">32,500</span>
                </div>

                <!-- 검색 -->
                <div class="w-search-container">
                    <input type="text" class="w-search-input" placeholder="검색..." onkeypress="if(event.key==='Enter') location.href='search_result.html?q='+this.value">
                    <button class="btn-icon w-search-btn" onclick="const p=this.parentElement.querySelector('input'); if(p.value) location.href='search_result.html?q='+p.value; else p.focus();">
                        <i class="ph ph-magnifying-glass" style="font-size: 20px;"></i>
                    </button>
                    <button class="btn-icon w-search-close-btn" style="display:none;" onclick="document.querySelector('.w-search-input').value=''; document.activeElement.blur();">
                        <i class="ph ph-x" style="font-size: 20px;"></i>
                    </button>
                </div>

                <!-- 관심 상품 (모바일 숨김) -->
                <button class="btn-icon mobile-hide" onclick="location.href='wishlist.html'">
                    <i class="ph ph-heart" style="font-size: 20px;"></i>
                </button>

                <!-- 장바구니 -->
                <button class="btn-icon" onclick="location.href='cart.html'" style="margin-right: 8px;">
                    <i class="ph ph-shopping-cart" style="font-size: 20px;"></i>
                </button>

                <div class="divider desktop-only" style="width: 1px; height: 24px; background: #eee; margin: 0 8px;"></div>
                
                <!-- 마이페이지 (주문내역) - 모바일에서는 아이콘만 -->
                <div class="w-tool-item mobile-hide">
                    <button class="btn-icon nav-order-btn" onclick="location.href='order_history.html'">
                        <i class="ph ph-user" style="font-size: 20px;"></i>
                        <span class="desktop-text">주문내역</span>
                    </button>
                    <div class="w-dropdown right-aligned">
                        <a href="order_history.html" class="w-dropdown-item">주문내역</a>
                        <a href="delivery_tracking.html" class="w-dropdown-item">배송조회</a>
                        <a href="mannequin_check.html" class="w-dropdown-item">마네킹샷 확인</a>
                        <a href="order_cancel_request.html" class="w-dropdown-item">취소요청</a>
                        <a href="request_tool.html" class="w-dropdown-item">상품요청</a>
                        <a href="cart.html" class="w-dropdown-item">장바구니</a>
                        <a href="excel_order.html" class="w-dropdown-item">엑셀주문</a>
                        <a href="wishlist.html" class="w-dropdown-item">관심상품</a>
                        <a href="notice.html" class="w-dropdown-item">고객센터</a>
                        <a href="user_profile.html" class="w-dropdown-item">회원정보수정</a>
                        <div style="border-top:1px solid #eee; margin:4px 0;"></div>
                        <a href="index.html" class="w-dropdown-item" style="color:#e11d48;" onclick="localStorage.removeItem('isLoggedIn');">로그아웃</a>
                    </div>
                </div>

                <!-- 카카오 상담톡 버튼 (모바일 아이콘만) -->
                <button class="btn-kakao mobile-hide" onclick="openKakaoChat()">
                    <i class="ph-fill ph-chat-circle-dots" style="font-size: 20px;"></i>
                    <span class="desktop-text">카톡 상담</span>
                </button>
            </div>
        `;
    } else {
        toolsHTML = `
            <div class="w-tools">
                <a href="login.html" class="w-nav-item" style="font-size:14px; font-weight:700; margin-right: 0;">로그인</a>
                <div class="mobile-hide" style="width: 1px; height: 16px; background: #ddd; margin: 0 16px;"></div>
                <a href="signup.html" class="w-nav-item mobile-hide" style="font-size:14px; font-weight:700;">회원가입</a>

                <!-- 카카오 상담톡 버튼 (모바일 아이콘만) -->
                <button class="btn-kakao mobile-hide" onclick="openKakaoChat()">
                    <i class="ph-fill ph-chat-circle-dots" style="font-size: 20px;"></i>
                    <span class="desktop-text">카톡 상담</span>
                </button>
            </div>
        `;
    }

    header.innerHTML = `
        <div class="w-header-container">
            <!-- 좌측 그룹: 로고 + 네비게이션 -->
            <div style="display:flex; align-items:center; gap: 40px;">
                <!-- 로고 -->
                <a href="index.html" class="w-logo">
                    <svg width="220" height="55" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="10" y="45" font-family="'Inter', sans-serif" font-weight="900" font-style="italic" font-size="36" letter-spacing="-2" fill="#111">WINIPIC</text>
                        <circle cx="124" cy="14" r="4" fill="#2563eb" />
                    </svg>
                </a>

                <!-- 네비게이션 -->
                <nav class="w-nav">
                    ${navItemsHTML}
                </nav>
            </div>

            <!-- 우측 도구 -->
            <div style="display:flex; align-items:center;">
                ${toolsHTML}

                <!-- Mobile Menu Button (Hamburger) - Visible only on mobile via CSS -->
                <button class="mobile-menu-btn" onclick="toggleMobileMenu(true)">
                    <i class="ph ph-list" style="font-size: 28px; color: #111;"></i>
                </button>
            </div>
        </div>
    `;

    // Mobile Menu Drawer HTML
    const mobileMenuHTML = `
        <div id="mobileMenu" class="mobile-menu-backdrop" style="display:none; position:fixed; inset:0; z-index:2000; background:rgba(0,0,0,0.5);">
            <div class="mobile-drawer" style="position:absolute; top:0; right:0; width:85%; max-width:320px; height:100%; background:#fff; display:flex; flex-direction:column; overflow:hidden;">
                
                <!-- Drawer Header -->
                <div style="padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 800; font-size: 18px;">MENU</span>
                    <button onclick="toggleMobileMenu(false)" style="background:none; border:none; padding:4px; cursor:pointer;">
                        <i class="ph ph-x" style="font-size: 24px;"></i>
                    </button>
                </div>

                <!-- Drawer Content -->
                <div class="mobile-nav-list" style="flex: 1; overflow-y: auto; padding: 20px;">
                    
                    ${isLoggedIn ? `
                    <!-- 1. Point Badge (Mobile Only) -->
                    <div onclick="togglePointsModal(true); toggleMobileMenu(false);" 
                        style="background: #f4f4f5; padding: 12px 16px; border-radius: 12px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
                        <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px;">
                            <i class="ph-fill ph-coins" style="color: #ea580c;"></i>
                            <span>보유 적립금</span>
                        </div>
                        <span style="font-weight: 700; color: #111;">32,500원</span>
                    </div>
                    ` : ''}

                    <!-- 2. Main Categories (Women, Men, My Products) -->
                    <div style="margin-bottom: 30px;">
                        <div style="font-size: 13px; font-weight: 700; color: #888; margin-bottom: 12px; letter-spacing: 0.5px;">SHOPPING</div>
                        ${navConfig.topMenu.map(item => `
                            <div style="margin-bottom: 12px;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-weight: 700; font-size: 16px; padding: 8px 0; display:block; flex:1;" onclick="location.href='${item.href}'">${item.label}</span>
                                    ${item.children ? `
                                    <button onclick="toggleSubmenu(this)" style="background:none; border:none; padding:8px 4px; cursor:pointer; display:flex; align-items:center;">
                                        <i class="ph ph-caret-down" style="font-size: 20px; color: #888;"></i>
                                    </button>
                                    ` : ''}
                                </div>
                                ${item.children ? `
                                    <div class="mobile-submenu" style="display: none; grid-template-columns: repeat(2, 1fr); gap: 10px 12px; padding: 10px 0 16px 10px; border-top: 1px solid #f5f5f5;">
                                        ${item.children.map(child => `
                                            <a href="product_list.html?cat=${item.id}&sub=${child}" style="font-size: 14px; color: #555; padding: 4px 0; display:flex; align-items:center; gap:6px;">
                                                <span style="width:4px; height:4px; border-radius:50%; background:#ddd;"></span> ${child}
                                            </a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>

                    <div style="height: 1px; background: #eee; margin: 0 -20px 30px -20px;"></div>

                    <!-- 3. My Page Links -->
                    ${isLoggedIn ? `
                    <div style="margin-bottom: 30px;">
                        <div style="font-size: 13px; font-weight: 700; color: #888; margin-bottom: 12px; letter-spacing: 0.5px;">MY PAGE</div>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <a href="order_history.html" style="font-size: 15px; color: #333; font-weight: 500;">주문내역</a>
                            <a href="delivery_tracking.html" style="font-size: 15px; color: #333; font-weight: 500;">배송조회</a>
                            <a href="mannequin_check.html" style="font-size: 15px; color: #333; font-weight: 500;">마네킹샷 확인</a>
                            <a href="request_tool.html" style="font-size: 15px; color: #333; font-weight: 500;">상품요청</a>
                            <a href="cart.html" style="font-size: 15px; color: #333; font-weight: 500;">장바구니</a>
                            <a href="wishlist.html" style="font-size: 15px; color: #333; font-weight: 500;">관심상품</a>
                            <a href="excel_order.html" style="font-size: 15px; color: #333; font-weight: 500;">엑셀주문</a>
                            <a href="user_profile.html" style="font-size: 15px; color: #333; font-weight: 500;">회원정보수정</a>
                        </div>
                    </div>
                    ` : ''}

                </div>

                <!-- Footer / Login Actions -->
                <div style="padding: 20px; border-top: 1px solid #eee; background: #f9f9f9; padding-right: 30px;">
                    ${isLoggedIn ? `
                        <button onclick="localStorage.removeItem('isLoggedIn'); location.href='index.html';" 
                            style="width: 100%; height: 44px; border: 1px solid #ddd; background: #fff; border-radius: 8px; font-weight: 600; color: #e11d48; cursor: pointer;">
                            로그아웃
                        </button>
                    ` : `
                        <div style="display: flex; gap: 10px;">
                            <a href="login.html" style="flex: 1; height: 44px; display: flex; align-items: center; justify-content: center; background: #111; color: #fff; border-radius: 8px; font-weight: 600; text-decoration: none;">로그인</a>
                            <a href="signup.html" style="flex: 1; height: 44px; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #ddd; color: #111; border-radius: 8px; font-weight: 600; text-decoration: none;">회원가입</a>
                        </div>
                    `}
    </div>

            </div >
        </div >
    `;

    // 모바일 메뉴 body에 추가 (레이어 문제 해결)
    if (!document.getElementById('mobileMenu')) {
        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
    }

    // 퀵 메뉴 HTML (항상 렌더링)
    const quickMenuHTML = `
    <div class="w-quick-menu">
            <div class="w-quick-item" onclick="location.href='order_history.html'">
                <i class="ph ph-receipt w-quick-icon"></i>
                <span class="w-quick-label">주문내역</span>
            </div>
            <div class="w-quick-item" onclick="location.href='delivery_tracking.html'">
                <i class="ph ph-truck w-quick-icon"></i>
                <span class="w-quick-label">배송조회</span>
            </div>
            <div class="w-quick-item" onclick="location.href='mannequin_check.html'">
                <i class="ph ph-t-shirt w-quick-icon"></i>
                <span class="w-quick-label">마네킹샷<br>확인</span>
            </div>
            <div class="w-quick-item" onclick="location.href='product_list.html?cat=my&sub=전체'">
                <i class="ph ph-briefcase w-quick-icon"></i>
                <span class="w-quick-label">My Products</span>
            </div>
        </div>
    `;

    // 모달들 HTML을 body 끝에 추가 (중복 방지)
    if (!document.getElementById('pointsModal')) {
        document.body.insertAdjacentHTML('beforeend', pointsModalHTML);
    }
    if (!document.getElementById('chargeModal')) {
        document.body.insertAdjacentHTML('beforeend', chargeModalHTML);
    }
    if (!document.getElementById('lackBalanceModal')) {
        document.body.insertAdjacentHTML('beforeend', lackBalanceModalHTML);
    }

    // 퀵 메뉴 추가 (중복 방지)
    if (!document.querySelector('.w-quick-menu')) {
        document.body.insertAdjacentHTML('beforeend', quickMenuHTML);
    }

    // 로그인 상태일 때만 서브네비게이션 렌더링
    if (isLoggedIn) {
        /* -----------------------------------------------------------
        마이페이지 서브 네비게이션 (스티키) 
        ----------------------------------------------------------- */
        const currentPath = window.location.pathname;
        const myPageRoutes = [
            'order_history.html',
            'delivery_tracking.html',
            'mannequin_check.html',
            'mannequin_result.html',
            'order_cancel_request.html',
            'request_tool.html',
            'cart.html',
            'user_profile.html',
            'excel_order'
        ];

        // 현재 페이지가 마이페이지 관련 경로인지 확인 (파일명 포함 여부)
        const isMyPage = myPageRoutes.some(route => currentPath.includes(route));

        if (isMyPage) {
            // 서브 메뉴 아이템 정의
            const subMenuItems = [
                { label: '주문내역', href: 'order_history.html' },
                { label: '배송조회', href: 'delivery_tracking.html' },
                { label: '마네킹샷 확인', href: 'mannequin_check.html' },
                { label: '취소요청', href: 'order_cancel_request.html' },
                { label: '상품요청', href: 'request_tool.html' },
                { label: '장바구니', href: 'cart.html' },
                { label: '엑셀주문', href: 'excel_order.html' },
                { label: '고객센터', href: 'notice.html' },
                { label: '회원정보수정', href: 'user_profile.html' }
            ];

            const subMenuHTML = `
    <div class="w-subheader mobile-hide">
        <div class="w-subheader-container">
            ${subMenuItems.map(item => {
                const isActive = currentPath.includes(item.href) ||
                    (item.href === 'mannequin_check.html' && currentPath.includes('mannequin_result.html')); // 예외 처리 (결과 페이지도 활성화)
                return `<a href="${item.href}" class="w-sub-link ${isActive ? 'active' : ''}">${item.label}</a>`;
            }).join('')}
        </div>
                </div>
    `;

            header.insertAdjacentHTML('afterend', subMenuHTML);
        }
    }
}

// 모달 토글 함수 (전역)
window.togglePointsModal = function (show) {
    const modal = document.getElementById('pointsModal');
    if (modal) {
        if (show) modal.classList.add('active');
        else modal.classList.remove('active');
    }
}

window.toggleChargeModal = function (show, amount) {
    const modal = document.getElementById('chargeModal');
    if (modal) {
        if (show) {
            modal.classList.add('active');
            // 금액 파라미터가 있으면 입력 필드에 설정
            if (amount) {
                const input = document.getElementById('chargeAmountInput');
                if (input) input.value = amount.toLocaleString();
            }
        }
        else modal.classList.remove('active');
    }
}

window.toggleLackBalanceModal = function (show) {
    const modal = document.getElementById('lackBalanceModal');
    if (modal) {
        if (show) modal.classList.add('active');
        else modal.classList.remove('active');
    }
}

window.toggleMobileMenu = function (show) {
    const menu = document.getElementById('mobileMenu');
    const drawer = menu.querySelector('.mobile-drawer');

    if (show) {
        menu.style.display = 'block';
        // Allow slight delay for transition
        setTimeout(() => drawer.style.transform = 'translateX(0)', 10);
        document.body.style.overflow = 'hidden';
    } else {
        drawer.style.transform = 'translateX(100%)';
        setTimeout(() => menu.style.display = 'none', 300);
        document.body.style.overflow = '';
    }
}

// Mobile Submenu Toggle
window.toggleSubmenu = function (btn) {
    const submenu = btn.parentElement.nextElementSibling;
    const icon = btn.querySelector('i');

    if (submenu) {
        if (submenu.style.display === 'none') {
            submenu.style.display = 'grid';
            icon.classList.replace('ph-caret-down', 'ph-caret-up');
            // Optional: Close other submenus
            // document.querySelectorAll('.mobile-submenu').forEach(el => {
            //    if (el !== submenu) el.style.display = 'none';
            // });
        } else {
            submenu.style.display = 'none';
            icon.classList.replace('ph-caret-up', 'ph-caret-down');
        }
    }
}

// Kakao SDK 로드 (헤더에 없으면 추가)
if (!document.getElementById('kakao-sdk')) {
    const script = document.createElement('script');
    script.id = 'kakao-sdk';
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    // script.integrity 제거 (버전 불일치 등으로 인한 로드 실패 방지)
    script.crossOrigin = 'anonymous';
    script.onload = () => {
        // SDK 로드 후 초기화
        if (window.Kakao && !Kakao.isInitialized()) {
            Kakao.init('033b2d21a96729aa225a60f1043b24f2');
        }
    };
    script.onerror = () => {
        console.error('Kakao SDK 로드 실패');
    };
    document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', renderNavbar);

// 카카오톡 상담하기 (채널 채팅)
window.openKakaoChat = function () {
    if (!window.Kakao) {
        alert('카카오 연결 도구를 불러오는 중입니다. 잠시 후 다시 시도해주세요.\n(계속 안 될 경우 새로고침을 해주세요.)');
        return;
    }

    if (!Kakao.isInitialized()) {
        Kakao.init('033b2d21a96729aa225a60f1043b24f2'); // 혹시 초기화 안됐으면 재시도
    }

    Kakao.Channel.chat({
        channelPublicId: '_SNhAX' // 위니픽 채널 ID
    });
}
