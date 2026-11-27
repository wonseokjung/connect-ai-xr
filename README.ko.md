<p align="center"><img src="docs/banner.jpg" width="100%" alt="XR, CONNECT AI LAB"></p>

<p align="center">
  <b>CONNECT AI LAB</b> · 모두를 위한 AI 교육<br>
  <a href="https://www.youtube.com/@CONNECT-AI-LAB">YouTube</a> · <a href="https://www.aicitybuilders.com/vibecoding">강의: 비주얼 바이브코딩</a> · <a href="README.md">English</a>
</p>

# connect-ai-xr

**에이전트한테 한 문장만 말하세요. 메타 퀘스트에서 바로 열리는 XR 앱이 나와요. 컴퓨터랑 폰에서도 3D로 열려요.**

```bash
npx github:wonseokjung/connect-ai-xr install-skill
```

Claude Code, Codex, Antigravity, Cursor 채팅창에 이 한 줄 붙여 넣고 설치해 달라고 하세요. 그다음에 이렇게 말해 보시면 돼요. "내 상품 쇼룸으로 쓸 건데, 퀘스트에서 열리는 XR 앱 하나 만들어 줘." Node.js 18 이상만 있으면 돼요. API 키도, 게임 엔진도 필요 없어요.

무료 교재(AI 야학당 XR, 프롬프트 7개): https://www.aicitybuilders.com/yahak/xr/

<p align="center"><img src="docs/demo.gif" width="100%" alt="브라우저에서 돌아가는 orrery, xr-room 앱"></p>

## 바로 써 보는 앱 다섯 개

전부 코드로 그렸어요. 아래는 헤드셋 없이 제 노트북에서 그냥 열어 본 화면이에요.

<table>
<tr>
<td width="50%" valign="top"><img src="docs/shots/orrery.jpg" width="100%" alt="Orrery"><br><b>orrery</b> · 행성 모형<br><sub>테이블 위에서 행성이 돌아요. 집으면 행성마다 다른 소리가 나요.</sub></td>
<td width="50%" valign="top"><img src="docs/shots/xr-room.jpg" width="100%" alt="XR Room"><br><b>xr-room</b> · 나무 방<br><sub>유리 패널을 누르면 낮, 노을, 밤으로 바뀌어요.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="docs/shots/product-showroom.jpg" width="100%" alt="Product Showroom"><br><b>product-showroom</b> · 상품 쇼룸<br><sub>사업하시는 분들은 이거부터요. 내 상품 .glb나 사진이 받침대 위에 올라가요.</sub></td>
<td width="50%" valign="top"><img src="docs/shots/ar-desk.jpg" width="100%" alt="AR Desk"><br><b>ar-desk</b> · 내 책상 AR<br><sub>퀘스트 3, 3S에서 진짜 내 책상 위에 모니터, 화분, 시계를 올려요.</sub></td>
</tr>
<tr>
<td width="50%" valign="top"><img src="docs/shots/gallery.jpg" width="100%" alt="Gallery"><br><b>gallery</b> · 갤러리<br><sub>내 사진 걸어 두고 걸어서 둘러봐요. 바닥을 집으면 거기로 순간이동해요.</sub></td>
<td width="50%" valign="top"><b>기기마다 알아서 맞춰 줘요</b><br><sub>퀘스트 3, 3S는 AR이랑 VR, 퀘스트 2는 VR, 컴퓨터랑 폰은 3D로 열려요.</sub></td>
</tr>
</table>

## 퀘스트에서 여는 법, 딱 3단계

1. 퀘스트랑 같은 와이파이에 있는 컴퓨터에서 이거 치세요.
   ```bash
   npx github:wonseokjung/connect-ai-xr demo
   ```
2. 퀘스트 브라우저에 `https://192.168...` 로 시작하는 주소를 그대로 치세요. s까지 꼭이요. 처음 한 번은 경고가 뜨는데, 고급 누르고 이동 누르시면 돼요. 내 컴퓨터라서 괜찮아요.
3. Enter VR이나 Enter AR 누르시면 끝이에요. 엄지랑 검지를 맞대면 클릭이에요.

처음에 컴퓨터에 방화벽 창이 뜨면 허용 눌러 주세요.

## 에이전트가 이렇게 일해요

명령은 에이전트가 알아서 쳐요. 여러분들은 말만 하시면 돼요.

