/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				"progress-indeterminate": {
					"0%": { transform: "translateX(-100%)" },
					"50%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(100%)" },
				},
				"indeterminate-progress": {
					"0%": { transform: "translateX(-100%)" },
					"50%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(100%)" },
				},
			},
			animation: {
				"progress-indeterminate":
					"progress-indeterminate 1.5s infinite ease-in-out",
				"indeterminate-progress":
					"indeterminate-progress 2s ease-in-out infinite",
			},
			colors: {
				base: {
					app: "var(--color-base-app)",
					ui: "var(--color-base-ui)",
					"ui-hover": "var(--color-base-ui-hover)",
					solid: "var(--color-base-solid)",
					"solid-hover": "var(--color-base-solid-hover)",
					high: "var(--color-base-high)",
					low: "var(--color-base-low)",
					"on-solid": "var(--color-base-on-solid)",
				},
			},
		},
	},
	plugins: [],
};
