import type { Meta, StoryObj } from '@storybook/react'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarShortcut,
} from '.'

/**
 * `Menubar`は、アプリケーションのメニューバーを作成するためのコンポーネントセットです。
 * Radix UIのMenubarプリミティブをベースに、アクセシビリティと一貫したスタイリングを提供します。
 */
const meta = {
  title: 'UI/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof Menubar>

/**
 * 基本的なメニューバーの例です。
 */
export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

/**
 * サブメニューを含むメニューバーの例です。
 */
export const WithSubmenu: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarItem>Find in page</MenubarItem>
              <MenubarItem>Find in files</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

/**
 * チェックボックスとラジオボタンを含むメニューバーの例です。
 */
export const WithSelections: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Statusbar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Zoom</MenubarLabel>
          <MenubarRadioGroup value="100%">
            <MenubarRadioItem value="50%">50%</MenubarRadioItem>
            <MenubarRadioItem value="75%">75%</MenubarRadioItem>
            <MenubarRadioItem value="100%">100%</MenubarRadioItem>
            <MenubarRadioItem value="150%">150%</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

/**
 * 複数のメニューを持つメニューバーの例です。
 */
export const FullExample: Story = {
  render: () => (
    <Menubar className="w-[600px]">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarItem>Find in page</MenubarItem>
              <MenubarItem>Find in files</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Statusbar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Zoom</MenubarLabel>
          <MenubarRadioGroup value="100%">
            <MenubarRadioItem value="50%">50%</MenubarRadioItem>
            <MenubarRadioItem value="75%">75%</MenubarRadioItem>
            <MenubarRadioItem value="100%">100%</MenubarRadioItem>
            <MenubarRadioItem value="150%">150%</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
} 