import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** 各サイズ制限の設定 */
export const LIMITS: { TOTAL: number; CHUNK: number; THRESHOLD_INCREASE: number } = {
	TOTAL: 500 * 1024, // 500KB
	CHUNK: 200 * 1024, // 200KB
	THRESHOLD_INCREASE: 0.1, // 10%増加まで許容
};

/**
 * @function getFileSize
 * @description 指定されたファイルパスのファイルサイズを取得する
 * @param {string} filePath - 対象のファイルパス
 * @returns {number} ファイルサイズ（バイト単位）
 */
export function getFileSize(filePath: string): number {
	try {
		const stats = fs.statSync(filePath);
		return stats.size;
	} catch {
		return 0;
	}
}

/**
 * @async
 * @function checkBundleSize
 * @description dist ディレクトリ内のビルド成果物のサイズをチェックする
 *              ・総サイズ、個別チャンク、前回統計との増加率の各条件を検証し、条件に合致しない場合はエラーをスローする
 * @throws 条件に合致しない場合やエラー発生時に詳細なエラーメッセージとともにエラーをスローする
 */
async function checkBundleSize() {
	const distDir = path.resolve(process.cwd(), "dist");

	if (!fs.existsSync(distDir)) {
		throw new Error(`ビルド出力ディレクトリが見つかりません: ${distDir}`);
	}

	// ビルド成果物の一覧を取得
	const files = fs.readdirSync(distDir);
	const assets = files
		.filter(file => file.endsWith('.js') || file.endsWith('.css'))
		.map((file) => ({
			name: file,
			path: path.resolve(distDir, file),
			size: getFileSize(path.resolve(distDir, file)),
		}));

	// JavaScriptファイルとCSSファイルを分類
	const jsAssets = assets.filter((asset) => asset.name.endsWith(".js"));
	const cssAssets = assets.filter((asset) => asset.name.endsWith(".css"));

	// 合計サイズを計算
	const totalJsSize = jsAssets.reduce((sum, asset) => sum + asset.size, 0);
	const totalCssSize = cssAssets.reduce((sum, asset) => sum + asset.size, 0);
	const totalSize = totalJsSize + totalCssSize;

	console.log("\nBundle Analysis Results:");
	console.log(`Total JS Size: ${(totalJsSize / 1024).toFixed(2)}KB`);
	console.log(`Total CSS Size: ${(totalCssSize / 1024).toFixed(2)}KB`);
	console.log(`Total Bundle Size: ${(totalSize / 1024).toFixed(2)}KB`);

	console.log("\nIndividual Chunk Sizes:");
	for (const asset of jsAssets) {
		console.log(`${asset.name}: ${(asset.size / 1024).toFixed(2)}KB`);
	}

	const previousStats = fs.existsSync("bundle-stats.json")
		? JSON.parse(fs.readFileSync("bundle-stats.json", "utf-8"))
		: null;

	// サイズチェック
	if (totalSize > LIMITS.TOTAL) {
		throw new Error(
			`Total bundle size ${(totalSize / 1024).toFixed(2)}KB exceeds limit ${(
				LIMITS.TOTAL / 1024
			).toFixed(2)}KB`
		);
	}

	// 個別チャンクのサイズチェック
	for (const asset of jsAssets) {
		if (asset.size > LIMITS.CHUNK) {
			throw new Error(
				`Chunk ${asset.name} size ${(asset.size / 1024).toFixed(
					2,
				)}KB exceeds limit ${(LIMITS.CHUNK / 1024).toFixed(2)}KB`
			);
		}
	}

	// 増加率チェック（初回実行時はスキップ）
	if (previousStats && previousStats.totalSize > 0) {
		const increase =
			(totalSize - previousStats.totalSize) / previousStats.totalSize;
		if (increase > LIMITS.THRESHOLD_INCREASE) {
			throw new Error(
				`Bundle size increased by ${(increase * 100).toFixed(2)}%`
			);
		}
		console.log(
			`\nBundle size change: ${(increase * 100).toFixed(2)}% (${
				increase >= 0 ? "+" : "-"
			}${Math.abs((totalSize - previousStats.totalSize) / 1024).toFixed(2)}KB)`
		);
	} else {
		console.log("\nFirst run - establishing baseline bundle size");
	}

	// 統計の保存
	fs.writeFileSync(
		"bundle-stats.json",
		JSON.stringify(
			{
				totalSize,
				jsSize: totalJsSize,
				cssSize: totalCssSize,
				timestamp: Date.now(),
			},
			null,
			2,
		),
	);

	console.log("\nBundle size check completed successfully");
}

// デフォルトエクスポートも追加（必要に応じテスト側で default インポート可能に）
export default checkBundleSize;

// モジュールが直接実行された場合のみ checkBundleSize() を実行
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	checkBundleSize().catch((error) => {
		console.error(`Error analyzing bundle size: ${error.message}`);
		process.exit(1);
	});
}
