/**
 * @file alert.test.tsx
 * @description Alertコンポーネントのテストファイル
 * @package components
 */

import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Alert, AlertTitle, AlertDescription } from "./index"

describe("Alert", () => {
  it("renders alert with default variant", () => {
    render(<Alert>Test alert</Alert>)
    const alert = screen.getByRole("alert")
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass("bg-background")
  })

  it("renders alert with destructive variant", () => {
    render(<Alert variant="destructive">Destructive alert</Alert>)
    const alert = screen.getByRole("alert")
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass("border-destructive/50")
  })

  it("renders alert with custom className", () => {
    render(<Alert className="custom-class">Custom alert</Alert>)
    const alert = screen.getByRole("alert")
    expect(alert).toHaveClass("custom-class")
  })

  it("renders alert with title and description", () => {
    const title = "Alert Title"
    const description = "Alert Description"
    render(
      <Alert>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    )
    
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it("renders AlertTitle with custom className", () => {
    render(<AlertTitle className="custom-title">Title</AlertTitle>)
    const title = screen.getByText("Title")
    expect(title).toHaveClass("custom-title")
  })

  it("renders AlertDescription with custom className", () => {
    render(<AlertDescription className="custom-desc">Description</AlertDescription>)
    const desc = screen.getByText("Description")
    expect(desc).toHaveClass("custom-desc")
  })
}) 