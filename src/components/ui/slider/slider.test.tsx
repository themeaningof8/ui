/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Slider } from './slider'

describe('Slider', () => {
  const user = userEvent.setup()

  it('renders slider correctly', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />)
    expect(screen.getByTestId('slider-thumb-0')).toBeInTheDocument()
    expect(screen.getByTestId('slider-track')).toBeInTheDocument()
    expect(screen.getByTestId('slider-range')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<Slider defaultValue={[50]} max={100} step={1} className={customClass} />)
    expect(screen.getByTestId('slider-root')).toHaveClass(customClass)
  })

  it('handles value change correctly', async () => {
    const onValueChange = vi.fn()
    render(
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={onValueChange}
      />
    )

    const slider = screen.getByTestId('slider-thumb-0')
    await user.click(slider)
    await user.keyboard('[ArrowRight]')
    expect(onValueChange).toHaveBeenCalledWith([51])
  })

  it('respects min and max values', () => {
    render(<Slider defaultValue={[50]} min={0} max={100} step={1} />)
    
    const slider = screen.getByTestId('slider-thumb-0')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('handles step value correctly', () => {
    render(
      <Slider defaultValue={[50]} max={100} step={10} />
    )
    
    const slider = screen.getByTestId('slider-thumb-0')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('handles disabled state correctly', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} disabled />)
    const root = screen.getByTestId('slider-root')
    expect(root).toHaveAttribute('data-disabled', '')
    expect(root).toHaveClass('cursor-not-allowed')
    expect(root).toHaveClass('opacity-50')
  })

  it('applies focus styles correctly', async () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />)
    
    const slider = screen.getByTestId('slider-thumb-0')
    await user.tab()
    expect(slider).toHaveClass('focus-visible:outline-none')
    expect(slider).toHaveClass('focus-visible:ring-2')
    expect(slider).toHaveClass('focus-visible:ring-ring')
    expect(slider).toHaveClass('focus-visible:ring-offset-2')
  })

  it('renders track and range correctly', () => {
    render(
      <Slider defaultValue={[50]} max={100} step={1} />
    )
    
    const track = screen.getByTestId('slider-track')
    const range = screen.getByTestId('slider-range')
    
    expect(track).toBeInTheDocument()
    expect(range).toBeInTheDocument()
    expect(track).toHaveClass('relative')
    expect(range).toHaveClass('absolute')
  })

  it('handles multiple thumbs correctly', () => {
    render(
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    )
    
    const thumb1 = screen.getByTestId('slider-thumb-0')
    const thumb2 = screen.getByTestId('slider-thumb-1')
    expect(thumb1).toHaveAttribute('aria-valuenow', '25')
    expect(thumb2).toHaveAttribute('aria-valuenow', '75')
  })

  it('updates value on click', async () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />)
    const thumb = screen.getByTestId('slider-thumb-0')
    await user.click(thumb)
    expect(thumb).toHaveAttribute('aria-valuenow', '50')
  })
}) 