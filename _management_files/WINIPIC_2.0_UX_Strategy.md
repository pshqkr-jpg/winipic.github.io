# Winipic 2.0 UX Strategy & Information Architecture
(위니픽 2.0 사용자 경험 전략 및 정보 구조 설계)

## 1. Core Problem: "B2B vs Shopping Identity Crisis"
기존 사이트는 '도매 관리자(Admin)'와 '쇼핑몰(Mall)'의 정체성이 섞여 있어 사용자가 혼란스러웠습니다.
*   **문제점**: "상품 요청(VVIC Request)" 같은 핵심 업무 기능이 깊은 메뉴(`Member > Request`)에 숨겨져 있음.
*   **해결책**: 업무 도구(Tools)를 **대시보드(Dashboard)** 형태로 전진 배치하여 B2B 사용자의 생산성을 극대화.

## 2. Structural Changes (구조 변경)

### A. The "Command Center" Header (헤더 재설계)
헤더는 단순한 링크 모음이 아니라, 사이트의 모든 기능을 통제하는 **사령탑**이어야 합니다.
*   **Global Navigation (GNB)**: 쇼핑 카테고리(신상품, 베스트)는 중앙에 배치하여 쇼핑 접근성 유지.
*   **Primary Action (CTA)**: "상품 등록 요청" 버튼을 우측 상단에 **가장 눈에 띄는 버튼(Electric Blue)**으로 배치.
    *   *이유*: 사용자가 이 사이트에 방문하는 가장 큰 목적 중 하나가 '신규 소싱'이기 때문입니다.

### B. Dashboard-First Homepage (홈 화면 개편)
기존의 정적인 배너 대신, 사용자가 바로 업무를 시작할 수 있는 **[Quick Tools Grid]**를 도입했습니다.
*   **VVIC 상품 가져오기**: 원클릭 접근.
*   **엑셀 대량 주문**: 복잡한 메뉴 이동 없이 홈에서 바로 진입.
*   **배송 현황 카드**: "내 물건 어디쯤 왔나?"를 메인에서 즉시 확인.

## 3. Visual Design System (디자인 언어)

### "Trust & Crisp" (신뢰와 선명함)
B2B 플랫폼은 감성보다는 '신뢰도'와 '정보의 명확성'이 최우선입니다.
*   **Color Palette**:
    *   **Solid Black (#111)**: 텍스트 및 로고에 사용하여 단단하고 전문적인 느낌 부여.
    *   **Electric Blue (#2563EB)**: 긍정적인 행동(업로드, 요청)을 유도하는 신뢰의 색상.
*   **Typography (Pretendard)**:
    *   숫자 가독성이 뛰어난 프리텐다드 폰트를 사용하여 가격/수량 정보 전달력 강화.
*   **Space & layout**:
    *   **1440px Grid**: 광활한 화면을 모두 활용하여 상품 리스트를 4열 이상 시원하게 배치.

## 4. Implementation Note for Developers
이 디자인은 `div` 기반의 **Flex/Grid** 레이아웃을 전제로 합니다.
기존 ASP.NET의 `MasterPage` 파일(`Site.Master` 등)을 수정하여, `index.html`의 `<header>`와 `<footer>` 구조를 이식해 주십시오.
그 다음 각 페이지의 콘텐츠 영역(`ContentPlaceHolder`)에 `request_tool.html` 등의 내부 구조를 적용하면 됩니다.
