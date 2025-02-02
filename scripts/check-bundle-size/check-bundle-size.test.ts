/**
 * @file check-bundle-size.test.ts
 * @description このテストファイルは、check-bundle-size モジュールの各条件分岐（総サイズ、個別チャンク、基準統計との増加率、例外ハンドリング）の挙動を
 *              Vitest を用いて検証します。Bun 上で `bun run test` コマンドによりテストを実行し、各条件が正しく処理されるかどうかを確認できます。
 * @remarks 各テストケースでは、fs モジュールおよび process.exit の関数をモック化し、エラーメッセージや出力内容を検証しています。
 */

// @ts-nocheck - TODO: Vitestの型定義の問題を解決する
import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
} from "vitest";
import fs, { type PathLike, type PathOrFileDescriptor } from "node:fs";
import checkBundleSize, { getFileSize } from ".";

describe("checkBundleSize", () => {
	// モックの型定義
	let readdirSyncSpy: jest.SpyInstance;
	let statSyncSpy: jest.SpyInstance;
	let existsSyncSpy: jest.SpyInstance;
	let readFileSyncSpy: jest.SpyInstance;
	let writeFileSyncSpy: jest.SpyInstance;
	let exitSpy: jest.SpyInstance;
	let consoleLogSpy: jest.SpyInstance;
	let consoleErrorSpy: jest.SpyInstance;

	beforeEach(() => {
		// process.exit のモック化：呼ばれた際にエラーを投げる（テストでハンドリング可能にするため）
		exitSpy = vi.spyOn(process, "exit").mockImplementation((code?: number | string | null) => {
			throw new Error(`process.exit: ${code}`);
		});

		// コンソール出力のモック化
		consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
		consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		// fs モジュールの各関数をモック（個別テストで上書き可能）
		readdirSyncSpy = vi.spyOn(fs, "readdirSync");
		statSyncSpy = vi.spyOn(fs, "statSync");
		existsSyncSpy = vi.spyOn(fs, "existsSync");
		readFileSyncSpy = vi.spyOn(fs, "readFileSync");
		writeFileSyncSpy = vi
			.spyOn(fs, "writeFileSync")
			.mockImplementation(() => {});
	});

	afterEach(() => {
		// 全てのモックをリセットする
		vi.restoreAllMocks();
	});

	describe("getFileSize", () => {
		it("should return 0 when fs.statSync throws an error", () => {
			// fs.statSync がエラーを投げるようにモック化
			statSyncSpy.mockImplementation(() => {
				throw new Error("File not found");
			});

			const size = getFileSize("non-existent-file.js");
			expect(size).toBe(0);
		});

		it("should return file size when fs.statSync succeeds", () => {
			// fs.statSync が正常に動作するようにモック化
			statSyncSpy.mockReturnValue({ size: 1024 } as fs.Stats);

			const size = getFileSize("existing-file.js");
			expect(size).toBe(1024);
		});
	});

	/**
	 * @test
	 * @description 初回実行時に、基準ファイル(bundle-stats.json)が存在せず、総サイズおよび個別チャンクサイズが制限内の場合に正常終了すること
	 */
	it("should complete successfully on first run with valid bundle sizes", async () => {
		// モック: assets ディレクトリ内のファイル名を返す
		readdirSyncSpy.mockReturnValue(["file1.js", "file2.css"]);
		// モック: 各ファイルのサイズ（100KBずつ）
		statSyncSpy.mockImplementation((filePath: unknown) => {
			const path = filePath as string;
			if (path.endsWith("file1.js")) {
				return { size: 100 * 1024 } as fs.Stats;
			}
			if (path.endsWith("file2.css")) {
				return { size: 100 * 1024 } as fs.Stats;
			}
			return { size: 0 } as fs.Stats;
		});
		// bundle-stats.json が存在しない
		existsSyncSpy.mockImplementation((filePath: unknown) => false);

		// エラーが発生せずに正常に処理が完了することを検証
		await expect(checkBundleSize()).resolves.not.toThrow();
		// 統計ファイルへの書き込みが行われたことを確認
		expect(writeFileSyncSpy).toHaveBeenCalledWith(
			"bundle-stats.json",
			expect.any(String),
		);
	});

	/**
	 * @test
	 * @description 総バンドルサイズが上限（500KB）を超えた場合、process.exit が呼ばれプロセスが終了すること
	 */
	it("should exit when total bundle size exceeds limit", async () => {
		// モック: 総サイズが (400KB + 200KB = 600KB) と上限を超える設定
		readdirSyncSpy.mockReturnValue(["file1.js", "file2.css"]);
		statSyncSpy.mockImplementation((filePath: unknown) => {
			const path = filePath as string;
			if (path.endsWith("file1.js")) {
				return { size: 400 * 1024 } as fs.Stats;
			}
			if (path.endsWith("file2.css")) {
				return { size: 200 * 1024 } as fs.Stats;
			}
			return { size: 0 } as fs.Stats;
		});
		existsSyncSpy.mockImplementation((filePath: unknown) => false);

		await expect(checkBundleSize()).rejects.toThrow(/process.exit: 1/);
		expect(consoleErrorSpy).toHaveBeenCalled();
	});

	/**
	 * @test
	 * @description 個別チャンク (JS ファイル) のサイズが上限（200KB）を超えた場合、process.exit が呼ばれること
	 */
	it("should exit when an individual JS chunk size exceeds limit", async () => {
		readdirSyncSpy.mockReturnValue(["big.js", "small.css"]);
		statSyncSpy.mockImplementation((filePath: unknown) => {
			const path = filePath as string;
			if (path.endsWith("big.js")) {
				// 250KB > 200KB の上限
				return { size: 250 * 1024 } as fs.Stats;
			}
			if (path.endsWith("small.css")) {
				return { size: 50 * 1024 } as fs.Stats;
			}
			return { size: 0 } as fs.Stats;
		});
		existsSyncSpy.mockImplementation((filePath: unknown) => false);

		await expect(checkBundleSize()).rejects.toThrow(/process.exit: 1/);
		expect(consoleErrorSpy).toHaveBeenCalled();
	});

	/**
	 * @test
	 * @description 基準統計が存在し、現在のバンドルサイズと比較して増加率が閾値 (10%) を超えた場合に、process.exit で終了すること
	 */
	it("should exit when bundle size increase exceeds threshold compared to baseline", async () => {
		readdirSyncSpy.mockReturnValue(["file1.js", "file2.css"]);
		// 現在のサイズ: file1.js = 150KB, file2.css = 150KB → 合計300KB
		statSyncSpy.mockImplementation((filePath: unknown) => {
			const path = filePath as string;
			if (path.endsWith("file1.js")) {
				return { size: 150 * 1024 } as fs.Stats;
			}
			if (path.endsWith("file2.css")) {
				return { size: 150 * 1024 } as fs.Stats;
			}
			return { size: 0 } as fs.Stats;
		});
		// bundle-stats.json が存在し、過去の総サイズが 250KB の場合（増加率 20% > 10%）
		existsSyncSpy.mockImplementation(
			(filePath: unknown) => filePath === "bundle-stats.json",
		);
		readFileSyncSpy.mockImplementation(
			(filePath: unknown, encoding: unknown) => {
				if (filePath === "bundle-stats.json") {
					return JSON.stringify({
						totalSize: 250 * 1024,
						jsSize: 150 * 1024,
						cssSize: 100 * 1024,
						timestamp: Date.now(),
					});
				}
				return "";
			},
		);

		await expect(checkBundleSize()).rejects.toThrow(/process.exit: 1/);
		expect(consoleErrorSpy).toHaveBeenCalled();
	});

	/**
	 * @test
	 * @description 基準統計が存在し、現在のバンドルサイズとの増加率が閾値内の場合、正常に処理が完了すること
	 */
	it("should complete successfully when bundle size increase is within threshold", async () => {
		readdirSyncSpy.mockReturnValue(["file1.js", "file2.css"]);
		// 現在のサイズ: file1.js = 150KB, file2.css = 150KB → 合計300KB
		statSyncSpy.mockImplementation((filePath: unknown) => {
			const path = filePath as string;
			if (path.endsWith("file1.js")) {
				return { size: 150 * 1024 } as fs.Stats;
			}
			if (path.endsWith("file2.css")) {
				return { size: 150 * 1024 } as fs.Stats;
			}
			return { size: 0 } as fs.Stats;
		});
		// bundle-stats.json が存在し、過去の総サイズが 290KB の場合（増加率 ≒ 3.45% < 10%）
		existsSyncSpy.mockImplementation(
			(filePath: unknown) => filePath === "bundle-stats.json",
		);
		readFileSyncSpy.mockImplementation(
			(filePath: unknown, encoding: unknown) => {
				if (filePath === "bundle-stats.json") {
					return JSON.stringify({
						totalSize: 290 * 1024,
						jsSize: 150 * 1024,
						cssSize: 140 * 1024,
						timestamp: Date.now(),
					});
				}
				return "";
			},
		);

		await expect(checkBundleSize()).resolves.not.toThrow();
		expect(writeFileSyncSpy).toHaveBeenCalledWith(
			"bundle-stats.json",
			expect.any(String),
		);
	});

	/**
	 * @test
	 * @description 例外発生時に catch ブロックへ入り、エラー出力とともに process.exit が呼ばれること
	 */
	it("should handle exceptions and exit with error", async () => {
		// fs.readdirSync で例外を発生させる
		readdirSyncSpy.mockImplementation(() => {
			throw new Error("Simulated error in readdirSync");
		});
		existsSyncSpy.mockImplementation(() => false);

		await expect(checkBundleSize()).rejects.toThrow(/process.exit: 1/);
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			expect.stringContaining("Error analyzing bundle size:"),
		);
	});

	/**
	 * @test
	 * @description 統計ファイルの書き込みが失敗した場合、エラーがスローされること
	 */
	it("should handle write file errors with invalid JSON", async () => {
		// 基本的なモックの設定
		readdirSyncSpy.mockReturnValue(["file1.js"]);
		statSyncSpy.mockReturnValue({ size: 100 * 1024 } as fs.Stats);
		existsSyncSpy.mockReturnValue(true);

		// readFileSync が不正なJSONを返すようにモック化
		readFileSyncSpy.mockReturnValue("invalid json");

		await expect(checkBundleSize()).rejects.toThrow(/process.exit: 1/);
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			expect.stringContaining("Error analyzing bundle size:"),
		);
	});

	/**
	 * @test
	 * @description 統計ファイルの書き込みが正常に行われ、適切なJSONデータが書き込まれること
	 */
	it("should write correct JSON data to stats file", async () => {
		// 基本的なモックの設定
		const jsSize = 100 * 1024;
		const cssSize = 50 * 1024;
		readdirSyncSpy.mockReturnValue(["file1.js", "style.css"]);
		statSyncSpy.mockImplementation((filePath: unknown) => {
			const path = filePath as string;
			if (path.endsWith(".js")) {
				return { size: jsSize } as fs.Stats;
			}
			if (path.endsWith(".css")) {
				return { size: cssSize } as fs.Stats;
			}
			return { size: 0 } as fs.Stats;
		});
		existsSyncSpy.mockReturnValue(false);

		// Date.now()をモック化して一定の値を返すようにする
		const mockTimestamp = 1234567890000;
		const dateNowSpy = vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);

		await expect(checkBundleSize()).resolves.not.toThrow();

		// 書き込まれたJSONデータを検証
		expect(writeFileSyncSpy).toHaveBeenCalledWith(
			"bundle-stats.json",
			JSON.stringify(
				{
					totalSize: jsSize + cssSize,
					jsSize,
					cssSize,
					timestamp: mockTimestamp,
				},
				null,
				2,
			),
		);

		// Date.now()のモックをリストア
		dateNowSpy.mockRestore();
	});
});
