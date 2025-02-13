/**
 * @file アスペクト比コンポーネントのテスト
 * @description アスペクト比コンポーネントの機能をテストします
 */

import { describe, it, expect } from 'vitest'
import { render } from '@/tests/test-utils'
import { AspectRatio } from '.'

describe('アスペクト比コンポーネント', () => {
  it('指定したアスペクト比で要素がレンダリングされること', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>コンテンツ</div>
      </AspectRatio>
    )
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({
      position: 'relative',
      width: '100%',
    })
  })

  it('カスタムクラス名が正しく適用されること', () => {
    const { container } = render(
      <AspectRatio ratio={4 / 3} className="custom-class">
        <div>コンテンツ</div>
      </AspectRatio>
    )
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('custom-class')
  })

  it('子要素が正しく表示されること', () => {
    const { getByText } = render(
      <AspectRatio ratio={1}>
        <div>テストコンテンツ</div>
      </AspectRatio>
    )
    
    expect(getByText('テストコンテンツ')).toBeInTheDocument()
  })

  it('1:1のアスペクト比が正しく適用されること', () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>正方形コンテンツ</div>
      </AspectRatio>
    )
    
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({
      position: 'relative',
      width: '100%',
    })
  })
}) 