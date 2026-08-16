# myeongeon-injul

검은 배경 위에 명언 한 구절이 조용히 떠오르는 사이트.

새로고침할 때마다 랜덤으로 명언이 나오고, 등록된 모든 명언을 다 보기 전까지는 같은 문구가 중복으로 나오지 않습니다.

## 미리보기

![명언](https://myeongeon-injul.vercel.app/api/quote-card)

## 기능

- 검은 배경, 화면 중앙에 명언 표시
- 명언은 여러 줄로 등록 가능, 한 줄씩 순차적으로 떠오르는 애니메이션(줄당 1초 딜레이)
- `localStorage` 기반 중복 방지: 모든 명언을 한 번씩 보기 전까지 재등장 안 함
- 우측 하단 GitHub 링크
- 외부에서 사용할 수 있는 API 제공

## 명언 추가하기

`static/quotes.json`에 아래 형식으로 추가합니다.

```json
[
	{
		"id": 1,
		"date": "2026-08-16",
		"contents": ["꽃도 계절을 쉬고", "나무도 잎을 내려놓기도 하는데", "사람이라고 늘 피어 있어야 할 이유는 없다."]
	}
]
```

- `id`: 중복 방지 로직에서 사용하는 고유 번호
- `date`: 등록일
- `contents`: 줄 단위로 나눈 문구 배열

## API

### `GET /api/quote`

랜덤 명언 하나를 JSON으로 반환합니다. CORS 허용(`Access-Control-Allow-Origin: *`)이라 다른 도메인에서도 바로 호출 가능합니다.

```bash
curl https://myeongeon-injul.vercel.app/api/quote
```

```json
{
	"id": 1,
	"date": "2026-08-16",
	"contents": ["꽃도 계절을 쉬고", "나무도 잎을 내려놓기도 하는데", "사람이라고 늘 피어 있어야 할 이유는 없다."]
}
```

### `GET /api/quote-card`

랜덤 명언을 SVG 이미지로 반환합니다. README나 마크다운 문서에 `<img>` / `![]()`로 바로 삽입할 수 있습니다.

```markdown
![명언](https://myeongeon-injul.vercel.app/api/quote-card)
```

> GitHub는 README 이미지를 camo 프록시로 캐싱하므로, 매 조회마다 즉시 갱신되지는 않을 수 있습니다.

## 개발

```sh
npm install
npm run dev -- --open
```

## 빌드

```sh
npm run build
npm run preview
```

## 배포

Vercel에 배포되어 있습니다 (`@sveltejs/adapter-auto` 사용).

## 기술 스택

- [SvelteKit](https://svelte.dev/docs/kit)
- TypeScript
- 폰트: [국민대학교 성곡체](https://noonnu.cc/font_page/667)
