// OG 이미지(satori)용 한글 글꼴. Google Sans Code에는 한글이 없어서 보조 글꼴로 넘긴다.
// Google Fonts의 `text=` 옵션으로 이미지에 들어갈 글자만 담은 작은 TTF를 빌드 때 받아온다.
async function loadGoogleFont(family: string, weight: number, text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(cssUrl).then(res => res.text());
  const fontUrl = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/
  )?.[1];
  if (!fontUrl) throw new Error(`Cannot load font ${family} ${weight}`);
  return fetch(fontUrl).then(res => res.arrayBuffer());
}

export async function loadKoreanFonts(text: string) {
  const name = "Noto Sans KR";
  const [regular, bold] = await Promise.all([
    loadGoogleFont(name, 400, text),
    loadGoogleFont(name, 700, text),
  ]);
  return [
    { name, data: regular, weight: 400 as const, style: "normal" as const },
    { name, data: bold, weight: 700 as const, style: "normal" as const },
  ];
}