1. 내가 말한 거랑 제일 비슷한 앱을 골라서 새 폴더를 만들어요. `new`
2. 말한 대로 고쳐요. 내 사진이나 3D 모델은 폴더에 넣기만 하면 돼요.
3. 헤드셋 쓰기 전에 먼저 혼자 열어 보고 테스트해요. `check`. 에러는 없는지, 퀘스트에서 안 버벅일 만큼 가벼운지 다 확인하고 스크린샷까지 찍어 주거든요.
4. 퀘스트에서 열 주소를 만들어 줘요. `serve`

구글 AI 스튜디오 같은 데서 만든 3D 웹페이지가 있으신가요? 그것도 가져오시면 퀘스트에서 열리게 다 바꿔 줘요.

<!-- team:start -->
## CONNECT AI LAB의 AI 직원들

AI 직원을 하나씩 오픈소스로 만들고 있어요. 필요한 직원부터 데려가 쓰세요.

<table>
<tr><td width="34%" valign="top"><b>AI 사업 해부 직원</b><br><a href="https://github.com/wonseokjung/reversebusiness"><code>reversebusiness</code></a></td><td valign="top">사업 웹사이트 주소 하나 주면 그 사업이 어떻게 돈 버는지 읽어 줘요.</td></tr>
<tr><td width="34%" valign="top"><b>AI 영상 편집 직원</b><br><a href="https://github.com/wonseokjung/connect-ai-video-motion"><code>connect-ai-video-motion</code></a></td><td valign="top">내 영상을 주면 몸을 피해서 빈자리에 모션그래픽을 넣어 줘요.</td></tr>
<tr><td width="34%" valign="top"><b>AI 모션그래픽 직원</b><br><a href="https://github.com/wonseokjung/connect-ai-motion"><code>connect-ai-motion</code></a></td><td valign="top">글 몇 줄 주면 모션그래픽 영상을 만들어 줘요. 찍은 영상은 없어도 돼요.</td></tr>
<tr><td width="34%" valign="top"><b>AI 마케터 직원</b><br><a href="https://github.com/wonseokjung/connect-ai-marketer"><code>connect-ai-marketer</code></a></td><td valign="top">내 브라우저에서 24시간 댓글, 리스닝, 업로드를 맡아요.</td></tr>
<tr><td width="34%" valign="top"><b>AI 글쓰기 직원</b><br><a href="https://github.com/wonseokjung/connect-ai-writer"><code>connect-ai-writer</code></a></td><td valign="top">영상 하나 주면 플랫폼마다 내 말투로 글을 쓰고 사진까지 같이 만들어 줘요.</td></tr>
<tr><td width="34%" valign="top"><b>AI XR 직원</b> · <b>지금 보는 직원</b><br><a href="https://github.com/wonseokjung/connect-ai-xr"><code>connect-ai-xr</code></a></td><td valign="top">한 문장 주면 메타 퀘스트에서 열리는 XR 앱을 만들어 줘요. 컴퓨터랑 폰에서도 열려요.</td></tr>
</table>
<!-- team:end -->

---

명령은 `npx github:wonseokjung/connect-ai-xr help` 에 다 있어요. 내 컴퓨터가 준비됐는지 궁금하시면 에이전트한테 doctor 해 달라고 해 보세요.

라이선스는 MIT + Commons Clause예요. 코드는 다 공개돼 있는데(소스 공개), 판매는 안 되는 라이선스거든요. 내 사업, 내 채널에 마음껏 쓰고 고치고 나눠도 되고, 이걸로 만든 XR 앱도 다 여러분들 거예요. 안 되는 건 하나예요. 이 도구 자체를 돈 받고 팔거나, 값어치가 전부 또는 거의 이 도구에서 나오는 유료 서비스나 강의를 만들어서 파는 거요. 안에 들어 있는 three.js 는 MIT 라이선스 그대로예요. 자세한 건 [LICENSE](LICENSE) 랑 [NOTICE.md](NOTICE.md) 에 있어요.

이런 도구를 내 AI 에이전트로 직접 만드는 법은 [비주얼 바이브코딩](https://www.aicitybuilders.com/vibecoding)에서 알려 드려요.

<table><tr>
<td width="140" valign="top"><img src="docs/brand/jay.jpg" width="128" alt="AI 멘토 제이"></td>
<td valign="top"><b>만든 사람: AI 멘토 제이</b> · CONNECT AI LAB<br>
앞으로도 AI 직원을 하나씩 오픈소스로 풀 거예요. 만드는 법은 유튜브랑 강의에서 다 보여 드려요.<br>
<a href="https://www.youtube.com/@CONNECT-AI-LAB">유튜브</a> · <a href="https://www.aicitybuilders.com/vibecoding">비주얼 바이브코딩</a> · <a href="https://github.com/wonseokjung">다른 오픈소스</a></td>
</tr></table>
