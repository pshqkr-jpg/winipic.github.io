# Winipic 2.0 Design System - Page Mapping Guide
(위니픽 2.0 디자인 시스템 - 페이지 적용 가이드)

본 폴더(`winipic_2.0_design`)에 포함된 HTML 파일들은 기존 사이트의 특정 URL을 대체하기 위해 설계되었습니다.
개발자께서는 아래 매핑 테이블을 참고하여 각 ASPX 페이지의 디자인(MasterPage 및 Content)을 수정해 주십시오.

## 1. Core Pages (핵심 페이지)

| 구분 | 기존 URL (Current ASPX) | 신규 디자인 파일 (HTML) | 주요 변경 사항 |
| :--- | :--- | :--- | :--- |
| **메인** | `/Main/Home.aspx` | **`index.html`** | 배너 제거, **업무 도구(Quick Tools)** 중심 대시보드화 |
| **상품등록** | `/Member/VvicUrl.aspx` | **`request_tool.html`** | 테이블 입력폼 제거 → **카드형 입력 UI** 및 리스트 적용 |
| **엑셀주문** | `/Record/Excel.aspx` | **`excel_order.html`** | 파일 업로드 영역 강조 (Drag & Drop UI) |

## 2. Commerce Pages (쇼핑 관련)

| 구분 | 기존 URL (Current ASPX) | 신규 디자인 파일 (HTML) | 주요 변경 사항 |
| :--- | :--- | :--- | :--- |
| **상품목록** | `/Goods/New.aspx`<br>`/Goods/Category.aspx` | **`product_list.html`** | 4단 그리드 레이아웃, 상단 필터바 적용 |
| **상세페이지** | `/Goods/Detail.aspx` | **`product_detail.html`** | **Sticky Layout** (스크롤 시 정보창 고정), 갤러리 확대 |
| **장바구니** | `/Record/Cart.aspx` | **`cart.html`** | 테이블 여백 확보, **우측 요약(Summary) 카드** 도입 |

## 3. Utility Pages (회원/기타)

| 구분 | 기존 URL (Current ASPX) | 신규 디자인 파일 (HTML) | 주요 변경 사항 |
| :--- | :--- | :--- | :--- |
| **회원정보** | `/Member/User.aspx` | **`user_profile.html`** | 사이드바 메뉴 적용, 정보 입력 폼 모던화 |
| **로그인** | `/Member/Login.aspx` | **`login.html`** | 불필요한 요소 제거, 중앙 집중형 카드 디자인 |

---

## 4. Implementation Tips (적용 팁)

1.  **Global CSS**: 모든 페이지는 `global.css`를 참조해야 합니다. `Site.Master` 헤더에 `<link rel="stylesheet" href="/css/global.css">`를 추가해 주세요.
2.  **Header Structrue**: `index.html`에 있는 `<header class="w-header">` 코드를 `Site.Master`에 그대로 이식하면 사이트 전체 헤더가 변경됩니다.
3.  **ASP.NET Controls**: 기존의 `<asp:TextBox>`나 `<asp:Button>`에 `class="l-input"` 또는 `class="btn-cta"` 같은 클래스만 추가하면, 로직 변경 없이 디자인이 적용됩니다.
