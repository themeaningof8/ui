import fs from "node:fs";
import path from "node:path";

const LIMITS = {
	TOTAL: 500 * 1024, // 500KB
	CHUNK: 200 * 1024, // 200KB
	THRESHOLD_INCREASE: 0.1, // 10%増加まで許容
};

/**
 * ファイルサイズを取得する（存在しない場合は0を返す）
 * @param {string} filePath
 * @returns {number}
 */
function getFileSize(filePath) {
	try {
		const stats = fs.statSync(filePath);
		return stats.size;
	} catch {
		return 0;
	}
}

async function checkBundleSize() {
	try {
		const distDir = path.resolve(process.cwd(), "dist");
		const assetsDir = path.resolve(distDir, "assets");

		// アセットファイルの一覧を取得
		const files = fs.readdirSync(assetsDir);
		const assets = files.map((file) => ({
			name: file,
			path: path.resolve(assetsDir, file),
			size: getFileSize(path.resolve(assetsDir, file)),
		}));

		// JavaScriptファイルのみを抽出
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
			console.error(
				`\nTotal bundle size ${(totalSize / 1024).toFixed(2)}KB exceeds limit ${(
					LIMITS.TOTAL / 1024
				).toFixed(2)}KB`,
			);
			process.exit(1);
		}

		// 個別チャンクのサイズチェック
		for (const asset of jsAssets) {
			if (asset.size > LIMITS.CHUNK) {
				console.error(
					`\nChunk ${asset.name} size ${(asset.size / 1024).toFixed(
						2,
					)}KB exceeds limit ${(LIMITS.CHUNK / 1024).toFixed(2)}KB`,
				);
				process.exit(1);
			}
		}

		// 増加率チェック（初回実行時はスキップ）
		if (previousStats && previousStats.totalSize > 0) {
			const increase =
				(totalSize - previousStats.totalSize) / previousStats.totalSize;
			if (increase > LIMITS.THRESHOLD_INCREASE) {
				console.error(
					`\nBundle size increased by ${(increase * 100).toFixed(2)}%`,
				);
				process.exit(1);
			}
			console.log(
				`\nBundle size change: ${(increase * 100).toFixed(2)}% (${
					increase >= 0 ? "+" : "-"
				}${Math.abs((totalSize - previousStats.totalSize) / 1024).toFixed(2)}KB)`,
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
	} catch (error) {
		console.error("Error analyzing bundle size:", error.message);
		process.exit(1);
	}
}

checkBundleSize();
