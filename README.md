# BeerDang

캔 수(4·6·8), 캔당 용량(355·485·500ml), 묶음 가격을 입력하면 10ml당 가격을 즉시 계산하는 모바일 우선 웹입니다. 계산은 브라우저에서 처리하므로 현재 버전에서는 서버나 PostgreSQL이 필요하지 않습니다.

```bash
cd frontend
npm ci
npm run dev
```

브라우저에서 `http://localhost:5173`을 여세요.

```bash
cd frontend
npm run test
npm run build
```

`dist/`에 만들어지는 정적 파일을 웹 서버나 정적 호스팅에 배포할 수 있습니다. 로그인·기록 저장·가격 비교는 이후 버전에서 구현합니다.
