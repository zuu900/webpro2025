// Node.js に標準で備わっている http と url の機能を読み込む
import http from "node:http";
import { URL } from "node:url";

// 環境変数 'PORT' があればその値を、なければ 8888 をポート番号として使う
// Renderのようなサービスでは、この環境変数でポート番号が指定されるんじゃ
const PORT = process.env.PORT || 8888;

// ここがサーバーの本体じゃ
const server = http.createServer((req, res) => {
  // アクセスされたURLを解析するために、URLオブジェクトを生成する
  const url = new URL(req.url, `http://${req.headers.host}`);

  // URLのパス名によって処理を分けるぞい
  if (url.pathname === "/") {
    // ルートパス ("/") にアクセスされた場合
    console.log("ルートパスへのアクセスがありました。");
    // レスポンスヘッダーを設定する。文字化けを防ぐために charset=utf-8 を指定するんじゃ
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    // "こんにちは！" という文字列を返す
    res.end("こんにちは！");
  } else if (url.pathname === "/ask") {
    // "/ask" パスにアクセスされた場合
    console.log("/ask へのアクセスがありました。");
    // URLのクエリパラメータから 'q' の値を取得する
    const question = url.searchParams.get("q");
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    // 取得した質問を埋め込んだ文字列を返す
    res.end(`Your question is '${question}'`);
  } else {
    // それ以外のパスにアクセスされた場合
    console.log("未定義のパスへのアクセスがありました。");
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  }
});

// 指定したポートでサーバーを起動し、リクエストを待ち受ける
server.listen(PORT, () => {
  console.log(
    `サーバーがポート ${PORT} で起動しました: http://localhost:${PORT}`
  );
});
