# React Layout Concept

Boneless, Skinless, Lifeless 용어 자체에는 일관적인 규칙이 존재하지 않으므로 종류에 대해서만 인지하면 된다.

## Headful/Headed

- 기능과 구조와 스타일이 모두 있는 경우
- `HTML` + `JS` + `CSS`
- 이 "완전히 로드된"/배터리 포함 라이브러리에는 뼈, 피부, 생명에 대한 추상적인 개념들이 혼합되어 있습니다.
- 예시: antd, mui, shadcn/ui(커스터마이징이 용이한 Headful UI)

## Headless UI

- 기능과 구조가 있으나 스타일이 없는 경우. 스타일을 넣어줘야한다.
- `HTML` + `JS`
- 예시: [React Aria](https://react-spectrum.adobe.com/react-aria/), [Radix Primitives](https://www.radix-ui.com/primitives/), [MUI BaseUI](https://mui.com/base-ui/getting-started/), [Tailwind HeadlessUI](https://headlessui.com/)

## Boneless UI

- 스타일만 있는 경우. 기능과 구조를 넣어줘야한다.
- `CSS`
- 예시: [Boostrap](https://getbootstrap.com/), [Tailwind](https://tailwindcss.com/)

## Skinless UI

- 구조만 있는 경우. 기능과 스타일을 넣어줘야한다.
- `HTML`
- 예시: [React Aria](https://react-spectrum.adobe.com/react-aria/), [ArkUI](https://ark-ui.com/)

## Lifeless UI

- 기능만 있는 경우. 스타일과 구조를 넣어줘야한다.
- `JS`
- 예시: [TanStack](https://tanstack.com/), [Downshift](https://www.downshift-js.com/), [React Aria Hooks](https://react-spectrum.adobe.com/react-aria/hooks.html)
- custom component를 만들때는 이 구조를 사용한다.
